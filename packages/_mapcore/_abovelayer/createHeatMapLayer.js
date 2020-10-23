//创建热力图
export default function createHeatMapLayer(options,map) {
  return new Promise(async resolve => {
    const _Options = options;
    const heatMapOptions ={
      "map": map,
      "id": `heatMap_${_Options.id}`,
      "radius": 80,
      "opacity": 1,
      "featureWeight": "value"
    };
    let heatMapLayer = new _Options.mapboxgl.supermap.HeatMapLayer(`heatMap_${_Options.id}`, heatMapOptions);
    heatMapLayer.addFeatures(_Options.pointFeatures);
    map.addLayer(heatMapLayer);
    resolve({
      layerId:[`heatMap_${_Options.id}`],
      sourceId:[`heatMap_${_Options.id}`]
    });
  });
}
