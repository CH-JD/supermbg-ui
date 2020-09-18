export  function removeLayer (layerIdArr,map){
  return new Promise((resolve, reject) => {
      if(!Array.isArray(layerIdArr)){
        if(map.getLayer(layerIdArr)){
          map.removeLayer(layerIdArr);
        }
      }else {
        for(let val of layerIdArr){
          if(map.getLayer(val)){
            map.removeLayer(val);
          }
        }
      }
    resolve();
  });
}
export  function removeSource (layerSourcesArr,map){
  return new Promise((resolve, reject) => {
    if(!Array.isArray(layerSourcesArr)){
      if(map.getSource(layerSourcesArr)){
        map.removeSource(layerSourcesArr);
      }
    }else {
      for(let val of layerSourcesArr){
        if(map.getSource(val)){
          map.removeSource(val);
        }
      }
    }
    resolve();
  });
}
