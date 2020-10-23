//import addImgLoad from "../addImgLoad";
export default function createMVTLayer(map, options){
    return new Promise(async resolve => {
      if(!options.hasOwnProperty("url")||!options.hasOwnProperty("id")){
        throw  new Error("mvt服务传参必须要有服务url和服务Id");
        return;
      }
      //await addImgLoad(map,options);
      let url =options.url;
      if(url&&url.indexOf('.json')!==-1){
        map.addStyle( `${url}`);
      }else {
        map.addStyle( `${url}/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true`);
      }
      setTimeout(() => {
        const layersArr = map.getStyle().layers,layerId=[],l = map.getStyle().layers.length;
        let sourceName = '';
        if (l > 0) {
          for (let i = 0; i < l; i++) {
            if (url.indexOf(layersArr[i].source) !== -1) {
              sourceName = layersArr[i].source;
              layerId.push(layersArr[i].id);
            }
          }
        };
        resolve ({
          layerId:layerId,
          sourceId:[`${sourceName}`]
        });
        },3000);
    })
};
