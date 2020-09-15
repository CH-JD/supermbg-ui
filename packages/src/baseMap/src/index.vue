<template>
  <div id="_map-warp">
    <h4>地图切换</h4>
    <div class="basic-layer" v-if="mapList">
      <button
              v-for="(val,index) of mapList"
              :key="val.id"
              :style="{backgroundImage:'url('+require('./assets/images/'+val.icon+'.png')+')'}"
              :class="[{'actived':index === currentIndex},val.icon]"
              @click="toggleBaseMap(val,index)"
              :disabled="index === currentIndex">
        <span>{{val.mapName}}</span>
      </button>
    </div>
  </div>
</template>
<script>
    import Vue from "vue";
    import  '../../../_static/_libs/mapboxgl/mapbox-gl-enhance';
    import '@supermap/iclient-mapboxgl';
    export default {
        name: 'baseMap',
        data(){
            return {
                currentIndex:0,
                currentMap:null,
            }
        },
        props:{
            mapList:{
                type:Array,
                default:() => []
            },
            mapbox:{
                type:String,
                default:''
            },
        },
        mounted(){
            if(!this.mapList||!this.mapList.length||!document.getElementById(this.mapbox)){
                throw new Error("底图不存在，无法使用！");
                return
            }
            this.restMapData();
            const glyphsUrl ='./assets/fonts/{fontstack}/{range}.pbf';
            let style ={
                "version": 8,
                "glyphs": `${glyphsUrl}`,
                "sources": {},
                "layers": [],
            };
            for(let val of this.currentMap.mapVersionDtoList[0].dataInfoList){
                style.sources[val.id] = {
                    "type": "raster",
                    "tiles": [val.resourceUrl+"/zxyTileImage.png?transparent=true&z={z}&x={x}&y={y}"],
                    "tileSize": 256
                }
                style.layers.push({
                    "id": `${val.id}`,
                    "type": "raster",
                    "source": `${val.id}`,
                    "minzoom": 0,
                    "maxzoom": 22
                });
            };
            let center = this.currentMap.centerPoint&&[parseFloat(this.currentMap.centerPoint.split(",")[0]),parseFloat(this.currentMap.centerPoint.split(",")[1])]||[104.3, 32];
            try {
                this.map=Vue.prototype.$map = new mapboxgl.Map({
                    container: this.mapbox,
                    style,
                    center,
                    minZoom: 1,
                    zoom: parseInt(this.currentMap.scale)||3.5,
                    maxZoom: 18,
                    renderWorldCopies: false,
                    preserveDrawingBuffer: !0,
                    pitch: 0,//60 倾斜角度
                    bearing: 0//旋转角度
                });
            } catch (e) {
                console.log(e);
            }
            this.map.on('load',()=> {
                 this.$emit("getBaseMap",{val:this.currentMap,index:0,map:this.map,mapboxgl});
            });
        },
        methods:{
            restMapData(index){
                if(index===undefined){
                    let defaultMap = false;
                    for(let i=0,l=this.mapList.length;i<l;i++ ){
                        if(this.mapList[i].defaultFlag==="1"){
                            defaultMap=true;
                            this.currentMap = this.mapList[i];
                            break;
                        }
                    }
                    if(!defaultMap){
                        this.currentMap=this.mapList[0];
                        this.mapList[0].checked=true;
                    }
                }else {
                    this.currentIndex =index;
                    for(let i=0,l=this.mapList.length;i<l;i++){
                        if(index===i){
                            this.currentMap=this.mapList[i];
                        }
                    }
                }
            },
            removeAllBaseLayer(){
                for(let val of this.mapList){
                    for(let mapV of val.mapVersionDtoList){
                        for(let data of mapV.dataInfoList){
                            if(this.map.getLayer(data.id)){
                                this.map.removeLayer(data.id);
                            }
                            if(this.map.getSource(data.id)){
                                this.map.removeSource(data.id);
                            }
                        }
                    }

                }
            },
            toggleBaseMap(val,index){
                this.removeAllBaseLayer();
                this.currentIndex = index;
                this.restMapData(index);
                let nowVer = this.currentMap.mapVersionDtoList[0];
                let center = this.currentMap.centerPoint&&[parseFloat(this.currentMap.centerPoint.split(",")[0]),parseFloat(this.currentMap.centerPoint.split(",")[1])]||[104.3, 32];
                this.map.flyTo({
                    zoom:parseInt(this.currentMap.scale)||3.5,
                    center
                });
                for(let item of nowVer.dataInfoList){
                    supermbglUi._mapCore.creatRestLayer(this.map,{
                        id: `${item.id}`,
                        url:item.resourceUrl+"/zxyTileImage.png?transparent=true&z={z}&x={x}&y={y}",
                        source:item.id,
                        tileSize:256,
                        type: "raster",
                        minzoom: 0,
                        maxzoom: 22
                    });
                }
                this.$emit("getBaseMap",{val,index,map:this.map});
            }
        }
    }
</script>
<style lang="scss" scoped>
  #_map-warp {
    position: fixed;
    z-index: 1;
    width: 280px;
    right: 0;
    bottom: 0;
    height: calc(100% - 70px);
    background: #131f2e;
    h4 {
      position: relative;
      z-index: 1;
      color: #fff;
      padding: 0;
      margin: 0;
      height: 50px;
      line-height: 50px;
      text-align: left;
      text-indent: 24px;
      font-size: 16px;
      border-bottom: 1px dashed #497bb8;
      span {
        position: absolute;
        z-index: 2;
        display: block;
        width: auto;
        height: 50px;
        line-height: 50px;
        right: 24px;
        top:0;
      }
    }
    /*transparent*/
    button {
      height: 80px;
      border: 2px solid #131f2e;
      border-radius: 5px;
      background: #fff;
      overflow: hidden;
      width: calc(100% - 30px);
      margin: 20px 15px 0;
      position: relative;
      z-index: 1;
      outline: none;
      &.actived {
        border-color: #2580ef;
      }
      span {
        position: absolute;
        z-index: 2;
        bottom: 0;
        right: 0;
        color: #fff;
        background: rgba(49,77,115,.8);
        display: inline-block;
        padding: 10px 10px;
      }
    }
  }

</style>
