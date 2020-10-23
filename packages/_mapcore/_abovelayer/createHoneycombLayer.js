export default function createHoneycombLayer(options,map) {
  return new Promise(async resolve => {
    const _Options = options,data=[];

    for(let val of _Options.pointFeatures.features){
      if(val.properties.lngLat&&val.properties.lngLat.length>0){
        data.push({
          geometry:{
            type: 'Point',
            coordinates:  val.properties.lngLat
          },
          count: val.properties.value
        });
      }
    }
    let dataSet = new _Options.mapv.DataSet(data);
    let mapVOptions = {
      fillStyle: 'rgba(55, 50, 250, 0.8)',
      shadowColor: 'rgba(255, 250, 50, 1)',
      shadowBlur: 20,
      max: 100,
      size: 50,
      label: {
        show: true,
        fillStyle: 'white',
      },
      globalAlpha: 0.5,
      gradient: {0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
      draw: 'honeycomb'
    };
    const mapVLayer = new _Options.mapboxgl.supermap.MapvLayer(map,dataSet, mapVOptions);
    map.addLayer(mapVLayer);
    resolve({
      layerId:[`${mapVLayer.id}`],
      sourceId:[`${mapVLayer.id}`]
    });
  })
}
