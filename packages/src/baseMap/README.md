# 基础地图组件

### registry
```
npm config set registry 'http://192.168.100.14:8081/repository/npm-group/' 
```
### Install
```
npm install supermbgl-ui -S
```

### Usage
```
import Vue from "vue"
import supermbglUi from 'supermbgl-ui'
import 'supermbgl-ui/lib/supermbgl-ui.css'

Vue.use(supermbglUi)
```
###在项目中使用
1.组件
``` 
#调用方法
<base-map :mapList="mapList" :map="this.map" :paintControll="true" @getBaseMap="getBaseMap"></base-map>
```
2.参数说明
``` 
#map
* map 
  type:Object
  已加载完成的map 实例化对象
* paintControll(是否使用平移插件) 
    //argumentss
    type:boolean
    默认true  
    不使用选false 
* mapLsit: type Array 默认为空
      //arguments
      name: "矢量图", 底图图层的名字 显示在右下角的文字字段
      key: "map_vec", 统一命名 底图 id 和sourceID 不可重复 
      path: '',  图层的在线地址
      bounds: "", 图层的边界 默认图层ID和sourceId 为当前key加map_vec_bounds
      label: "", 图层的标准 默认图层ID和sourceId 为当前key加map_vec_label
      center: [], 设置切换之后 地图的中心点 默认为空 空为不移动中心点
      checked:true, 选中当前的图层 默认为false 数组里只可选一个
```

