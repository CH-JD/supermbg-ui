
import addImgLoad from "../addImgLoad";
export default  (async function creatICONLayer (map,options) {
  if(!options.hasOwnProperty("id")||!map){
    throw  new Error("mvt服务传参不对必须要有服务url和服务Id");
    return;
  }
  await addImgLoad(map,options);
  map.addLayer({
    "id": `${options.id}`,
    "type": "symbol",
    "source": {
      type: `${options.sourceType}`,//'geojson',
      data: options.data
    },
    "interactive":options.interactive,
    "layout":  {
      // 使用图片资源
      'icon-image': options.iconName,
      // 缩放
      'icon-size':  options.iconSize||{
        base: .2,
        stops: [
          [4, .2],
          [7, .5],
          [15, .6]
        ],
      },
      // 旋转角度
      'icon-rotate': options.iconRotate,
      // 偏移量
      'icon-offset': options.offset,
      // 跟随地图转动，推拉（3d效果那种）Mapbox 中叫 bearing 和 pitch
      'icon-allow-overlap':  options.overlap,
    }
  });
})
