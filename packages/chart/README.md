
# 插件介绍

> 这是一个酷炫的图表组件，现共有10种显示效果
   柱状图：4种（立体，象形，横排排，正常）效果
   折线图：2种
   饼图：  2种
   雷达图：1种
   折线柱状混合：1种

## 使用说明

```bash
#使用
<charts :id="'comBar'" :type="'bar,comBar'"   :data='data' :config=config class="charts" @chartClick = chartClick></charts>

备注：初始化时给图表设置盒子大小
```
### 参数整体说明
```bash 
  id:创建图表的id              //字符串 String
  type: 图表的类型,用逗号隔开，大类与小类样式  //字符串 String
  config:图表的配置项           //对象 Object
  data:图表的数据项             //数组 Array
  @chartClick：图表的点击事件   //函数 function
  
  #是否必须参数
  id,type,data为必须传参项，
  config与事件为可选参数
  备注：
  若是想查看显示效果，可只传id,type,显示默认测试数据展示效果
```
### type类型介绍
```bash
  #柱状图：bar
  立体柱状图：solidBar   
  象形柱状图：picogramBar
  横排柱状图：verticalBar
  常规柱状图（柱子是圆的）：comBar

  #折线图：line
  数据点折线图：pointLine
  常规折线图：  comLine
  
  #饼图：pie
  有图片装饰的饼图：picPie
  常规饼图：comPie

  #雷达图 radar
  常规雷达图：comRadar

  #折线柱状图：lineBar
  常规折线柱状图：comLineBar

  #备注
  bar中：solidBar,verticalBar 只适合单柱状图，即使传了多组数据，也只显示第一组数据

  饼图，雷达图只能传一组数据显示

  传参时，写大类小类，用逗号隔开，比如：'bar,solidBar'

  另：折线柱状图（lineBar）,小类还需要传一个数据类型'line-bar','lineBar,comLineBar,line-bar'，'-'隔开时，类型与数据顺序要一一匹配，
  比如：'line-bar',data:[linedata,barData],或者'bar-line',data:[barData,lineData]
```
### config配置项说明
```bash
# solidBar(立体柱状图)
{
   colorConfig:{
         bgColor:"#010d3a",            # 图表背景色值，若是不需要背景色，可以传入透明色
         titleColor:"#dee0e4",         # 图表标题颜色值
         tootipColor:'#ffffff',        # 悬浮框文字颜色值
         tooltipShadowColor:"#49BEE5", # 悬浮框背景颜色值
         xAxisLineColor:"#ffffff",     # x轴轴线颜色值
         xAxisTickColor:'#7DFFFD',     # x轴刻度线颜色值
         xAxisLabelColor:"#dee0e4",    # x轴文字颜色值
         yAxisLineColor:"#ffffff",     # y轴轴线颜色值
         yAxisLabelColor:"#dee0e4",    # y轴文字颜色值
         seriesMaxColor:["#2f66c0","#3b80e2","#4866c0"],    
         # 柱状图背景色，柱子左，右顶颜色值["#2f66c0","#3b80e2","#4866c0"]

         serisesValueColors:["#3B80E2","#49BEE5"],
         #柱状图,柱子左，右，顶颜色值，按数据顺序的渐变色，如果是同一个色，可以两个数据传一样的,参考色系：["#3B80E2","#49BEE5"],["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"]

         seriseLableColor:"#ffffff"     # 柱子上文字的颜色值
   },
   textConfig:{
         title:"标题",                  # 图表标题
         unit:'单位'                    # 图表y轴单位
   }

# picogramBar(象形柱状图)
{
   colorConfig:{
      bgColor:"#38445E",             # 图表背景色值，若是不需要背景色，可以传入透明色
      titleColor:"#00F6FF",          # 图表标题颜色值
      tootipColor:'#ffffff',         # 悬浮框文字颜色值
      tooltipShadowColor:"#49BEE5",  # 悬浮框背景颜色值
      xAxisLineColor:"#ff816d",      # x轴轴线颜色值
      xAxisLabelColor:"#999999",     # x轴文字颜色值
      yAxisLineColor:"#ff816d",      # y轴轴线颜色值
      yAxisLabelColor:"#999999",     # y轴文字颜色值
      yAxisSplitAreaColor:"#e1e1e1", # y轴分隔区域颜色值
      yAxisSplitLineColor:"ff816d",  # y轴分隔线颜色值
      seriseColorStops:["#e85e6a","#ffa018",'#57d762','#ec5489']  # 象形柱子的颜色值，默认给了4组值
   },
   textConfig:{
      title:"标题",                  # 图表标题
      unit:'单位'                    # 图表y轴单位
   }
}

# verticalBar(横排柱状图)
{
   colorConfig:{
      bgColor:"#003366",               # 图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#90979c",            # 图表标题颜色值
      tootipColor:'#ffffff',           # 悬浮框文字颜色值
      tooltipShadowColor:"#49BEE5",    # 悬浮框背景颜色值
      yAxisLabelColor:"#fff",          # y轴文字颜色值
      seriseBarLinear:["#3959ff","#2ec8cf"],
      # 图表数值柱子颜色值，为渐变色，如果是同一个色，可以传入两个一样的颜色值,参考色系：["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"]

      seriseBgBarColor:'#181f44'       # 图表柱子背景颜色值，若是不需要背景色，可以传入透明色
   },
   textConfig:{
      title:""                         # 图表标题
   }
}

# comBar(常规柱状图)
{
   colorConfig:{
      bgColor:"#00265f",              # 图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#90979c",           # 图表标题颜色值
      tootipColor:'#ffffff',          # 悬浮框文字颜色值
      tooltipShadowColor:"#49BEE5",   # 悬浮框背景颜色值
      xAxisLineColor:"#ffffff",       # x轴轴线颜色值
      xAxisLabelColor:"#e2e9ff",      # x轴文字颜色值
      yAxisLabelColor:"#e2e9ff",      # y轴文字颜色值
      yAxisLineColor:"#ffffff",       # y轴轴线颜色值
      yAxisSplitLineColor:"#ff816d",  # y轴分割线颜色值
      seriseLabelbgColor:"#00a0dd",   # 柱子上的文本标签背景颜色值
      seriseLabelRichD:"#3CDDCF",     # 柱子上的文本标签自定义富文本圆点颜色值
      seriseLabelRichA:"#ffffff",     # 柱子上的文本标签自定义富文本文字颜色值
      seriseLabelRichB:"#234e6c",     # 柱子上的文本标签自定义富文本线条颜色值
      seriseBarLinear:[["#00f4ff","#004da7"],["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"]],
      # 柱子为渐变色，默认给了四组颜色值
      seriseBarshadowColor:'#00a0dd'  # 柱子的阴影颜色值
   },
   textConfig:{
      title:"标题",                   # 图表的标题
      unit:'单位'                     # 图表的单位
   }
}

# pointLine(数据点折线图)
{
   colorConfig:{
      bgColor:"#000000",                # 图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#ffffff",             # 图表标题颜色值
      tooltipColor:'#5c6c7c',           # 悬浮框文字颜色值
      tooltipShadowColor:"#49BEE5",     # 悬浮框背景颜色值
      toottipColorStops:"#ffffff",      # 指示悬浮框竖线颜色值
      xAxisLineColor:'#ffffff',         # x轴轴线颜色值
      xAxisLabelColor:"#97aab4",        # x轴文字颜色值
      xAxisSplitArea:'#f00f00',         # x轴分割区域颜色值
      yAxisLabelColor:"#97aab4",        # y轴文字颜色值
      yAxisLineColor:"#ffffff",         # y轴轴线颜色值
      yAxisSplitLineColor:"#ffffff",    # y轴分割线颜色值
      seriesLine:[["#2e7af0","#000000","#ffffff"],["#00ca95","#000000","#ffffff"],["#e64a6a","#000000","#ffffff"],["#ffe213","#000000","#ffffff"],["#ffe213","#000000","#611fc8"]]
      # 折线颜色值，默认五组颜色值，每组颜色值按顺序，1：线条、文字及圆点颜色值；2：线条阴影颜色值；3：圆点边框颜色值
   },
   textConfig:{
      title:"标题",                     # 图表标题
      unit:'单位'                       # 图表单位
   }
}

# comLine(常规折线图)
{
   colorConfig:{
      bgColor:"#ffffff",                  # 图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#000000",               # 图表标题颜色值
      tooltipColor:'#5c6c7c',             # 悬浮框文字颜色值
      tooltipAxisPointerColor:'#556677',  # 悬浮框指示器颜色值
      tooltipShadowColor:"#a3a3a3",       # 悬浮框背景颜色值
      xAxisLineColor:"#DCE2E8",           # x轴轴线颜色值
      xAxisLabelColor:"#556677",          # x轴文字颜色值
      xAxisAxisPointerColor:'#33c0cd',    # x轴指示器颜色值
      yAxisLabelColor:"#556677",          # y轴文字颜色值
      yAxisLineColor:"#DCE2E8",           # y轴轴线颜色值
      seriesLine:[["#9effff","#9E87FF"],["#73DD39","#73DDFF"],["#ffbf64","#ff9c0f"],["#e83b6c","#df8760"],["#b08ae4","#5f1cc7"],["#7fd6ef","#13bced"]]
      # 折线渐变颜色值，默认6组颜色值
   },
   textConfig:{
      title:"全国6月销售统计",             # 图表标题
      unit:'单位'                         # 单位颜色值
   }
}

# comPie(常规饼图)
{
   colorConfig:{
         bgColor:"#ffffff",              # 图表图表背景色，若是不需要背景色，可以传入透明色
         titleColor:"#000000",           # 图表标题颜色值
         tooltipColor:'#5c6c7c',         # 悬浮框文字颜色值
         tooltipShadowColor:"#49BEE5",   # 悬浮框背景颜色值
         colorList:['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']    # 饼图颜色值
   },
   textConfig:{
         title:"标题"                    # 图表标题
   } 
}

# picPie(有图片装饰的饼图)
{
   colorConfig:{
      bgColor:"#0A2E5D",                  # 图表图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#ffffff",               # 图表标题颜色值
      seriseLableColor:'#dddddd',         # 饼图文字颜色值
      seriseLableLineColor:'#00ffff',     # 饼图连接线颜色值
      legendColor:'#ffffff',              # 图例文字颜色值
      colorList:['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],     # 饼图颜色值 
   },
   textConfig:{
      title:"标题22",                     # 图表标题
   } 
}

# comRadar(常规雷达图)
{
   colorConfig:{
      bgColor:"#080b30",               # 图表图表背景色，若是不需要背景色，可以传入透明色
      titleColor:"#ffffff",            # 雷达图每个指示器名称颜色值
      tooltipColor:'#ffffff',          # 悬浮框文字颜色值
      tooltipShadowColor:"#a3a3a3",    # 悬浮框背景颜色值
      radarAreaStyleColor:"#0c3e81",   # 分隔区域颜色值
      splitLineColor:'#0c3e81',        # 分隔线颜色值
      axisLineColor:'#0c3e81',         # 坐标轴线线的颜色值
      areaColor:'#31e586'              # 雷达图的value区域颜色值

   },
}

#  comLineBar(常规折线柱状图)
{
   colorConfig:{
      bgColor:"#ffffff",                      # 图表图表背景色，若是不需要背景色
      titleColor:"#000000",                   # 图表标题颜色值
      tooltipColor:'#000000',                 # 悬浮框文字颜色值
      tooltipShadowColor:"#dddddd",           # 悬浮框背景颜色值
      xAxis:"#59588D",                        # x轴颜色值
      xAxisLabelColor:"#999999",              # x轴文字颜色值
      xAxisLineColor:"#6b6b6b",               # x轴轴线颜色值
      yAxisLabelColor:"#999999",              # y轴文字颜色值
      yAxisLineColor:"#DCE2E8",               # y轴轴线颜色值
      yAxisSplitLineColor:"#836565",          # y轴分割线颜色值
      seriseBarLinear:['#55d1ff', '#2d82ff'], # 柱子颜色值，渐变色
      seriseBarLabel:'#333333',               # 柱子上文字显示的颜色值
      seriseLineColor:"#3275FB",              # 折线线条颜色值
      seriseLineLinear:["#4956ff","#ffffff"], # 折线面积渐变色0-100%
      seriseLineShadowColor:'#000000'         # 折线阴影色
   },
   textConfig:{
      title:"标题",                           # 图表名称
      unit:'单位'                             # 图表单位
   }
}

#config配置项补充说明：
所有的颜色值，请统一传入16进制颜色值，全写，不可以省略写，比如 '#ffffff' ,而不能写成 '#fff'

传参时，修改那个传哪个值，数据结构需保留，比如{textConfig:{title:'改变标题名称'}}

数组参数为数组时，修改颜色时，传入的颜色数组要与显示数据组一致，比如picogramBar.seriseColorStops,若是显示1组数据，可传入['颜色值']，若是多组数据，则是：['颜色值','颜色值','颜色值','颜色值'...],可多传不可少传

```

### data数据项说明
```bash
data:[
   {
      dataType:"行业分类",
      data:[
         {name:'制造业',value:110},{name:'建筑业',value:120},
         {name:'农林业',value:90},{name:'金融业',value:40},
         {name:'传统实业',value:70},{name:'互联网',value:140}
      ]
   }
 ]

  #备注
  bar（柱状图）中：solidBar,verticalBar 只适合单柱状图，即使传了多组数据，也只显示第一组数据

  pie(饼图)，radar(雷达图)只能传一组数据显示

  更改颜色值为数组时，请传入的颜色组与数据组一一对应

  另：折线柱状图（lineBar）,小类还需要传一个数据类型'line-bar','lineBar,comLineBar,line-bar'，'-'隔开时，类型与数据顺序要一一匹配，
  比如：'line-bar',data:[linedata,barData],或者'bar-line',data:[barData,lineData]
```

### chartClick事件说明

```bash
 #给图表添加点击事件的入口
 <charts :id="'comBar'" :type="'bar,comBar'"   :data='data' class="charts" @chartClick = chartClick></charts>

 #备注
 需要添加点击事件，@chartClick = chartClick
 不需要不传参数就好
```

