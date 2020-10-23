export  default function changeOpacity(map,options) {
  let  opacityNum =options.opacityVal;
  switch (options.layerType) {
    case "蜂巢图":
    case "格网图":
      for(let val of options.layerArr){
        let layer = map.getLayer(val);
        if(layer){
          let data = layer.getData()._data;
          let mapVOptions = layer.mapVOptions;
          mapVOptions.globalAlpha = parseInt(opacityNum, 10) / 100;
          layer.update(data, mapVOptions);
        }

      }
      break;
    case "热力图":
      for(let val of options.layerArr){
        let layer = map.getLayer(val);
        if(layer){
          layer.setOpacity(parseInt(opacityNum, 10) / 100);
        }

      }
      break;
    default:
      for(let val of options.layerArr){
        let layer = map.getLayer(val);
        if(layer){
          if (layer.type === "fill-extrusion") {
            map.setPaintProperty(layer.id, "fill-extrusion-opacity", parseInt(opacityNum, 10) / 100);
          }else if (layer.type === "raster") {
            map.setPaintProperty(layer.id, "raster-opacity", parseInt(opacityNum, 10) / 100);
          }else if (layer.type === "fill") {
            let num = layer.id.indexOf("drill")!=-1&&.2||1;
            map.setPaintProperty(layer.id, "fill-opacity", parseInt(opacityNum, 10) / 100*num);
          } else if (layer.type === "line") {
            map.setPaintProperty(layer.id, "line-opacity", parseInt(opacityNum, 10) / 100);
          } else if (layer.type === "symbol"&&layer.id.indexOf("font")!=-1) {
            map.setPaintProperty(layer.id, "text-opacity", parseInt(opacityNum, 10) / 100);
          }else if (layer.type === "symbol"&&layer.id.indexOf("icon")!=-1){
            map.setPaintProperty(layer.id, "icon-opacity", parseInt(opacityNum, 10) / 100);
          }else if(layer.type === 'circle'){
            map.setPaintProperty(layer.id, "circle-opacity", parseInt(opacityNum,10) / 100);
          } else if(layer.props&&layer.props.colorRange){
            let colorRange = layer.props.colorRange;
            for (let i = 0, l = colorRange.length; i < l; i++) {
              colorRange[i][3] = (parseInt(opacityNum, 10) / 100) * 255;
            }
            layer.setStyle({ colorRange });
            layer.update();
          }
        }
      }
  }
}
