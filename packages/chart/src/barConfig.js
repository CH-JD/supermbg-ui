import echarts from 'echarts';
import chartConfig from './nx-chart-config';
import {hexToRgba} from './nx-chart-config';
import {max} from './nx-chart-config';


export function barFun(type,config,data){
    let group = type.split(",")[0];
    let groupFun = type.split(",")[1];
    let barConfig = Object.assign(chartConfig[group][groupFun],config);
    let comOptoin = {
        backgroundColor: barConfig.colorConfig.bgColor,
        title: {
            text: barConfig.textConfig.title,
            left: "center",
            textStyle: {
                color:  barConfig.colorConfig.titleColor,
                fontSize: 16
            }
        },
        grid: {
            left: '10%',
            top: '13%',
            bottom: '12%',
            right: '8%'
        },
        tooltip: {
            trigger: 'item',
            confine: false,
            textStyle: {
                color: barConfig.colorConfig.tootipColor,
                fontSize: 12
            },
            padding:[10,10]
          },
          xAxis:{},
          yAxis:null,
          series:[]

    }
    let resOption = {};
    switch(groupFun){
        case "solidBar":
            resOption = solidBar(comOptoin,barConfig,data)
            break;
        case "comBar":
            resOption = comBar(comOptoin,barConfig,data)
            break;
        case "picogramBar":
            resOption = picogramBar(comOptoin,barConfig,data)
            break;
        case "verticalBar":
            resOption = verticalBar(comOptoin,barConfig,data)
            break;

    }

    return resOption;
}

//立体柱状图
export function solidBar(comOptoin,config,data){
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function(ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x, shape.y]
            const c1 = [shape.x - 9, shape.y - 9]
            const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9]
            const c3 = [xAxisPoint[0], xAxisPoint[1]]
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
    })
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function(ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x, shape.y]
            const c2 = [xAxisPoint[0], xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
            const c4 = [shape.x + 18, shape.y - 9]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function(ctx, shape) {
            const c1 = [shape.x, shape.y]
            const c2 = [shape.x + 18, shape.y - 9]
            const c3 = [shape.x + 9, shape.y - 18]
            const c4 = [shape.x - 9, shape.y - 9]
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)

    const VALUE = objToArr(data).yData[0].data||[90,80,100,70,89];
    let MAXValue = Number(max(VALUE)+100);
    const MAX = new Array(VALUE.length).fill(MAXValue)
    let xData = objToArr(data).xData||['德州', '德城区', '陵城区','禹城市','乐陵市'];
    let option = Object.assign(comOptoin, {});
    option.tooltip.backgroundColor = "transparent";
    option.tooltip.extraCssText = `box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`;
    option.xAxis = {
      type: 'category',
      data:xData,
      axisLine: {
          show: true,
          lineStyle: {
              color: config.colorConfig.xAxisLineColor
          }
      },
      offset: 20,
     // 坐标刻度颜色值
      axisTick: {
          show: false,
          length: 9,
          alignWithLabel: true,
          lineStyle: {
              color: config.colorConfig.xAxisTickColor
          }
      },
      axisLabel: {
          color:config.colorConfig.xAxisLabelColor,
          fontSize: 12
      }
    };
    option.yAxis={
      name:config.textConfig.unit,
      nameTextStyle:{
        color:config.colorConfig.yAxisLabelColor
      },
      type: 'value',
      axisLine: {
          show: true,
          lineStyle: {
              color: config.colorConfig.yAxisLineColor
          }
      },
      splitLine: {
          show: false
      },
      axisTick: {
          show: false
      },
      axisLabel: {
          color:config.colorConfig.yAxisLabelColor,
          fontSize: 12
      },
      //boundaryGap: ['20%', '20%']
    };
    let barDataObj = {MAX:MAX,VALUE:VALUE};
    Object.keys(barDataObj).map(o=>{
        let colors = [];
        if(o=="MAX"){
           colors = config.colorConfig.seriesMaxColor.map(item=>{return hexToRgba(item,0.27)})
        }else{
            let LinearColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: config.colorConfig.serisesValueColors[0]
                },
                {
                    offset: 1,
                    color: config.colorConfig.serisesValueColors[1]
                }
            ])
           colors = [LinearColor,LinearColor,LinearColor];
        }
        option.series.push({
            type: 'custom',
            renderItem: function(params, api) {
                const location = api.coord([api.value(0), api.value(1)])
                return {
                    type: 'group',
                    children: [{
                        type: 'CubeLeft',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: colors[0]
                        }
                    }, {
                        type: 'CubeRight',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: colors[1]
                        }
                    }, {
                        type: 'CubeTop',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: colors[2]
                        }
                    }]
                }
            },
            data: barDataObj[o]
        })
    })
    option.series.push({
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    color: config.colorConfig.seriseLableColor,
                    offset: [4, -25]
                }
            },
            itemStyle: {
                color: 'transparent'
            },
            data: VALUE
    })
    return option;

}

//象形柱状图
export function picogramBar(comOptoin,config,data) {
  let option = Object.assign(comOptoin, {});
  let xData = objToArr(data).xData||['驯鹿', '火箭', '飞机', '高铁', '轮船', '汽车'];
  let yData = objToArr(data).yData||[{dataType:'',data:[50, 26, 13, 13, 12, 15]}];
  option.tooltip.backgroundColor = "transparent";
  option.tooltip.extraCssText = `box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`;
//   option.legend = {
//     icon: 'circle',
//     top: '5%',
//     right: '5%',
//     itemWidth: 15,
//     itemGap: 20,
//     textStyle:{
//         color:'#d7d7d7'
//     }
// },
  option.xAxis = {
    data: xData,
    axisTick: {
         show: false
     },
     axisLine: {
         lineStyle: {
             color: hexToRgba(config.colorConfig.xAxisLineColor,0.2),
             width: 1 //这里是为了突出显示加上的
         }
     },
     axisLabel: {
         textStyle: {
             color: config.colorConfig.xAxisLabelColor,
             fontSize: 12
         }
     }
  }
  option.yAxis = [{
        name:config.textConfig.unit,
        nameTextStyle:{
            color:config.colorConfig.yAxisLabelColor
          },
        splitNumber: 2,
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: hexToRgba(config.colorConfig.yAxisLineColor,0.2),
                width: 1 //这里是为了突出显示加上的
            }
        },
        axisLabel: {
            textStyle: {
                color: config.colorConfig.yAxisLabelColor
            }
        },
        splitArea: {
            areaStyle: {
                color: config.colorConfig.yAxisSplitAreaColor
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: hexToRgba(config.colorConfig.yAxisSplitLineColor,0.1),
                width: 0.5,
                type: 'dashed'
            }
        }
    }]
    yData.map((o,idx)=>{
        option.series.push(
            {
                name: o.dataType,
                type: 'pictorialBar',
                barCategoryGap: '0%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                label: {
                    show: true,
                    position: 'top',
                    distance: 15,
                    color: config.colorConfig.seriseColorStops[idx],
                    fontWeight: 'bolder',
                    fontSize: 20,
                },
                itemStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: hexToRgba(config.colorConfig.seriseColorStops[idx],0.8) //  0%  处的颜色
                                },
                                {
                                    offset: 1,
                                    color: hexToRgba(config.colorConfig.seriseColorStops[idx],0.1) //  100%  处的颜色
                                }
                            ],
                            global: false //  缺省为  false
                        }
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                data:o.data,
                z: 10
            }
        )

    })

   return option;
}
//常规柱状图，柱子是圆的
export function comBar(comOptoin,config,data){
    let option = Object.assign(comOptoin, {});
    let xData = objToArr(data).xData||['制造业', '建筑业', '农林牧渔', '房地产', '金融业', '居民服务及其他'];
    let yData = objToArr(data).yData||[{dataType:'',data:[3000, 2600, 1300, 1300, 1250, 1500]}];
    option.grid.top = '80';
    option.tooltip.backgroundColor = "transparent";
    option.tooltip.extraCssText = `box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`;
    option.xAxis = [{
        type: 'category',
        data: xData,
        axisLine: {
            lineStyle: {
                color:hexToRgba(config.colorConfig.xAxisLineColor,0.12)
            }
        },
        axisLabel: {
            margin: 10,
            color: config.colorConfig.xAxisLabelColor,
            textStyle: {
                fontSize: 14
            },
        },
    }]
    option.yAxis = [{
        name: config.textConfig.unit,
        nameTextStyle:{
            color:config.colorConfig.yAxisLabelColor
          },
        axisLabel: {
            formatter: '{value}',
            color: config.colorConfig.yAxisLabelColor,
        },
        axisLine: {
            show: false,
            lineStyle: {
                color:config.colorConfig.yAxisLineColor
            }
        },
        splitLine: {
            lineStyle: {
                color:hexToRgba(config.colorConfig.yAxisSplitLineColor,0.12)
            }
        }
    }];
    yData.map((o,idx)=>{
        option.series.push({
            type: 'bar',
            name:o.dataType,
            data: o.data,
            barWidth: '20px',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: config.colorConfig.seriseBarLinear[idx][0]// 0% 处的颜色
                    }, {
                        offset: 1,
                        color: config.colorConfig.seriseBarLinear[idx][1] // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: config.colorConfig.seriseBarshadowColor,
                    shadowBlur: 4,
                }
            },
            label: {
                normal: {
                    show: true,
                    lineHeight: 30,
                    width: 80,
                    height: 20,
                    backgroundColor: hexToRgba(config.colorConfig.seriseLabelbgColor,0.1),
                    borderRadius: 200,
                    position: ['-8', '-60'],
                    distance: 1,
                    formatter: [
                        '    {d|●}',
                        ' {a|{c}}     \n',
                        '    {b|}'
                    ].join(','),
                    rich: {
                        d: {
                            color: config.colorConfig.seriseLabelRichD,
                        },
                        a: {
                            color: config.colorConfig.seriseLabelRichA,
                            align: 'center',
                        },
                        b: {
                            width: 1,
                            height: 30,
                            borderWidth: 1,
                            borderColor: config.colorConfig.seriseLabelRichB,
                            align: 'left'
                        },
                    }
                }
            }
        })
    })

    return option;
}
//横排柱状图
export function verticalBar (comOptoin,config,data){
    let type=null;
    let option = Object.assign(comOptoin, {});
    data[0].data.sort(compare('value'));
    let resData = objToArr(data);
    let xData = resData.xData||["安徽省","河南省","浙江省","湖北省","贵州省","江西省","江苏省","四川省","云南省","湖南省"];
    let yData = resData.yData||[{dataType:'',data:[239,181,154,144,135,117,74,72,67,55]}];

    //背景按最大值
    const MAX = new Array(yData[0].data.length).fill(yData[0].data[0]);
    console.log(MAX)
    option.grid = {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true
    }
    option.tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function(params) {
            return params[0].name  + ' : ' + params[0].value
        },
        backgroundColor:'transparent',
        extraCssText:`box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`
    };
    option.xAxis = {
        show: false,
        type: 'value'
    }
    option.yAxis = [{
        type: 'category',
        inverse: true,
        axisLabel: {
            show: true,
            textStyle: {
                color: config.colorConfig.yAxisLabelColor
            },
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        data: xData
    },
    {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
            textStyle: {
                color: config.colorConfig.yAxisLabelColor,
                fontSize: '12'
            },
        },
        data:yData[0].data
    }
]
    option.series.push(
        {
            name: yData[0].dataType,
            type: 'bar',
            zlevel: 1,
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color:config.colorConfig.seriseBarLinear[0]
                    }, {
                        offset: 1,
                        color: config.colorConfig.seriseBarLinear[1]
                    }]),
                },
            },
            barWidth: 20,
            data: yData[0].data
        },
        {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            data: MAX,
            itemStyle: {
                normal: {
                    color: config.colorConfig.seriseBgBarColor,
                    barBorderRadius: 30,
                }
            },
        },
    )
    return option;
}

function objToArr(data){
    if(!data||data.length<1||data[0].data.length<1){
        return [];
    }
    let resObj = { xData:[],yData:[]}
    data.map((item,idx)=>{
        let barData = {dataType:'',data:[]};
        item.data.map((o)=>{
            if(idx==0){resObj.xData.push(o.name)}
            barData.data.push(o.value)
        });

        barData.dataType = item.dataType;
        resObj.yData.push(barData)
    })
    return resObj
}

function compare(key){
       return function(value1,value2){
            var val1=value1[key];
            var val2=value2[key];
           return val2-val1;
       }
}



