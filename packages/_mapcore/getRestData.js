import { Loading } from 'element-ui'
import mapboxgl from 'mapbox-gl';
import '@supermap/iclient-mapboxgl';
export default function getRestData (obj,fn) {
  const loading = Loading.service({
    fullscreen:true,
    lock:true,
    spinner: 'el-icon-loading',
    text:"正在获取数据... ...",
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return new Promise((resolve, reject) => {
    const params = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter:{
        name:`${obj.datasets}@${obj.datasource}`,
      },
      fromIndex:obj.fromIndex||0,
      toIndex:obj.toIndex||1000,
      maxFeatures:obj.maxFeatures||1000,
      datasetNames:[`${obj.datasource}:${obj.datasets}`]
    });
    new mapboxgl.supermap.FeatureService(obj.dataUrl).getFeaturesBySQL(params,(res) => {
      try {
        if(res.result.features){
          let features =res.result.features;
          if(fn&&typeof fn === "function"){
            features=fn(features,obj);
          }
          loading.close();
          resolve([features]);
        }else {
          loading.close();
          resolve([]);
        }
      } catch (e) {
        loading.close();
        resolve([]);
      }
    })
  });
}
