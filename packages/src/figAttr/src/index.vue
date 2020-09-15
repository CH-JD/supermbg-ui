<template>
  <div id="figAttr">
    <el-table
      ref="table"
      :data="data"
      stripe
      border
      highlight-current-row
      @row-click="rowClickHanlder"
      v-if="data.length">
      <el-table-column
        v-for="(item,index) in keyInfo"
        :prop="item.key"
        :label="item.name"
        :key="index">
        <template slot-scope="scope">{{scope.row[item.key]}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    import mapMixin from '../../../_mapcore/_sourceModel/index'
    export default {
        name: 'figAttr',
        data () {
            return {
                id:null,
                currentData:null,
            }
        },
        mixins:['mapMixin'],
        props:{
            mapboxgl:{
                type:Object,
                default:null,
            },
            layerConfig:{
                type:Object,
                default:null,
            },
            keyInfo:{
                type:Array,
                required: true,
                default: () => []
            },
            data:{
                type:Array,
                required: true,
                default: () => []
            },
            map:{
                type:Object,
                default:null,
            }
        },
        mounted(){
            this.resetFeaturesData();
        },
        methods: {
            addLayerHandler(data){
                this.timeId = new Date().getTime();
                this.map.on("load",()=>{
                    window.supermbglUi._mapCore.creatLabelLayer(this.map,{
                        id:`font_${this.timeId}`,
                        sourceType:'geojson',
                        data,
                        interactive:true,
                        textSize:12,
                        stops:[[4, 12], [7, 14], [15, 16]],
                        font:["Microsoft YaHei Regular"],
                        anchor:"top",
                        color:"#f00",
                        haloColor:"#fff",
                        haloWidth:1
                    });
                    window.supermbglUi._mapCore.creatICONLayer(this.map,{
                        id:`icon_${this.timeId}`,
                        sourceType:'geojson',
                        data,
                        interactive:true,
                        iconName:`icon_${new Date().getTime()}`,
                        iconPath:'https://img.alicdn.com/tfs/TB1td1qB5rpK1RjSZFhXXXSdXXa-60-30.png',
                        iconSize:{
                            base: .4,
                            stops: [
                                [3, .4],
                                [7, .5],
                                [15, .6]
                            ],
                        },
                        iconRotate:0,
                        offset: [0, -15],
                        overlap:true
                    });
                    this.map.on("click",`icon_${this.timeId}`,e=> {
                        let row = JSON.parse(JSON.stringify(e.features[0].properties)),index;
                        row.lngLat = eval(row.lngLat);
                        for(let i =0,l =this.data.length;i<l;i++){
                            if(this.data[i].space === row.space){
                                index=i;
                            }
                        }
                        this.$refs.table.setCurrentRow(this.data[index]);
                        window.supermbglUi._mapCore.addPopupHandler({
                            mapboxgl:this.mapboxgl, //popup原始地图的
                            popup: { //popup配置 基于mapboxgl的原始配置
                                anchor: "left",
                                closeButton: false,
                                closeOnClick: true
                            },
                            map:this.map,//地图
                            layerID:`icon_${this.timeId}`, //操作的图层
                            title:"测试测试测试",//显示的标题
                            showKey:this.keyInfo,//需要显示的字段
                            class:{
                                wClass:"", // 弹框外部class
                                lwClass:"", // 弹框list外部class
                                lClass:"",// 弹框listclass
                            },
                            lngLat:row.lngLat,
                            data:row, //需要展示的数据 不传将根据图层里的数据获取
                            type:"click" //弹框展示的方式
                        }).addPopup(row);
                    });

                });
            },
            resetFeaturesData(){
                let featuresObj ={
                    type: 'FeatureCollection',
                    features: []
                };
                featuresObj.features = this.data.map((item) => {
                    return {
                        type: "feature",
                        geometry: {
                            "type": "Point",
                            "coordinates": item.lngLat
                        },
                        properties: item
                    }
                });
                this.addLayerHandler(featuresObj);
            },
            rowClickHanlder(row, column, event){
                this.$refs.table.setCurrentRow(row);
                window.supermbglUi._mapCore.addPopupHandler({
                    mapboxgl:this.mapboxgl, //popup原始地图的
                    popup: { //popup配置 基于mapboxgl的原始配置
                        anchor: "left",
                        closeButton: false,
                        closeOnClick: true
                    },
                    map:this.map,//地图
                    layerID:`icon_${this.timeId}`, //操作的图层
                    title:"测试测试测试",//显示的标题
                    showKey:this.keyInfo,//需要显示的字段
                    class:{
                        wClass:"", // 弹框外部class
                        lwClass:"", // 弹框list外部class
                        lClass:"",// 弹框listclass
                    },
                    lngLat:row.lngLat,
                    data:row, //需要展示的数据 不传将根据图层里的数据获取
                    type:"click" //弹框展示的方式
                }).addPopup(row);
            }
        }
    }
</script>
<style lang="scss">
  #figAttr {
    position: fixed;
    width: 420px;
    top: 20px;
    right: 20px;
    z-index: 999;
    .el-table th.is-leaf {
      text-align: center;
      border-color: #1aaed8;
      background: #015186;
      color: #fff;
    }
    .el-table--border,.el-table--border td {
      text-align: center;
      border-color: #1aaed8;
      background: #015186;
      color: #fff;
    }
    .el-table--border tr{
      &.el-table__row--striped {
        td {
          background-color: rgba(11, 109, 167, 0.3)!important;
        }
      }
      &:hover {
        td {
          background-color: rgba(11, 109, 167, 0.8)!important;
        }

      }
    }
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cell {
      padding: 0;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
    }
    .el-table th.is-leaf {
      text-align: center;
      border-color: #1aaed8;
      background: #015186;
      color: #d3881a;
      height: 16px;
      line-height: 16px;
    }
    .el-table--border,
    .el-table--border td {
      text-align: center;
      border-color: #1aaed8;
      background: #065184;
      color: #fff;
      // padding: 7px 0 !important;
    }
    .el-table--border tr {
      &.el-table__row--striped {
        td {
          background-color: rgba(9, 92, 147, 0.8) !important;
        }
      }
      &:hover {
        td {
          background-color: rgba(9, 92, 147, 0.8) !important;
        }
      }
    }
  }
  .current-row {
    background-color: #d3881a!important;
  }
  .mapboxgl-popup-content {
    // width: 240px;
    padding: 0 0 !important;
    /*height: 160px;*/
    color: #d4edfc;
    font-size: 14px;
    background: #015186;
    border: 1px solid #26b8ff;
    box-shadow: 0 0 10px rgba(35, 149, 208, 0.44) inset;
    p {
      margin: 0;
      text-align: left;
    }
  }
  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: #18548f;
    margin-top: -5px;
  }

  .mapbox-tip-content-cotroller {
    min-height: 80px;
    padding: 10px 8px 10px 0;
    // padding: 10px 0 10px;
    p {
      padding-left: 10px;
      line-height: 24px;
    }
  }
  .mapboxgl-popup-close-button {
    top: 5px;
    right: 10px;
    font-size: 16px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    color: #a1bbca;
  }
  .mapbox-tip-box-cotroller {
    [id*="btn_"] {
      width: 120px;
      margin: 0px auto;
      color: #fff;
      background-color: rgb(238, 86, 75);
      border: 1px solid rgb(238, 86, 75);
      border-radius: 2px;
      height: 30px;
      line-height: 30px;
    }
    h4 {
      margin: 0;
      width: 230px;
      padding-left: 5px !important;
      font-size: 16px !important;
      line-height: 24px !important;
      height: 24px !important;
      color: rgb(212, 237, 252);
      padding-top: 10px;
      text-align: center;
      /*    background: url("../../../public/img/onemap/propTitle_bg.png") no-repeat left top;*/
      text-shadow: 0px 0px 5.4px rgba(111, 166, 229, 0.67);
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }

    .mapboxgl-marker {
      width: 10px;
      height: 10px;
      background: red;
      margin-top: -5px;
      margin-left: -5px;
      border-radius: 5px;
      cursor: pointer;
    }

    .mapboxgl-popup-content {
      // width: 320px;
      padding: 0 29px !important;
      height: auto !important;
      color: #d4edfc;
      font-size: 14px;
      /*      background: url("../../../public/img/onemap/tip_box_bg.png") no-repeat center bottom;*/
    }

    .mapboxgl-popup-close-button {
      top: 10px;
      right: 29px;
      font-size: 16px;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      border-radius: 50%;
      background: #60cbfb;
    }
  }
</style>
