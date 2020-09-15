// 对外提供对组件的引用，注意组件必须声明 name
import figAttr from './src/index.vue'
// 为组件提供 install 安装方法，供按需引入
figAttr.install = Vue => {
  Vue.component(figAttr.name, figAttr)
}
export default figAttr
