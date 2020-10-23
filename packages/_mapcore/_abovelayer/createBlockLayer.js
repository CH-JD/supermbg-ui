export default function createBlockLayer(options, map) {
  return new Promise(async resolve => {
    const _Options = options;
    map.addSource(`block_fill_source_${_Options.id}`, {
      type: 'geojson',
      data: _Options.fillFeatures
    });
    map.addSource(`block_icon_source_${_Options.id}`, {
      type: 'geojson',
      data: _Options.pointFeatures
    });
    map.addLayer({
      id: `block_fill_${_Options.id}`,
      'type': 'fill-extrusion',
      'minzoom': 0,
      'source':`block_fill_source_${_Options.id}`,
      'paint': {
        'fill-extrusion-color': ['get','color'],
        'fill-extrusion-base': 1,
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-opacity': .75
      }
    });
    map.addLayer({
      "type": "line",
      "source": `block_fill_source_${_Options.id}`,
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
      "id": `block_line_${_Options.id}`
    });
    map.addLayer({
      "id": `block_font_${_Options.id}`,
      "type": "symbol",
      "source":`block_icon_source_${_Options.id}`,
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
      "id": `block_label_${_Options.id}`,
      "type": "symbol",
      "source":`block_icon_source_${_Options.id}`,
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
      layerId:[`block_fill_${_Options.id}`,`block_line_${_Options.id}`,`block_font_${_Options.id}`,`block_label_${_Options.id}`],
      sourceId:[`block_fill_source_${_Options.id}`,`block_icon_source_${_Options.id}`]
    });
  });
}
