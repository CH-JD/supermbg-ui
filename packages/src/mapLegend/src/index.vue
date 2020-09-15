<template>
    <div id="mapLegend" v-if="legendConfig">
      <h4>{{legendConfig.title}}</h4>
      <el-collapse v-model="activeNames" @change="handleChange" accordion >
        <el-collapse-item v-for="val of legendConfig.data" :key="val.layerId" :title="val.title" :name="val.layerId" >
          <dl>
            <dt>{{val.title}}</dt>
            <dd v-for="(item,index) of val.legend" :key="index">
                <span v-if="val.type==='color'" class="__legend-color">
                  <em :style="{backgroundColor:item.value}"></em>
                  <b>{{item.caption}}</b>
                </span>
                <span v-if="val.type==='icon'" class="__legend-icon">
                  <em :style="{background:'url('+item.value+') no-repeat'}"></em>
                  <b>{{item.caption}}</b>
                </span>
            </dd>
          </dl>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
    import mapMixin from '../../../_mapcore/_sourceModel/index'
    export default {
        name: 'mapLegend',
        data () {
            return {
                activeNames:null,
            }
        },
        mixins:['mapMixin'],
        props:{
            'legendConfig':{
                type:Object,
                default:() => null
            }
        },
        created(){
            if( this.legendConfig){
               this.activeNames =  this.legendConfig.activeNames
            }
        },
        mounted(){},
        methods: {
            handleChange(val){
                this.$emit("getLegendActive",val)
            }
        },
        watch:{},
    }
</script>
<style lang="scss" scoped>
  #mapLegend {
    position: fixed;
    z-index: 1;
    left: 10px;
    bottom: 40px;
    width: 240px;
    height: auto;
    padding:10px 5px;
    text-align: left;
    background: #015186;
    border: 1px solid #26b8ff;
    color: #fff!important;
    box-shadow:#26b8ff 0 0 10px inset;
    h4 {
      margin: 10px 0 ;
    }
    dt {
      color: #fff!important;
      padding-left: 20px;
    }
    .__legend-color,.__legend-icon {
      display: inline-flex;
      width: 100%;
      font-size: 12px;
      line-height: 20px;
      em {
        display: inline-block;
        flex: 0 0 40px;
        height: 20px;
      }
      b {
        color: #fff!important;
        display: inline-block;
        flex: 1;
        height: 20px;
        background-size:auto 100%;
      }
    }
    ::v-deep .el-collapse {
      border-top: 1px solid #1ccff7;
      color: #fff!important;
    }
    ::v-deep .el-collapse-item__header {
      background: none;
      padding-left: 10px;
      border-bottom: 1px solid #1ccff7;
      color: #fff!important;
    }
    ::v-deep .el-collapse-item__wrap {
      background: none;
      border-bottom: 1px solid #1ccff7;
    }
  }
</style>
