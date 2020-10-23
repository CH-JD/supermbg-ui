
/*
 * 弹窗
 * 在mapboxgl原来的基础上进行封装处理
 *
 *    {
        mapboxgl, //popup原始地图的
        popup: { //popup配置 基于mapboxgl的原始配置
            anchor: "left",
            closeButton: false,
            closeOnClick: true
        },
        map,//地图
        layerID, //操作的图层
        title:"",显示的标题
        showKey:[],//需要显示的字段
        class:{
            wClass:"", // 弹框外部class
            lwClass:"", // 弹框list外部class
            lClass:"",// 弹框listclass
        },
        data:null, //需要展示的数据 不传将根据图层里的数据获取
        type:"click" //弹框展示的方式
    }
 */

class AddPopup {
  constructor(options){
    this._options = options;
  }
  regMapboxgl() {
    if (typeof this._options.mapboxgl !== "object" || typeof this._options.mapboxgl.Popup!=='function') {
      console.error("实例化地图不存在");
      return false;
    } else {
      return true;
    }

  }
  regMap(){
    if(typeof this._options.map.getLayer !=="function"){
      return false;
    } else {
      return true;
    }
  }
  regLayer(){
    if(!this._options.map.getLayer(this._options.layerID)){
      return false;
    } else {
      return true;
    }
  }
  init(){
    if(this._options.type&&this._options.layerID&&this.regLayer()){
      this._options.map.on(`${this._options.type}`, `${this._options.layerID}`, e => {
        this.addPopup(e.features[0].properties);
      });
      this._options.type ==="mouseover"&&this._options.map.on("mouseout", `${this._options.layerID}`, e => {
        window.Popup.remove();
      });
    }
  }
  addPopup(properties){
    if(!window.Popup&&this.regMapboxgl()){
      window.Popup = new this._options.mapboxgl.Popup(this._options.popup||{
        anchor: "left",
        closeButton:this._options.closeObj&&this._options.closeObj.close||true,
        closeOnClick: true
      });
    }
    let html = `<div class = ${this._options.class.wClass||'mapbox-tip-box-cotroller'}><h4>${this._options.title}<em id="closePopBtn" class=${this._options.closeObj&&this._options.closeObj.className||""}></em></h4><div class=${this._options.class.lwClass||'mapbox-tip-content-cotroller'}>`;
    for(let key in properties){
      for(let val of this._options.showKey){
        if(val.key === key){
          html += `<p class=${this._options.class.lClass}>${val.name}:${properties[key] || ""}</p>`;
        }
      }
    }
    html +=`</div>`;
    if(this._options.btnList.length>0){
      html +=`<div class="button-box">`
      for(let val of this._options.btnList){
        html +=`<button id="${val.icon.btnId}" onclick="${val.fn}"><i class="${val.icon.iconClass}"></i>${val.name}</button>`
      }
      html +=`</div>`
    }
    html += `</div></div>`;
    if(!properties.lngLat){
      properties['lngLat'] =[properties['lng'],properties['lat']];
    }
    if(this.regMap()&&Array.isArray(eval(properties.lngLat))){
      /*      this._options.map.flyTo({
              center:eval(properties.lngLat)
            });*/
      window.Popup.setHTML(html);
      window.Popup.setLngLat(eval(properties.lngLat));
      window.Popup.addTo(this._options.map);
      if(this._options.btnList.length>0){
        for(let val of this._options.btnList){
          if(val.icon.btnId && typeof val.fn === 'function'){
            document.getElementById(`${val.icon.btnId}`).addEventListener("click", () => {
              (eval(val.fn).call(this._options.vm,properties));
            })
          }
        }
      }
      window.document.getElementById("closePopBtn").addEventListener("click",function(){
        window.Popup.remove();
      })
    }
  }
}
export default function addPopupHandler(options){
  return new AddPopup(options);
}


