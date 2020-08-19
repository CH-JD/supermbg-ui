<template>
  <div class="basic-layer-box">
    <div class="basic-layer" v-if=" baseMapConfig">
      <button v-for="(val,index) of baseMapConfig" :disabled="val.checked" :key="index" :class="[{'actived':val.checked},val.key]" @click="toggleBaseLayer(val)">
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
        props:['baseMapConfig',"map"],
        mounted(){
        },
        methods: {
            toggleBaseLayer(val){
                if(!this.map.getSource(val.key)){
                  this.map.addSource(val.key,{
                      "type": "raster",
                      "tiles": [val.path],
                      "tileSize": 256
                  });
                }
                if(this.map.getLayer(val.key)){
                    this.map.removeLayer(val.key);
                }
                this.map.addLayer({
                    id: `${val.key}`,
                    source:val.key,
                    "type": "raster",
                    "minzoom": 0,
                    "maxzoom": 22
                });
                this.$emit("getBaseMap",val);
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
