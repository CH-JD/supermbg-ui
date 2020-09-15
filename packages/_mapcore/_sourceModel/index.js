import("../../_static/_libs/mapboxgl/mapbox-gl-enhance.css")
import("../../_static/_libs/iclient-mapboxgl/iclient-mapboxgl.min.css");
import("../../_static/_libs/mapbox-gl-draw/mapbox-gl-draw.css");
import("../../_static/_libs/mapboxgl/mapbox-gl-enhance");
import("../../_static/_libs/iclient-mapboxgl/iclient-mapboxgl.min");
import("../../_static/_libs/mapbox-gl-draw/mapbox-gl-draw");
import Source from './Source';
import Layer from './Layer';
const MapMixin  = {
  data: function () {
    return {
      map: null,
      layers:null,
      overlayLayers:null,
      detailLayers:null,
      sourceList:{},
      sourceNames:[],
      excludeSourceNames:['tdt-search-', 'tdt-route-', 'smmeasure', 'mapbox-gl-draw']
    }
  },
  created(){
  },
  mounted(){
    if(this.map){
      this.map.on("load",()=> {
        this.style = this.map.getStyle();
        this.layers = this.map.getStyle().layers;
        this.overlayLayers = this.map.overlayLayersManager;
        this._initLayers();
        this._initSource();
      });
    }
  },
  methods: {
    getSourceList() {
      let sourceList = {};
      for (let key in this.sourceList) {
        if (key && this.excludeSource(key)) {
          sourceList[key] = this.sourceList[key];
        }
      }
      return sourceList;
    },
    getSourceNames() {
      const names = [];
      this.sourceNames.forEach(element => {
        if (element && this.excludeSource(element)) {
          names.push(element);
        }
      });
      return names;
    },
    excludeSource(key) {
      for (let i = 0; i < this.excludeSourceNames.length; i++) {
        if (key.indexOf(this.excludeSourceNames[i]) >= 0) {
          return false;
        }
      }
      return true;
    },
    getLegendStyle(sourceName) {
      if (sourceName) {
        return this.sourceList[sourceName] ? this.sourceList[sourceName].style : '';
      }
      const sourceList = Object.values(this.sourceList) || [];
      const styles = sourceList.filter(item => !!item.style);
      return styles;
    },
    getLayers() {
      return this.detailLayers;
    },
    getLayersBySourceLayer(sourceName, sourceLayer) {
      return this.sourceList[sourceName]['sourceLayerList'][sourceLayer];
    },

    getSourceLayersBySource(sourceName) {
      return this.sourceList[sourceName]['sourceLayerList'];
    },

    addSourceStyle(sourceName, sourceStyle) {
      if (this.sourceList[sourceName]) {
        this.sourceList[sourceName]['style'] = sourceStyle;
      }
    },

    _initLayers() {

      this.layers &&
      (this.detailLayers = this.layers.map(layer => {
        return this.map.getLayer(layer.id);
      }));
      const overLayerList = Object.values(this.overlayLayers);
      overLayerList.forEach(overlayer => {
        if (overlayer.id) {
          this.detailLayers.push({
            id: overlayer.id,
            visibility: overlayer.visibility ? 'visible' : 'none',
            source: overlayer.id
          });
        }
      });
    },

    _initSource() {
      this.detailLayers &&
      this.detailLayers.forEach(layer => {
        if (!this.sourceList[layer['source']]) {
          this.sourceList[layer['source']] = new Source({
            source: layer['source']
          });
          this.sourceNames.push(layer['source']);
        }
        this.sourceList[layer['source']].addLayer(new Layer(layer), layer['sourceLayer']);
      });
    },
  }
};

export default MapMixin ;
