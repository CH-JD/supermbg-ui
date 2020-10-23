export default function createWMSLayer(map,options) {
  return new Promise(resolve => {
    const _Options = options;
    map.addLayer({
      'id': `${_Options.id}`,
      'type': 'raster',
      'source': {
        'type': 'raster',
        "tiles": [`${_Options.url}`],
        'tileSize': 256,
      },
    });
    resolve({
      sourceId:[`${_Options.id}`],
      layerId:[`${_Options.id}`],
    });
  });
}
