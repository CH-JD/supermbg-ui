<template>
  <div class="basic-layer-box">
    <div class="basic-layer" v-if=" baseMapConfig">
      <button v-for="(val,index) of baseMapConfig" :disabled="val.checked" :key="index" :class="[{'actived':val.checked},val.key]" @click="toggleBaseLayer(val,index)">
        <span>{{val.name}}</span>
      </button>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'baseMap',
        data () {
            return {
            }
        },
        props:{
            baseMapConfig:{
                type:Array,
                default:() => []
            },
            map:{
                type:Object,
                default:null,
            }
        },
        mounted(){
        },
        methods: {
            removeAllBaseLayer(){
                for(let val of this.baseMapConfig){
                    if(this.map.getLayer(val.key)){
                        this.map.removeLayer(val.key);
                    }
                }
            },
            toggleBaseLayer(val,index){
                if(!this.map.getSource(val.key)){
                  this.map.addSource(val.key,{
                      "type": "raster",
                      "tiles": [val.path],
                      "tileSize": 256
                  });
                }
                this.removeAllBaseLayer();
                this.map.addLayer({
                    id: `${val.key}`,
                    source:val.key,
                    "type": "raster",
                    "minzoom": 0,
                    "maxzoom": 22
                });
                this.$emit("getBaseMap",{val,index});
            }
        }
    }
</script>
<style lang="scss" scoped>
  .basic-layer-box {
    position: fixed;
    z-index: 9999;
    right: 20px;
    bottom: 5px;
    height: 50px;
  }
</style>
