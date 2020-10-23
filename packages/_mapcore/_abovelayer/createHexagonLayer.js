import GetColorVal from '../getColorValClass'
export default function addHexagonLayer(options,map){
  return new Promise(async resolve => {
    const _Options = options;
    map.addSource(`hexagon_fill_source_${_Options.id}`, {
      type: 'geojson',
      data: _Options.fillFeatures
    });
    map.addLayer({
      id: `hexagon_fill_${_Options.id}`,
      'type': 'fill',
      'minzoom': 0,
      'source':`hexagon_fill_source_${_Options.id}`,
      'paint': {
        'fill-color': ['get','color'],
        'fill-opacity': .75
      }
    });
    map.addLayer({
      "type": "line",
      "source": `hexagon_fill_source_${_Options.id}`,
      "minzoom": 0,
      "layout": {
        "line-join": "miter",
        "line-miter-limit": 2,
        "line-round-limit": 1.05,
      },
      "paint": {
        "line-color": _Options.mapConfig.boderConfig.color || "#219bc0",
        "line-opacity": 1,
        "line-width": _Options.mapConfig.boderConfig.width || 0.75
      },
      "id": `hexagon_line_${_Options.id}`
    });
    let props = {
      extruded: true,
      radius: 400,
      autoHighlight: true,
      upperPercentile: 99,
      coverage: 80,
      elevationScale: 400,
      opacity: 0.8,
      // lightSettings 光照配置参数，配置三维光照效果，
      lightSettings: {
        lightsPosition: [-122.5, 37.7, 3000, -122.2, 37.9, 3000], // 指定为`[x，y，z]`的光在平面阵列中的位置
        ambientRatio: 0.2, //光照的环境比例
        diffuseRatio: 0.5, //光的漫反射率
        specularRatio: 0.3, //光的镜面反射率
        lightsStrength: [1.0, 0.0, 2.0, 0.0], //平面阵列中指定为“[x，y]`的灯的强度。 长度应该是`2 x numberOfLights`
        numberOfLights: 4 //光照值
      }
    };
    if(_Options.legendArr.length>0){
      props.colorRange=[];
      for(let val of _Options.legendArr){
        props.colorRange.push(new GetColorVal(val.value).rgbColorToRGB());
      }
    }else {
      props.colorRange=[
        [217, 222, 242],
        [188, 199, 248],
        [158, 175, 246],
        [136, 157, 246],
        [98, 127, 247],
        [62, 100, 255]
      ];
    }
    let deckglLayer = new _Options.mapboxgl.supermap.DeckglLayer("hexagon-layer", {
      data:_Options.pointFeatures.features,
      props,
      callback: {
        getPosition: function (d) {
          return d.geometry.coordinates;
        },
        getElevationValue: d => {
          return parseInt(d[0]["properties"]['value']) || 0;
        },
        getColorValue: d => parseInt(d[0]["properties"]['value']),
      },
    });
    map.addLayer(deckglLayer);
    resolve({
      layerId:[`${deckglLayer.id}`,`hexagon_fill_${_Options.id}`,`hexagon_line_${_Options.id}`],
      sourceId:[`${deckglLayer.id}`,`hexagon_fill_source_${_Options.id}`]
    });
  });
}
