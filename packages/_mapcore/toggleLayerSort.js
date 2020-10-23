import { Message } from 'element-ui'
class ChangLayerSort {
  constructor(options) {
    this._layerArr = options.layerArr;
    this.unSortArr = ["蜂巢图","格网图",'热力图'];
    this.map = options.map;
    this.fn = options.fn;
    this.type = options.type;
    this.index = options.index;
    this.vm = options.vm;
  }
  //验证是否包含不可排序的图层
  canSortHandlerFn(tempObj,index){
    let canSort =true,layerName =this._layerArr[index]
    for(let key in tempObj){
      if(key === "targetItem"||key === "moveItem"){
        if(this.unSortArr.indexOf(tempObj[key].layerName)!==-1){
          layerName = tempObj[key].layerName;
          canSort =false;
        }
      }
    }
    return [canSort,layerName];
  }
  regToggleIndexFn(type,index){
    if(this._layerArr.length===1){
      Message({
        message:"当前类型图层只有一个图层，无法排序",
        type:"warning"
      });
    }else {
      let obj ={};
      if(type === "up"&&index!==0){
        obj.targetItem = this._layerArr[index-1];
        obj.moveItem = this._layerArr[index];
        obj.index = index;
        obj.mapLayerIndex = index-1;
        obj.arr = this._layerArr;
        return obj;
      }else if(type === "down"&&index!==this._layerArr.length-1){
        obj.targetItem = this._layerArr[index];
        obj.moveItem = this._layerArr[index+1];
        obj.index = index;
        obj.mapLayerIndex = index+1;
        obj.arr = this._layerArr;
        return obj;
      }else {
        if(type === "up"&&index===0){
          Message({
            message:"当前图层已经位于此类型图层的顶层无法排序！",
            type:"warning"
          });
          return null;
        }else if(type === "down"&&index===this._layerArr.length-1){
          Message({
            message:"当前图层已经位于此类型图层的底层无法排序！",
            type:"warning"
          });
          return null;
        }
      }
    }
  }
  toggleIndexUpFn(type,index) {
    let tempObj=this.regToggleIndexFn(type,index);
    if(!!tempObj){
      let isCanSortArr =this.canSortHandlerFn(tempObj,index);
      if(!isCanSortArr[0]) {
        Message({
          message: `当前图层中包含${isCanSortArr[1]},无法排序！`,
          type: 'error'
        });
        return;
      }
      this.fn.call(this.vm,tempObj);
      let i =tempObj.moveItem.layerId.length-1;
      while(i >= 0){
        let layerVal  = tempObj.moveItem.layerId[i];
        if(this.map.getLayer(layerVal)){
          for(let targetVal of tempObj.targetItem.layerId){
            if(this.map.getLayer(targetVal)){
              this.map.moveLayer(targetVal,layerVal);
            }
          }
        }
        i--;
      }
    }
  }
  toggleIndexDownFn(type,index) {
    let tempObj=this.regToggleIndexFn(type,index);
    if(!!tempObj){
      let isCanSortArr = this.canSortHandlerFn(tempObj,index);
      if(!isCanSortArr[0]) {
        Message({
          message: `当前图层中包含${isCanSortArr[1]},无法排序！`,
          type: 'error'
        });
        return;
      }
      let i =tempObj.moveItem.layerId.length-1;
      while(i >= 0){
        let layerVal  = tempObj.moveItem.layerId[i];
        if(this.map.getLayer(layerVal)){
          for(let targetVal of tempObj.targetItem.layerId){
            if(this.map.getLayer(targetVal)){
              this.map.moveLayer(targetVal,layerVal);
            }
          }
        }
        i--;
      }
      this.fn.call(this.vm,tempObj);
    }
  }
  init(){
    this.type==="up"&&this.toggleIndexUpFn(this.type,this.index)|| this.type==="down"&&this.toggleIndexDownFn(this.type,this.index);
  }
}
export default function changLayerSort(options){
  return new ChangLayerSort(options).init();
}
