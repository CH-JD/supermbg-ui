
//对外提供对组件的引用，注意组件必须声明 name
import chart from './src/index'
//为组件提供install 安装方法，供按需引入
chart.install = Vue=>{
    Vue.component(chart.name,chart)
}

export default chart;