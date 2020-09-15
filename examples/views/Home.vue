<template>
  <div id="map-box">
    <div id="map"></div>

    <!--<map-config :mapConfig = mapConfig @getConfig="getConfig"></map-config>-->
    <!-- <fig-attr :data="data" :keyInfo="keyInfo" :map="map" :layerConfig = layerStyle :mapboxgl="mapboxgl" v-if="map"></fig-attr>-->
    <base-map :mapList="mapList" :mapbox="mapbox" @getBaseMap="getBaseMap"></base-map>
<!--    <div id="__map-config-box">
      <div id="__map-layer">
        <layer-control style="background-color: #182b44" :layerArr="layerArr"  @saveLayer="saveLayer" @getCurrentLayer="getCurrentLayer"></layer-control>
      </div>
      <div id="__map-config">
        <map-config :mapConfig = mapConfig :currentLayer="currentLayer"  @getConfig="getConfig" ></map-config>
      </div>
    </div>-->
    <!--<map-legend :legendConfig=legendConfig  @getLegendActive="getLegendActive"></map-legend>-->
  </div>
</template>
<script>;
export default {
    name: 'home',
    data(){
        return {
            currentLayer:null,
            mapbox:'map',
            layerArr:[
                {
                    layerId:new Date().getTime(),
                    layerName:"地灾点",
                    opacity:1,
                    layerType:'rest',
                    type:'point',
                    legendType:"color",
                    legend:[
                        {
                            value:"rgb(247,252,240)",
                            caption:"0"
                        }, {
                            value:"rgb(224,243,219)",
                            caption:"0.1 ~ 0.9"
                        }, {
                            value:"rgb(204,235,197)",
                            caption:"10 ~ 24.9"
                        },{
                            value:"rgb(168,221,181)",
                            caption:"25 ~ 49.9"
                        },{
                            value:"rgb(78,179,211)",
                            caption:"50 ~ 99.9"
                        },{
                            value:"rgb(43,140,190)",
                            caption:"100 ~ 249.9"
                        },{
                            value:"rgb(8,64,129)",
                            caption:">=250"
                        }
                    ]
                },
                {
                    layerId:new Date().getTime(),
                    layerName:"群测群防",
                    opacity:1,
                    layerType:'rest',
                    type:'point',
                    legendType:"icon",
                    legend:[
                        {
                            value:require("../../examples/assets/soil.png"),
                            caption:"图例2"
                        }
                    ]
                }
            ],
            legendType:"color",//icon
            /* legendConfig:{
                title:"asdasda",
                activeNames:"asdadas",
                data:[{
                    type:"color",
                    layerId:"asdadas",
                    data:[],
                    sort:"asc",
                    title:"ttttttttttttttt",
                    legend:[
                        {
                            value:"#ff0000",
                            caption:"图例1"
                        }, {
                            value:"#00ff00",
                            caption:"图例2"
                        }, {
                            value:"#0000ff",
                            caption:"图例3"
                        },{
                            value:"#dd00ff",
                            caption:"图例4"
                        },
                    ]
                },{
                    type:"icon",
                    sort:"dsc",
                    layerId:"sadsadasasdasd",
                    title:"ttttttttttttttt",
                    data:[],
                    legend:[
                        {
                            value: require("../../examples/assets/logo.png"),
                            caption:"图例1"
                        }, {
                            value:require("../../examples/assets/soil.png"),
                            caption:"图例2"
                        }, {
                            value:require("../../examples/assets/soil.png"),
                            caption:"图例3"
                        },{
                            value:require("../../examples/assets/soil.png"),
                            caption:"图例4"
                        },


                    ]
                }]
            },*/
            data:[
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"郑州市",
                    lngLat:[113.65,34.76],
                    value:100,
                },
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"开封市",
                    lngLat:[114.35,34.79],
                    value:50,
                },
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"荥阳",
                    lngLat:[113.35,34.79],
                    value:90,
                },
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"平顶山",
                    lngLat:[113.29,33.75],
                    value:70,
                },
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"新郑",
                    lngLat:[113.71,34.4],
                    value:90,
                },
                {
                    name:"水稻",
                    metrics:"产量",
                    unit:"吨",
                    space:"登封",
                    lngLat:[113.02,34.46],
                    value:66,
                },
            ],
            keyInfo:[
                {key:"name", name:"名称"},
                {key:"metrics",name:"类型"},
                {key:"space",name:"地区"},
                {key:"value",name:"产值"},
                {key:"unit",name:"单位"}

            ],
            layerStyle:{
                type:"point",
                showTip:true,
                showIcon:true,
                showLabel:true,
                icon:require("../assets/soil.png"),
            },
            mapList:[
                {
                    "id":"1301430702843101186",
                    "mapName":"矢量地形图",
                    "centerPoint":"106.35,38.9",
                    "scale":"3",
                    "icon":"base_v",
                    "sortIndex":1,
                    "defaultFlag":"1",
                    "serviceUrl":"https://iserver.supermap.io/iserver/services/data-world/rest/data",
                    "versionIds":"1301451146820325378,1301451146832908290",
                    "mapVersionDtoList":[
                        {"id":"1301451146820325378",
                            "versionCode":null,
                            "versionName":"新版本_1",
                            "layerIds":"07ada57a-bf47-470b-b56f-d4779dd94d47",
                            "dataInfoList":[{"id":"07ada57a-bf47-470b-b56f-d4779dd94d47","resourceName":"中国矢量图","resourceTypeBig":"2","resourceTypeSmall":"5","resourceUrl":"http://192.168.191.239:8090/iserver/services/map-china400/rest/maps/China","delFlag":null,"resourceSummary":"中国矢量图","deptId":"1","deptName":null,"sourceId":null,"sourceName":null,"resourceDate":null,"shopFlag":"1","metedataId":null}]},{"id":"1301451146832908290","versionCode":null,"versionName":"新版本_2","layerIds":"f7aeca53-cd8b-43c8-86c9-a87cb20c0d35","dataInfoList":[{"id":"f7aeca53-cd8b-43c8-86c9-a87cb20c0d35","resourceName":"长春市区矢量图","resourceTypeBig":"2","resourceTypeSmall":"5","resourceUrl":"http://192.168.191.239:8090/iserver/services/map-changchun/rest/maps/长春市区图","delFlag":null,"resourceSummary":"长春市区矢量图","deptId":"1","deptName":null,"sourceId":null,"sourceName":null,"resourceDate":null,"shopFlag":"1","metedataId":null}]}]},
                {
                    "id":"1303234962673160194",
                    "mapName":"深空黑夜图",
                    "centerPoint":"88,0",
                    "scale":"3",
                    "icon":"base_d",
                    "sortIndex":2,
                    "defaultFlag":"1",
                    "serviceUrl":"",
                    "versionIds":"1303234962580885505",
                    "mapVersionDtoList":[{"id":"1303234962580885505","versionCode":null,"versionName":"新版本_1","layerIds":"c131c7d7-b748-4b08-8f91-48ecd6455cf6,6e099edb-69e4-453d-8bd9-b3dbe989678c","dataInfoList":[{"id":"c131c7d7-b748-4b08-8f91-48ecd6455cf6","resourceName":"世界地图矢量黑夜","resourceTypeBig":"2","resourceTypeSmall":"5","resourceUrl":"http://192.168.191.239:8090/iserver/services/map-world/rest/maps/世界地图_Day","delFlag":null,"resourceSummary":"世界地图矢量黑夜","deptId":"1","deptName":null,"sourceId":null,"sourceName":null,"resourceDate":null,"shopFlag":"1","metedataId":null},{"id":"6e099edb-69e4-453d-8bd9-b3dbe989678c","resourceName":"京津地区地形图","resourceTypeBig":"2","resourceTypeSmall":"5","resourceUrl":"http://192.168.191.239:8090/iserver/services/map-jingjin/rest/maps/京津地区地图","delFlag":null,"resourceSummary":"京津地区地形图","deptId":"1","deptName":null,"sourceId":null,"sourceName":null,"resourceDate":null,"shopFlag":"1","metedataId":null}]}]},
            ],
            mapConfig:{
                iconConfig:{
                    iconId:"5f56d9ba7f3f8a0a4c21162d",
                    iconClass:"1303136885643796481",
                    iconTree: [{"id":"1303136637382942722","typeName":"畜牧业","parentId":"0","delFlag":null,"child":[{"id":"1303136851518939137","typeName":"家庭农场","parentId":"1303136637382942722","delFlag":null,"child":[{"id":"1303136885643796481","typeName":"蛋鸡","parentId":"1303136851518939137","delFlag":null,"child":null}]}]},{"id":"1303136770682118145","typeName":"种植业","parentId":"0","delFlag":null,"child":null},{"id":"1305311816984924162","typeName":"灾害","parentId":"0","delFlag":null,"child":null},{"id":"1305312215414444034","typeName":"默认符号","parentId":"0","delFlag":null,"child":null}],
                    iconPath: [{"id":"1303136966665166850","iconTypeId":"1303136885643796481","iconName":"蛋鸡","icon":"5f56d9ba7f3f8a0a4c21162d","delFlag":null,"typeName":"蛋鸡"},{"id":"1305312317856124929","iconTypeId":"1305312215414444034","iconName":"默认符号1","icon":"5f5ec3ce7f3f8a0a4c211673","delFlag":null,"typeName":"默认符号"},{"id":"1305312429856624642","iconTypeId":"1305312215414444034","iconName":"默认符号2","icon":"5f5ec3e97f3f8a0a4c211675","delFlag":null,"typeName":"默认符号"},{"id":"1305426060476788737","iconTypeId":"1305311816984924162","iconName":"冰雹","icon":"5f5f2dbc7f3f8a0a4c2116a1","delFlag":null,"typeName":"灾害"},{"id":"1305426290001686530","iconTypeId":"1305311816984924162","iconName":"霜冻","icon":"5f5f2df27f3f8a0a4c2116a3","delFlag":null,"typeName":"灾害"},{"id":"1305426437842513921","iconTypeId":"1305311816984924162","iconName":"雷暴","icon":"5f5f2e167f3f8a0a4c2116a5","delFlag":null,"typeName":"灾害"},{"id":"1305426711487295490","iconTypeId":"1305311816984924162","iconName":"风暴","icon":"5f5f2e577f3f8a0a4c2116a7","delFlag":null,"typeName":"灾害"}],
                },
                layerConfig:{
                    name:"事故",
                    layerId:"",
                    data:[],
                    id:"",
                    type:"point",
                    renderType:"scatter",
                },
                boderConfig:{
                    isShow:true,
                    color:"#ffffff",
                    width:1
                },
                renderColor:{
                    isShow:true,
                    color:"绿色-蓝色",
                    defaultConfigColorArr:[
                        {
                            colorArr:[
                                "rgb(247,252,245)",
                                "rgb(229,245,224)",
                                "rgb(199,233,192)",
                                "rgb(161,217,155)",
                                "rgb(116,196,118)",
                                "rgb(65,171,93)",
                                "rgb(35,139,69)",
                                "rgb(0,109,44)",
                                "rgb(0,68,27)"
                            ],
                            styleStr:"",
                            colorName:"蜜瓜绿-深绿色"
                        },
                        {
                            colorArr:[
                                "rgb(255,255,229)",
                                "rgb(255,247,188)",
                                "rgb(254,227,145)",
                                "rgb(254,196,79)",
                                "rgb(254,153,41)",
                                "rgb(236,112,20)",
                                "rgb(204,76,2)",
                                "rgb(153,52,4)",
                                "rgb(102,37,6)"
                            ],
                            styleStr:"",
                            colorName:"浅黄-红褐色"
                        },
                        {
                            colorArr:[
                                "rgb(247,252,240)",
                                "rgb(224,243,219)",
                                "rgb(204,235,197)",
                                "rgb(168,221,181)",
                                "rgb(123,204,196)",
                                "rgb(78,179,211)",
                                "rgb(43,140,190)",
                                "rgb(8,104,172)",
                                "rgb(8,64,129)"
                            ],
                            styleStr:"",
                            colorName:"绿色-蓝色"
                        },
                        {
                            colorArr:[
                                "rgb(255,247,236)",
                                "rgb(254,232,200)",
                                "rgb(253,212,158)",
                                "rgb(253,187,132)",
                                "rgb(252,141,89)",
                                "rgb(239,101,72)",
                                "rgb(215,48,31)",
                                "rgb(179,0,0)",
                                "rgb(127,0,0)",
                            ],
                            styleStr:"",
                            colorName:"黄色-橙色"
                        },
                        {
                            colorArr: [
                                "rgb(255,245,193)",
                                "rgb(255,240,163)",
                                "rgb(255,235,133)",
                                "rgb(255,230,102)",
                                "rgb(255,225,72)",
                                "rgb(255,220,42)",
                                "rgb(255,214,11)",
                            ],
                            styleStr: "",
                            colorName: '浅黄-亮黄'
                        },
                        {
                            colorArr: [
                                'rgb(244, 209, 102)',
                                'rgb(209, 201, 95)',
                                'rgb(175, 193, 91)',
                                'rgb(142, 184, 88)',
                                'rgb(111, 172, 86)',
                                'rgb(84, 160, 84)',
                                'rgb(67, 147, 80)',
                                'rgb(53, 133, 75)',
                                'rgb(38, 120, 65)',
                                'rgb(20, 108, 54)',
                            ],
                            styleStr: "",
                            colorName: '金色-绿色'
                        },
                        {
                            colorArr: [
                                'rgb(188, 228, 216)',
                                'rgb(160, 212, 209)',
                                'rgb(135, 198, 204)',
                                'rgb(110, 184, 197)',
                                'rgb(83, 169, 189)',
                                'rgb(62, 153, 180)',
                                'rgb(53, 137, 169)',
                                'rgb(51, 120, 157)',
                                'rgb(47, 104, 145)',
                                'rgb(44, 89, 133)',
                            ],
                            styleStr: "",
                            colorName: '蓝绿色-蓝色'
                        },
                        {
                            colorArr: [
                                'rgb(185, 221, 241)',
                                'rgb(164, 206, 233)',
                                'rgb(144, 190, 222)',
                                'rgb(126, 174, 211)',
                                'rgb(110, 159, 199)',
                                'rgb(95, 144, 186)',
                                'rgb(80, 129, 174)',
                                'rgb(68, 114, 160)',
                                'rgb(56, 101, 146)',
                                'rgb(42, 89, 133)',
                            ],
                            styleStr: "",
                            colorName: '蓝色'
                        },
                        {
                            colorArr: [
                                'rgb(241, 241, 241)',
                                'rgb(234, 230, 210)',
                                'rgb(227, 220,181)',
                                'rgb(221, 210, 153)',
                                'rgb(214, 200, 126)',
                                'rgb(208, 190, 101)',
                                'rgb(202, 181, 78)',
                                'rgb(195, 171, 55)',
                                'rgb(188, 162, 34)',
                                'rgb(183, 155, 15)',
                            ],
                            styleStr: "",
                            colorName: '金黄色'
                        },
                        {
                            colorArr: [
                                'rgb(238, 219, 189)',
                                'rgb(235, 200, 146)',
                                'rgb(231, 181,117)',
                                'rgb(225, 162, 96)',
                                'rgb(215, 145, 85)',
                                'rgb(203, 127, 79)',
                                'rgb(194, 108, 67)',
                                'rgb(185, 89, 56)',
                                'rgb(174, 69, 51)',
                                'rgb(159, 54, 50)',
                            ],
                            styleStr: "",
                            colorName: '暗红色'
                        },
                        {
                            colorArr: [
                                'rgb(255, 198, 133)',
                                'rgb(249, 181, 99)',
                                'rgb(245, 163,67)',
                                'rgb(244, 142, 50)',
                                'rgb(239, 121, 37)',
                                'rgb(230, 103, 32)',
                                'rgb(213, 91, 33)',
                                'rgb(195, 81, 34)',
                                'rgb(176, 71, 35)',
                                'rgb(158, 61, 34)',
                            ],
                            styleStr: "",
                            colorName: '橙色'
                        },
                        {
                            colorArr: [
                                'rgb(254,255,217)',
                                'rgb(217,251,200)',
                                'rgb(238,248,183)',
                                'rgb(223, 243, 178)',
                                'rgb(205, 237, 177)',
                                'rgb(180, 227, 179)',
                                'rgb(148, 214, 183)',
                                'rgb(118, 202, 188)',
                                'rgb(91, 192, 192)',
                                'rgb(65, 183, 196)',
                            ],
                            styleStr: "",
                            colorName: '蓝色-绿色连续'
                        },
                        {
                            colorArr: [
                                'rgb(229,229,229)',
                                'rgb(225,227,231)',
                                'rgb(222,226,232)',
                                'rgb(219, 225, 234)',
                                'rgb(219, 225, 234)',
                                'rgb(211, 222, 237)',
                                'rgb(208, 220, 239)',
                                'rgb(204, 218, 240)',
                                'rgb(200, 217, 241)',
                                'rgb(196, 216, 243)',
                            ],
                            styleStr: "",
                            colorName: '浅蓝色'
                        },
                        {
                            colorArr: [
                                'rgb(229,229,229)',
                                'rgb(231,224,220)',
                                'rgb(234,221,212)',
                                'rgb(237,217,203)',
                                'rgb(240,213,194)',
                                'rgb(243,209,185)',
                                'rgb(246,205,176)',
                                'rgb(248,200,166)',
                                'rgb(251,196,157)',
                                'rgb(255,192,147)',
                            ],
                            styleStr: "",
                            colorName: '浅橙色'
                        },
                        {
                            colorArr: [
                                'rgb(82,153,133)',
                                'rgb(97,156,119)',
                                'rgb(113,159,105)',
                                'rgb(140, 170, 93)',
                                'rgb(179, 188, 82)',
                                'rgb(229, 199, 73)',
                                'rgb(73, 191, 76)',
                                'rgb(234, 171, 78)',
                                'rgb(214, 139, 79)',
                                'rgb(194, 194, 81)',
                            ],
                            styleStr: "",
                            colorName: '温度发散'
                        }
                    ],
                }
            }
        }
    },
    mounted(){
        for(let val of this.mapConfig.renderColor.defaultConfigColorArr){
            val.styleStr=`linear-gradient(to right,`;
            let svg = parseInt(100/val.colorArr.length);
            for(let i =0,l=val.colorArr.length;i<l;i++){
                if(i===0){
                    val.styleStr+=`${val.colorArr[i]},`
                }else if(i===l-1){
                    val.styleStr+=`${val.colorArr[i]} 100%)`
                }else {
                    val.styleStr+=`${val.colorArr[i]} ${i*svg}%,${val.colorArr[i+1]} ${(i+1)*svg}%,`
                }
            }
        }
    },
    methods:{
        saveLayer:function(val){
            console.log(val);
        },
        getCurrentLayer:function(val){
            this.currentLayer =val;
        },
        getLegendActive:function(val){
            console.log(val);
        },
        getConfig:function (val) {
            switch (val.type) {
                case "renderType":
                    this.mapConfig.layerConfig.renderType = val.value;
                    break;
                case "boundariesColor":
                    this.mapConfig.boderConfig.color = val.value;
                    break;
                case "boundariesWidth":
                    this.mapConfig.boderConfig.width = val.value;
                    break;
                case "renderColor":
                    for(let item of this.mapConfig.renderColor.defaultConfigColorArr){
                        if(val.value===item.colorName){
                            this.mapConfig.renderColor.color = item.colorArr;
                        }
                    }
                    break;
                case "renderIcon":
                    this.mapConfig.iconConfig.iconPath = val.value;
                    break;
            }
        },
        getBaseMap:function(obj){
            console.log(obj);
        }
    }
}
</script>
<style lang="scss">
  #map-box {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    #map {
      width: 100%;
      height: 100%;

    }
    #__map-config-box {
      position: fixed;
      z-index: 2;
      width: 280px;
      top: 70px;
      right: 0;
      height: calc(100% - 70px);
      #__map-layer {
        height: calc(100% - 420px)
      }
      #__map-config {
        height: 350px;
      }
    }

    .mapboxgl-canvas {
      left: 0;
    }
  }
</style>
