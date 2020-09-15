// 对外提供对组件的引用，注意组件必须声明 name
import mapLegend from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
mapLegend.install = Vue => {
  Vue.component(mapLegend.name, mapLegend)
}
export default mapLegend
