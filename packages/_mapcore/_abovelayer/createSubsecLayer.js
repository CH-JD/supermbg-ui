//创建分段专题
export default function createSubsecLayer(options,map) {
  return new Promise(async resolve => {
    const _Options = options;
    map.addSource(`subSec_fill_source_${_Options.id}`, {
      type: 'geojson',
      data: _Options.fillFeatures
    });
    map.addSource(`subSec_icon_source_${_Options.id}`, {
      type: 'geojson',
      data: _Options.pointFeatures
    });
    map.addLayer({
      "id": `subSec_fill_${_Options.id}`,
      'type': 'fill',
      'minzoom': 0,
      'source':`subSec_fill_source_${_Options.id}`,
      'paint': {
        'fill-color': ['get','color'],
        'fill-opacity': .75
      }
    });
    map.addLayer({
      "type": "line",
      "source": `subSec_fill_source_${_Options.id}`,
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
      "id": `subSec_line_${_Options.id}`
    });
    map.addLayer({
      "id": `subSec_font_${_Options.id}`,
      "type": "symbol",
      "source":`subSec_icon_source_${_Options.id}`,
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
      },
    });
    map.addLayer({
      "id": `subSec_label_${_Options.id}`,
      "type": "symbol",
      "source":`subSec_icon_source_${_Options.id}`,
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
      },
    });
    resolve({
      layerId:[`subSec_fill_${_Options.id}`,`subSec_line_${_Options.id}`,`subSec_font_${_Options.id}`,`subSec_label_${_Options.id}`],
      sourceId:[`subSec_fill_source_${_Options.id}`,`subSec_icon_source_${_Options.id}`],
    });
  });
}
