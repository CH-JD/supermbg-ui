//创建散点图
export default function createScatterLayer(options,map) {
  return new Promise(async resolve => {
    const _Options = options;
    map.addSource(`fill_${_Options.id}`, {
      type: 'geojson',
      data: _Options.fillFeatures
    });
    map.addSource(`icon_${_Options.id}`, {
      type: 'geojson',
      data: _Options.pointFeatures
    });
    map.addLayer({
      "id": `fill_${_Options.id}`,
      "maxzoom": 21,
      "type": "fill",
      "layout": {},
      "paint": {
        "fill-color": ['get', 'color'],
        "fill-opacity": 1,
      },
      "source": `fill_${_Options.id}`,
      "minzoom": 0
    });
    map.addLayer({
      "id": `line_${_Options.id}`,
      "maxzoom": 21,
      "type": "line",
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
      "source": `fill_${_Options.id}`,
      "minzoom": 0
    });
    map.addLayer({
      "id": `icon_${_Options.id}`,
      type: 'symbol',
      "source": `icon_${_Options.id}`,
      "interactive": true,
      layout: {
        // 使用图片资源
        'icon-image': _Options.imgPath,
        // 缩放
        'icon-size': {
          base: .4,
          stops: [
            [3, .4],
            [7, .5],
            [15, .6]
          ],
        },
        // 旋转角度
        'icon-rotate': 0,
        // 偏移量
        'icon-offset': [0, -15],
        // 跟随地图转动，推拉（3d效果那种）Mapbox 中叫 bearing 和 pitch
        'icon-allow-overlap': true,
      }
    });
    map.addLayer({
      "id": `font_${_Options.id}`,
      "type": "symbol",
      "source": `icon_${_Options.id}`,
      "interactive": true,
      "layout": {
        "text-size": {
          base: 10,
          stops: [
            [3, 12],
            [7, 14],
            [15, 16]
          ],
        },
        "text-font": [
          "Arial Regular"
        ],
        "text-max-width": 20,
        "text-offset": [0, 0.2],
        "text-anchor": "top",
        "text-field": "{name}",
      },
      "paint": {
        "text-color": "#333",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1.25,
        'text-opacity':1
      },
    });
    map.addLayer({
      "id": `label_${_Options.id}`,
      "type": "symbol",
      "source": `icon_${_Options.id}`,
      "interactive": true,
      "layout": {
        "text-size": {
          base: 10,
          stops: [
            [3, 12],
            [7, 14],
            [15, 16]
          ],
        },
        "text-font": [
          "Arial Regular"
        ],
        "text-max-width": 20,
        "text-letter-spacing": -.5,
        "text-offset": [0.25, 1.75],
        "text-anchor": "top",
        "text-field": "{value}",

      },
      "paint": {
        "text-color": "#333",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1.25,
        'text-opacity':1
      },
    });
    resolve({
      layerId: [`fill_${_Options.id}`, `line_${_Options.id}`, `icon_${_Options.id}`, `font_${_Options.id}`, `label_${_Options.id}`],
      sourceId:[`fill_${_Options.id}`, `icon_${_Options.id}`]
    });
  })
};
