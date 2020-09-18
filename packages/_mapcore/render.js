import  addImgLoad from './addImgLoad'
export  function resetBorderColor(map,id,value){
  if(!map.getLayer(id)){
    throw new Error("layerId不存在")
    return;
  }else {
    map.setPaintProperty(id,'line-color',value)
  }
};
export  function resetBorderWidth(map,id,value){
  if(!map.getLayer(id)){
    throw new Error("layerId不存在")
    return;
  }else {
    map.setPaintProperty(id,'line-width',value)
  }
};
export default (async function resetIconConfig (map,id,value){
  if(!map.getLayer(id)){
    throw new Error("layerId不存在")
    return;
  }else {
    let imgPath = `/mongo/file/download/${value}`;
    await addImgLoad(map,{
      iconPath:imgPath,
      iconName:imgPath
    });
    map.setLayoutProperty(id,'icon-image',imgPath);
  }
})
