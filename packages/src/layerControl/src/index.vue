<template>
  <div id="__layerControl">
    <h4>图层 <span :style="{backgroundImage:'url('+iconSave+')'}" @click="__saveLayer('save')">保存</span></h4>
    <div class="__operate-list">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,pIndex) of cloneNewVal" :name="pIndex" :key="pIndex" >
          <template slot="title">
            <h5><em :style="{backgroundImage:'url('+iconOpen+')'}"></em> {{item.layerName}}</h5>
          </template>
          <div class="__layer-list">
            <div class="__layer-list-top">
              <div class="__opactiy-font">透明度</div>
              <div class="__layer-slider-box"><el-slider @change="changeCheckedOpacity" :show-tooltip="false" v-model="opacityValue"></el-slider></div>
              <div class="__layer-text"> {{Math.abs(opacityValue)}}% </div>
              <div class="__layer-icon" :style="{backgroundImage:'url('+iconEdit+')'}" @click="editLayerHandler"></div>
              <div class="__layer-icon" :style="{backgroundImage:'url('+iconDown+')'}"></div>
              <div class="__layer-icon" :style="{backgroundImage:'url('+iconUp+')'}"></div>
              <div class="__layer-icon" :style="{backgroundImage:'url('+iconDel+')'}"></div>
            </div>
            <div class="__layer-list-legend">
              <ul class="__legend-box">
                <li v-for="(val,index) of item.legend" :key="index">
                  <span v-if="item.legendType==='color'" class="__legend-color"><em :style="{backgroundColor:val.value}"></em><b>{{val.caption}}</b></span>
                  <span v-if="item.legendType==='icon'"  class="__legend-icon"><em :style="{background:'url('+val.value+') no-repeat'}"></em><b>{{val.caption}}</b></span>
                </li>
              </ul>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>
<script>
    export default {
        name: 'layerControl',
        data () {
            return {
                currentLayer:null,
                cloneNewVal:null,
                opacityValue:1,
                activeName:0,
                iconSave:require('./assets/images/icon-save.png'),
                iconClose:require("./assets/images/eye-close.png"),
                iconOpen:require("./assets/images/eye-open.png"),
                iconEdit:require("./assets/images/icon-edit.png"),
                iconUp:require("./assets/images/icon-sort-up.png"),
                iconDown:require("./assets/images/icon-sort-down.png"),
                iconDel:require("./assets/images/el-icon-del.png"),
            }
        },
        props:{
            'layerArr':{
                type:Array,
                default:()=>[]
            },
        },
        created(){
        },
        mounted(){
            this.currentLayer = this.layerArr[this.activeName];
            this.$emit("getCurrentLayer",this.currentLayer)
        },
        methods: {
            editLayerHandler(){
                this.$emit("getCurrentLayer",this.layerArr[this.activeName])
            },
            getConfig:function(val){
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
            __saveLayer:function(type){
              this.$emit("saveLayer",this.layerArr)
            },
            selectAll:function () {

            },
            changeCheckedOpacity:function () {

            },
            toggleIndexUpFn:function () {

            },
            toggleIndexDownFn:function () {

            },
            deleteCheckedLayerFn:function () {

            }
        },
        watch:{
            map:{
                handler(newVal,oldVal){
                   console.log(newVal);
                },
                deep:true,
                immediate:true
            },
            layerArr:{
                handler(newVal,oldVal){
                  this.cloneNewVal = newVal;
                },
                deep:true,
                immediate:true
            }
        },
    }
</script>
<style lang="scss" scoped>
  #__layerControl {
    position: relative;
    z-index: 1;
    width: 280px;
    height: calc(100%);
    text-align: left;
    background: transparent;
    color: #c9e2f1!important;
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
        cursor: pointer;
        color: #1ccff7;
        display: block;
        width: auto;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        right: 24px;
        top:0;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 30px 30px;
      }
    }
    .__operate-list {
      height:  calc(100% - 70px);
      padding: 0 10px;
      .__layer-list-legend {
        ul,li {
          padding: 0 0;
          list-style: none;
        }
        li {
          color: #fff!important;
          padding:0 10px;
          height: 20px;
          margin: 5px auto;
          .__legend-icon {
            em {
              height: 20px!important;
              background-position: 15px 15px;
            }

          }
          .__legend-color,.__legend-icon {
            display: inline-flex;
            width: 100%;
            font-size: 12px;
            line-height: 20px;
            em {
              display: inline-block;
              flex: 0 0 40px;
              height: 15px;
              margin-right: 10px;
            }
            b {
              color: #fff!important;
              display: inline-block;
              flex: 1;
              height: 20px;
              background-size:auto 100%;
            }
          }
        }
      }
      ::v-deep .el-slider__runway {
        background-color: rgba(57,92,137,.5);
        height: 10px;
        border-radius: 5px;
        margin: 14px 0;
      }
      ::v-deep .el-slider__button-wrapper {
        top: -13px;
      }
      ::v-deep  .el-slider__button {
        border: none;
        background: #ae8c18;
      }
      ::v-deep .el-slider__bar{
        height: 10px;
        border-radius: 5px;
        background: #ae8c18;
      }
      ::v-deep .el-collapse {
        border: none;
        .__layer-list {
          border: 1px dashed #497bb8;
          padding: 0 10px 10px;
          .__layer-list-top {
            display: flex;
            height: 38px;
            line-height: 38px;
            .__opactiy-font {
              flex:  0 0 40px;
              margin-right: 8px;
            }
            .__layer-slider-box {
              flex: 1;
              margin-right: 10px;
            }
            .__layer-text {
              flex: 0 0 30px;
            }
            .__layer-icon {
              flex: 0 0 16px;
              cursor: pointer;
              background-position: center center;
              background-repeat: no-repeat;
            }
          }

        }
        .el-collapse-item__header {
          background: none;
          color: #fff;
          border-bottom: none;
          h5 {
            position: relative;
            z-index: 1;
            margin: 0;
            padding: 0 0 0 30px;
            font-size: 14px;
            em {
              position: absolute;
              z-index: 2;
              display: inline-block;
              width: 30px;
              height: 48px;
              left: 0;
              top:0px;
              background-position: left center;
              background-repeat: no-repeat;
            }
          }
          .el-icon-arrow-right {
            &:before {
              content:"\e791"
            }
            color: #2580ef;
          }

        }
        .el-collapse-item__wrap {
          background: none;
          border-bottom: none;

          .el-collapse-item__content {
            color: #b9d0df;
            padding-bottom: 0;
          }
        }
      }
    }
  }
</style>
