export default function createWMTSLayer(map, options){
  return new Promise(resolve => {
    if(!options.hasOwnProperty("url")||!options.hasOwnProperty("id")){
      resolve([]);
      throw  new Error("wmts服务传参不对必须要有服务url和服务Id");
      return;
    }
    if(options.url.indexOf('{')!==-1){
      map.addLayer({
        'id':options.id,
        'type': 'raster',
        'source': {
          'type': 'raster',
          "tiles": [`${options.url}`],
          'tileSize': options.size||256
        }
      });
    }else {
      map.addLayer({
        'id':options.id,
        'type': 'raster',
        'source': {
          'type': 'raster',
          "tiles": [`${options.url}/${options.layerName}/${options.styleName}/${options.TileMatrixSet}/{z}/{y}/{x}.png`],
          'tileSize': options.size||256
        }
      });
    }
    resolve({
      sourceId:[`${options.id}`],
      layerId:[`${options.id}`],
    });
  })
}
