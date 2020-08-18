# supermbg-ui
基于 vue-cli3 的 map 成果库
### registry
```
npm config set registry 'http://192.168.100.14:8081/repository/npm-group/' 
```
### Install
```
npm install supermbg-ui -S
```

### Usage
```
import Vue from "vue"
import supermbgUi from 'supermbg-ui'
import 'supermbg-ui/lib/supermbg-ui.css'

Vue.use(supermbgUi)
```
在项目中使用
```
<supermbg-ui></supermbg-ui>
```
