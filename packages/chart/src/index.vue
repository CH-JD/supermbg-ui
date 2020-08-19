<template>
  <div class="chart">
    <div :id="id" :type="type" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import {parseChart} from "./nx-chart-config"
export default {
  name: "chart",
  components: {},
  props:{
   id:{},
   type:{},
   data:{
     type:Array,
     default:[]
   }
  },
  data() {
    return {
      chart:null
    }
  },
  created() {},
  watch: {
    config:{
      handler(newVal,oldVal){
        if(newVal&&newVal!=oldVal){
          this.config = newVal;
          this.option = parseChart(this.type,this.config,this.data);
          this.chart.setOption(this.option);
        }

      },
      deep:true
    },
    data:{
      handler(newVal,oldVal){
        if(newVal&&newVal!=oldVal){
          this.data = newVal;
          this.option = parseChart(this.type,this.config,this.data);
          this.chart.setOption(this.option);
        }

      },
      deep:true
    },
  },
  mounted() {
    this.chart=echarts.init(document.getElementById(this.id));
    this.option = parseChart(this.type,this.config,this.data);
    this.chart.setOption(this.option);
    this.chart.on("click", param=>{
      this.$emit("chartClick", param);
   })
  },
  computed: {}
}
</script>
<style scoped>
.chart{
  height: 100%;
  width: 100%;
}
</style>
