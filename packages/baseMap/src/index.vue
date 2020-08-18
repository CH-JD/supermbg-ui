<template>
  <div class="basic-layer-box">
    <div class="basic-layer">
      <button v-for="(val,index) of baseMapData" :disabled="val.isChecked" :key="index" :class="[{'actived':val.isChecked},val.key]" @click="toggleBaseLayer(val)">
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
        props:['baseMapData'],
        mounted(){
            console.log(this.baseMapData);
        },
        methods: {
            toggleBaseLayer(key){
                this.$emit("getBaseMap",key);
            }
        },
        watch:{
            baseMapData:{
                handler(newVal,oldVal){

                },
                deep:true,
                immediate:true,
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
