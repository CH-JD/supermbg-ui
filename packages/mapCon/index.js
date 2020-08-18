// 对外提供对组件的引用，注意组件必须声明 name
import MapCon from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
MapCon.install = Vue => {
  Vue.component(MapCon.name, MapCon)
}
export default MapCon
