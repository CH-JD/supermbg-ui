/*
 * 创建标注
 */
export default function creatLabelLayer (map,options) {
  if(!options.hasOwnProperty("id")||!map){
    throw  new Error("标注图层必须要要传入地图和id");
    return;
  }
  map.addLayer({
    "id": `${options.id}`,
    "type": "symbol",
    "source": {
      type: `${options.sourceType}`,//'geojson',
      data: options.data
    },
    "interactive":options.interactive,
    "layout": {
      "text-size": {
        base: options.textSize||14,
        stops:options.stops||[[3, 12], [7, 14], [15, 16]],
      },
      "text-font": options.font|| ["Microsoft YaHei Regular"],
      "text-max-width": 20,
      "text-offset": [0, 0.2],
      "text-anchor": options.anchor||"top",
      "text-field": ['get','space'],
    },
    "paint": {
      "text-color":  `${options.color||'#333'}`,
      "text-halo-color": `${options.haloColor||"#fff"}`,
      "text-halo-width":  options.haloWidth||1.25,
    },
  });
}
