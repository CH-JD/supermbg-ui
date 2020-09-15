
/**
 * mapCore 地图的核心代码
 * mapConfig 可视化配置
 * baseMap 底图切换
 * figAttr 图属联动
 * drillMap 上钻下钻
 */
//require("./_static/index");
import mapCore from './_mapcore/index.js'
if(!window.supermbglUi){
  window.supermbglUi ={};
  window.supermbglUi['_mapCore'] = mapCore;
}else {
  window.supermbglUi['_mapCore'] = mapCore;
}
import layerControl from './src/layerControl/index.js'
import mapConfig from './src/mapConfig'
import baseMap from './src/baseMap/index.js'
import figAttr from './src/figAttr/index.js'
import drillMap from './src/drillMap/index.js'
import mapLegend from './src/mapLegend/index.js'
// 存储组件列表
const components = [
  layerControl,
  mapLegend,
  mapConfig,
  baseMap,
  figAttr,
  drillMap
]
import  MapMixin  from './_mapcore/_sourceModel/index';
//定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  Vue.mixin(MapMixin);
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
  //下面这个写法也可以
  //components.map(component => Vue.use(component))
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}
