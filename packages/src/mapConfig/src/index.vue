<template>
  <div id="configBox" v-if="currentLayer">
    <h4 :style="{backgroundImage:'url('+iconEdit+')'}">智能可视化配置 <em><img :src="iconTrangleTop" @click="trangle=!trangle"></em></h4>
    <div class="row-box" v-show="trangle">
      <div class="_title">{{currentLayer.layerName}}</div>
      <form>
        <el-row type="flex">
          <el-col class="label-font">渲染方式:</el-col>
          <el-col :span="24"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div id="__render-box">
              <ul id="__render-list">
                <li v-for="(item,index) of layerData" @click="setConfig('renderType',item.layerType)" :key="index" :class="{actived:item.layerType===clonConfig.layerConfig.renderType}">
                  <img v-if="item.layerType===renderType" :src="item.activeIcon">
                  <img v-else :src="item.icon">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </el-col>

        </el-row>
        <el-row type="flex">
          <el-col class="label-font">边界颜色:</el-col>
          <el-col :span="24" class="__bounds-box">
            <div class="__bounds-box-left">
              <el-color-picker
                      v-model="boundariesColor"
                      @change="setConfig('boundariesColor',boundariesColor)"
                      color-format="hex"
                      :predefine="predefineColors"
                      class="color-box"></el-color-picker>
              <div class="color-font-box">
                {{boundariesColor}}
              </div>
            </div>
            <div class="__bounds-box-right">
              <el-select
                      @change="setConfig('boundariesWidth',boundariesWidth)"
                      v-model="boundariesWidth"
                      placeholder="请选择">
                <el-option

                        v-for="item in boundariesWidthOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>

            <!--
            <el-input class="" v-model="boundariesColor" placeholder="请输入内容"></el-input>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>-->
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col class="label-font" >渲染方案:</el-col>
          <el-col :span="24">
            <el-select
                    clearable
                    v-model="renderColor"
                    @change="setConfig('renderColor',renderColor)"
                    placeholder="请选择">
              <el-option
                      v-for="(item,index) in clonConfig.renderColor.defaultConfigColorArr"
                      :label="item.colorName"
                      :key="index"
                      :value="item.colorName"
                      :style="{
                      'margin-bottom':'5px',
                      'background-image':item.styleStr,
                      'background-size':'40% 60%',
                      'background-repeat':'no-repeat',
                      'padding-left':'50%!important',
                      'background-position':'10px center'
                     }">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col class="label-font" >符号配置:</el-col>
          <el-col :span="12" style="margin-right: 10px">
            <el-cascader
                    v-model="renderIconClass"
                    :props="iconProps"
                    :options="clonConfig.iconConfig.iconTree"
                    @change="setConfig('renderClass',renderIconClass)">
            </el-cascader>
          </el-col>
          <el-col :span="12" style="padding-top: 5px">

            <el-select
                    clearable
                    v-model="renderIcon"
                    @change="setConfig('renderIcon',renderIcon)"
                    placeholder="请选择">
                  <el-option v-for="(item,index) in clonConfig.iconConfig.iconPath"
                          :label="item.iconName"
                          :key="index"
                          :value="item.icon">
                    <span></span>
                    <img :src="'/mongo/file/download/'+item.icon+'.png'" />
                  </el-option>
            </el-select>
          </el-col>
        </el-row>

      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'mapConfig',
        data () {
            return {
                iconProps:{
                    label:"typeName",
                    children:"child",
                    value:"id"
                },
                renderType:"scatter",
                clonConfig:null,
                layerData:[
                    {
                        type:"point",
                        icon:require("./assets/images/scatter.png"),
                        activeIcon:require("./assets/images/scatter_active.png"),
                        name:"散点图",
                        layerType:"scatter"
                    },
                    {
                        type:"point",
                        icon:require("./assets/images/cluster.png"),
                        activeIcon:require("./assets/images/cluster_active.png"),
                        name:"聚合图",
                        layerType:"cluster"
                    },
                    {
                        type:"point",
                        icon:require("./assets/images/honeycomb.png"),
                        activeIcon:require("./assets/images/honeycomb_active.png"),
                        name:"蜂巢图",
                        layerType:"honeycomb"
                    },
                    {
                        type:"point",
                        icon:require("./assets/images/grid.png"),
                        activeIcon:require("./assets/images/grid.png"),
                        name:"格网图",
                        layerType:"grid"
                    },
                    {
                        type:"point",
                        icon:require("./assets/images/heat.png"),
                        activeIcon:require("./assets/images/heat_active.png"),
                        name:"热力图",
                        layerType:"heat"
                    },
                    {
                        type:"point",
                        icon:require("./assets/images/hexagon.png"),
                        activeIcon:require("./assets/images/hexagon_active.png"),
                        name:"柱状图",
                        layerType:"hexagon"
                    },
                ],
                trangle:true,
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                ],
                iconTrangleTop:require("./assets/images/trangle_top.png"),
                iconEdit:require("./assets/images/edit_icon.png"),
                value:"",
                options:[],
                legendForm:{
                    legends:[
                        { key:"","text":"",remark:"",icon:""},
                        { key:"","text":"",remark:"",icon:""}
                    ],
                    dataSource:null,
                    legendType:null,
                },
                legendRules:{
                    legendType:[
                        {required: true, message: '请选择图例类型', trigger: 'change'}
                    ],
                },
                configMethod:null,
                defaultMapConfig: null,
                opacityVal: 0.2,
                boundariesColor: '#c71585',
                boundariesWidth: 1,
                boundariesWidthOptions:[
                    {"label":"0.25px",value:0.25},
                    {"label":"0.5px",value:0.5},
                    {"label":"0.75px",value:0.75},
                    {"label":"1px",value:1},
                    {"label":"1.25px",value:1.25},
                    {"label":"1.5px",value:1.5},
                    {"label":"1.75px",value:1.75},
                    {"label":"2px",value:2},
                    {"label":"2.25px",value:2.25},
                    {"label":"2.5px",value:2.5},
                    {"label":"2.75px",value:2.75},
                    {"label":"3px",value:3},
                ],
                renderColor: null,
                renderIconClass:null,
                renderIcon:"",
                renderIconArr:[]
            }
        },
        props:['mapConfig','currentLayer'],
        created(){},
        mounted(){},
        methods: {
            setRenderIconClass(val){
                this.$emit("iconClass",{classId:val});
            },
            setConfig:function(type,value){
                this.$emit("getConfig",{value, type});
            },
            submitUploadImg(){

            },
            removeLegend(){

            },
            uploadImg(){

            },
            removeImg(){

            },
            addLegend(){

            },
            saveLegend(){

            }
        },
        watch:{
            mapConfig:{
                handler(newVal,oldVal){
                    if(newVal){
                        this.clonConfig = JSON.parse(JSON.stringify(newVal));
                        this.boundariesColor = this.clonConfig.boderConfig&&this.clonConfig.boderConfig.color||"#C71585";
                        this.boundariesWidth = this.clonConfig.boderConfig&&this.clonConfig.boderConfig.width||0.25;
                        this.renderType = this.clonConfig.layerConfig&&this.clonConfig.layerConfig.renderType||"scatter";
                        this.renderColor = this.clonConfig.renderColor&&this.clonConfig.renderColor.color||"蓝色-绿色";
                        this.renderIconClass = this.clonConfig.iconConfig.iconClass&&this.clonConfig.iconConfig.iconClass||"1303136885643796481";
                        this.renderIcon =this.clonConfig.iconConfig.iconId&&this.clonConfig.iconConfig.iconId||"5f56d9ba7f3f8a0a4c21162d";
                    }
                },
                deep:true,
            },
            currentLayer:{
                handler(newVal,oldVal){
                  console.log(newVal);
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
  #configBox {
    color: #fff;
    height: auto;
    right: 10px;
    top: 40px;
    max-width: 280px;
    text-align: left;
    background-color:#192f4c;
    .row-box {
      padding:0 0 30px;
    }
    h4 {
      position: relative;
      z-index: 1;
      margin: 0;
      padding: 0 0 0 30px;
      background-color: #2580ef;
      height: 30px;
      line-height: 30px;
      background-repeat: no-repeat;
      em {
        position: absolute;
        z-index: 2;
        display: inline-block;
        width: 30px;
        height: 30px;
        cursor: pointer;
        right: 0;
        top: 0;
      }
    }
    ._title {
      height: 20px;
      line-height: 20px;
      color: #ae8c18;
      font-size: 12px;
      text-align: center;
      border-bottom: 1px dashed #ae8c18;
    }
    #__render-box {
      width: 100%;
      height: auto;
      ul,li {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      #__render-list {
        display: flex;
        flex-wrap:wrap ;
        li {
          position: relative;
          z-index: 1;
          cursor: pointer;
          font-size: 12px;
          color: #c9e2f1;
          flex: 0 0 50px;
          height: 50px;
          margin: 0 25px 10px 10px;
          border-radius: 2px;
          background-repeat: no-repeat;
          background-position: center 0;
          img {
            width: 40px;
            height: 40px;
            margin: 0 5px;
          }
          &.actived {
            background-color: rgba(5,205,235,.2);
            border: 1px solid #05cdeb;
          }
          span {
            position: absolute;
            z-index: 2;
            display: inline-block;
            width: 50px;
            left: 0;
            bottom: 0;
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
    .__bounds-box-left {
      float: left;
      display: flex;
      width: 100px;
      height: 30px;
      margin-right: 10px;
      border: 1px solid #497bb8;
      border-radius: 2px;
      .color-box {
        flex: 0 0 30px;
      }
      .color-font-box {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #c9e2f1;
        line-height: 30px;
      }
    }
    .__bounds-box-right {
      float: left;
      width: 75px;
    }
    ::v-deep .el-select-dropdown__item {
      height: 30px;
    }
    ::v-deep .el-input {
      font-size: 12px;
    }
    ::v-deep .el-input__inner {
      background: transparent;
      border-radius: 2px;
      height: 32px;
      color:#c9e2f1;
      line-height: 32px;
      border: 1px solid #497bb8;
    }
    ::v-deep .el-input__icon {
      line-height: 30px;
      height: 30px;
      color: #1cc8ef;
      &:before {
        content: '\e790';
      }
    }
    ::v-deep .el-radio__label {
      color: #fff;
    }
    ::v-deep .el-color-picker__trigger {
      height: 30px;
      width: 30px;
      border:none;
    }
    .icon_box {
      position: relative;
      z-index: 1;
      img {
        position: absolute;
        z-index: 2;
      }
      .el-select {
        position: absolute;
        z-index: 1;
        .el-input--suffix>.el-input__inner {
          visibility: hidden;

        }
      }
    }
    .label-font,::v-deep .el-form-item__label {
      font-size: 14px;
      min-width: 70px;
      max-width: 70px;
      width: 70px;
      height: 30px;
      line-height: 30px;
      padding: 0 2px;
      margin: 0;
      color: #c9e2f1;
      &.font-padding {
        margin-left: 10px;
      }
    }
    .label-remark {
      min-width: 60px;
      max-width: 60px;
      width: 60px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      background: #1563a4;
      border: 1px solid #1ccff7;
      text-align: center;
      margin-top: 5px;
    }
    .el-row {
      padding: 10px 10px 0;
    }
    .el-input__inner {
      font-size: 12px!important;
      height: 30px !important;
      line-height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
    .colorPicker {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      height: 30px;

      /*span {
        flex: 0 0 20px;
        display: inline-block;
        height: 20px;
        margin:5px 0 0 ;
        border-width: 1px;
        border-style: solid;
      }*/
    }
    .el-switch {
      margin-top: 5px;
    }
    .el-switch__core {
      border-color: rgb(21, 98, 164);
      // background-color: rgb(21, 98, 164);
      /*        outline:1px;
              border:1px solid #1ccff7;*/
      &:after {
        background: #1ccff7;
      }
    }
  }
</style>
