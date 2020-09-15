# supermbg-ui
基于 vue-cli3 的 map 成果库
### registry
```
npm config set registry "http://192.168.100.14:8081/repository/npm-group/" 
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
#举例
<base-map :mapList="mapList" @getBaseMap="getBaseMap"></base-map>
```
2.工具
``` 
#举例
this.mapCore.PaintControlClass()
```
