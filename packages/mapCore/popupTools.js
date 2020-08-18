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
        if (typeof this._options.mapboxgl !== "function" || this._options.mapboxgl.Popup) {
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
        if(this._options.map.type&&this._options.map.layerID&&this.regLayer()){
            this._options.map.on(`${this._options.map.type}`, `${this._options.map.layerID}`, e => {
                let properties = this._options.data||e.features[0].properties;
                let html = `<div class = ${this._options.class.wClass||'mapbox-tip-box-cotroller'}><h4>${properties.title}</h4><div class=${this._options.class.lwClass||'mapbox-tip-content-cotroller'}>`;
                for(let key in properties){
                    if(properties.key&&properties.key.indexOf(this._options.showKey)){
                        html += `<p class=${this._options.class.lClass||'mapbox-tip-content-cotroller'}>key:${properties[key] || ""}</p>`;
                    }
                }
                html += `</div></div>`;
                this.addPopup(html);
            });
            this._options.map.type ==="mouseover"&&this._options.map.on("mouseout", `${this._options.map.layerID}`, e => {
                window.Popup.remove();
            });
        }
    }
    addPopup(htmlNode){
        if(!window.Popup&&this.regMapboxgl()){
            window.Popup = new this._options.mapboxgl.Popup(this._options.popup||{
                anchor: "left",
                closeButton: false,
                closeOnClick: true
            });
        }
        if(this.regMap()&&Array.isArray(this._options.lngLat)){
            this._options.map.flyTo({
                center:this._options.lngLat
            });
            window.Popup.setHTML(htmlNode);
            window.Popup.setLngLat(this._options.lngLat);
            window.Popup.addTo(this._options.map);

        }
    }
}
window.addPopupHandler = function(options){
    return new AddPopup(options);
}


