export default function createScatterLayer(options,map) {
  return new Promise(async resolve => {
    const _Options = options;
    if(!map.getSource(`source_${_Options.id}`)){
      map.addSource(`source_${_Options.id}`, {
        type: "vector",
        tiles:[`${_Options.url}/tiles/{z}/{x}/{y}.mvt`],
      });
    }
    if(!map.getLayer(`icon_${_Options.id}`)){
      map.addLayer({
        "type":"symbol",
        "layout":{
          "visibility":"visible",
          "icon-size":.5,
          "icon-image":_Options.imgPath
        },
        "minzoom":0,
        "maxzoom":21,
        "paint":{},
        "source-layer":_Options.sourceLayer,
        "id":`icon_${_Options.id}`,
        "source":`source_${_Options.id}`,
      })
    }
    resolve({
      sourceId:[`source_${_Options.id}`],
      layerId:[`icon_${_Options.id}`],
    });
  });
}
