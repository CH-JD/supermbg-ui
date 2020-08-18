<template>
  <div id="configBox">
    <form>
      <el-row type="flex" v-if="mapConfig.boderConfig.isShow">
        <el-col class="label-font">边界颜色:</el-col>
        <el-col :span="4">
          <div class="colorPicker">
            <el-color-picker v-model="boundariesColor" color-format="rgb" @change="setConfig('boundariesColor',boundariesColor)"></el-color-picker>
          </div>
        </el-col>
        <el-col class="label-font">界线粗细:</el-col>
        <el-col :span="18">
          <el-slider
            v-model="boundariesWidth"
            @change="setConfig('boundariesWidth',boundariesWidth)"
            :min="0"
            :step="0.25"
            :max="5">
          </el-slider>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="mapConfig.opacity.isShow">
        <el-col class="label-font">透明度:</el-col>
        <el-col :span="18">
          <el-slider
            @change="setConfig('opacity',opacityVal)"
            v-model="opacityVal"
            :min="0"
            :step="0.1"
            :max="1">
          </el-slider>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="mapConfig.renderColor.isShow">
        <el-col class="label-font" >渲染方案:</el-col>
        <el-col :span="24">
          <el-select
            clearable
            v-model="renderColor"
            @change="setConfig('renderColor',renderColor)"
            placeholder="请选择">
            <el-option
              v-for="(item,index) in defaultMapConfig"
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
    </form>
  </div>
</template>

<script>
    export default {
        name: 'mapCon',
        data () {
            return {
                defaultMapConfig: null,
                opacityVal: 0.2,
                boundariesColor: null,
                boundariesWidth: 1,
                renderColor: null,

            }
        },
        props:['mapConfig'],
        created(){

        },
        mounted(){},
        methods: {
            setConfig:function(type,value){
                this.$emit("getConfig",{value, type});
            },
        },
        watch:{
            mapConfig:{
                handler(newVal,oldVal){
                    if(newVal){
                        if(newVal.renderColor.defaultConfigColorArr){
                            this.defaultMapConfig = JSON.parse(JSON.stringify(newVal.renderColor.defaultConfigColorArr));
                        }
                        for(let val of this.defaultMapConfig){
                            val.styleStr = `linear-gradient(to right,`;
                            let svg = parseInt(100 / val.colorArr.length);
                            for(let i = 0, l = val.colorArr.length; i < l; i++) {
                                if(i === 0){
                                    val.styleStr += `${val.colorArr[i]},`
                                }else if(i === l-1){
                                    val.styleStr += `${val.colorArr[i]} 100%)`
                                }else {
                                    val.styleStr += `${val.colorArr[i]} ${i*svg}%,${val.colorArr[i + 1]} ${(i + 1)*svg}%,`
                                }
                            }
                        }
                    }
                },
                deep:true,
                immediate:true,
            }
        },
    }
</script>
<style lang="scss" scoped>
  #configBox {
    position: fixed;
    z-index: 1;
    right: 10px;
    top: 40px;
    width: 420px;
    height: auto;
    padding:10px 20px;
    text-align: left;
    background: #015186;
    border: 1px solid #26b8ff;
    color: #fff;
    box-shadow:#26b8ff 0 0 10px inset;
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
    .label-font {
      min-width: 120px;
      max-width: 120px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      padding: 0 2px;
      margin: 0;
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
      padding: 10px 0 0;
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
      .el-color-picker__trigger {
        height: 30px;
        width: 30px;
        border:none;
      }
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
