import echarts from 'echarts';
import chartConfig from './nx-chart-config';
import {hexToRgba} from './nx-chart-config';
//折线图
export function lineFun(type,config,data){
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
            top: '8%',
            bottom: '12%',
            right: '8%'
        },
        tooltip: {
            trigger: 'axis',
            confine: false,
            textStyle: {
                color: barConfig.colorConfig.tooltipColor,
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
        case "pointLine":
            resOption = pointLine(comOptoin,barConfig,data)
            break;
        case "comLine":
            resOption = comLine(comOptoin,barConfig,data)
            break;
    }
   
    return resOption;
}

//数值显示在折线图上
export function pointLine(comOptoin,config,data){
    let option = Object.assign(comOptoin, {});
    let resData = objToArr(data);
    let xData = resData.xData||['A', 'B', 'C', 'D', 'E', 'F'];
    let yData = resData.yData||[{dataType:'',data:[502.84, 205.97, 332.79, 281.55, 398.35, 214.02]},{dataType:'',data:[281.55, 398.35, 214.02, 179.55, 289.57, 356.14]}];
    option.tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: "line",
            label: {},
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color:  'transparent'
                    }, {
                        offset: 0.5,
                        color: hexToRgba(config.colorConfig.toottipColorStops,0.8),
                    }, {
                        offset: 1,
                        color: 'transparent'
                    }],
                    global: false
                }
            },
        },
        backgroundColor:'transparent',
        extraCssText:`box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`
    };
    option.xAxis = {
        type: 'category',
          axisLine: {
              color: hexToRgba(config.colorConfig.xAxisLineColor,0.1),
              show: true
          },
          splitArea: {
             //  show: true,
              color: config.colorConfig.xAxisSplitArea,
              lineStyle: {
                  color: config.colorConfig.xAxisSplitArea
              },
          },
          axisLabel: {
              color: config.colorConfig.xAxisLabelColor
          },
          splitLine: {
              show: false
          },
          boundaryGap: false,
          data: xData,
    }
    option.yAxis = [{
        type: 'value',
        name:config.textConfig.unit,
        nameTextStyle:{
          color:config.colorConfig.yAxisLabelColor
        },
        min: 0,
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
                color: hexToRgba(config.colorConfig.yAxisSplitLineColor,0.1)
            }
        },
        axisLine: {
            show: true,
        },
        axisLabel: {
            show: false,
            textStyle: {
                color: config.colorConfig.yAxisLabelColor,

            },
        },
        axisTick: {
            show: true,
        },
    }],
    yData.map((o,idx)=>{
        option.series.push({
            name: o.dataType,
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: config.colorConfig.seriesLine[idx][0],
                    shadowColor: hexToRgba(config.colorConfig.seriesLine[idx][1],0.3),
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: config.colorConfig.seriesLine[idx][0],
                }
            },
            itemStyle: {
                color: config.colorConfig.seriesLine[idx][0],
                borderColor: config.colorConfig.seriesLine[idx][2],
                borderWidth: 1,
                shadowColor: hexToRgba(config.colorConfig.seriesLine[idx][1],0.3),
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: hexToRgba(config.colorConfig.seriesLine[idx][0],0.3)
                        },
                        {
                            offset: 1,
                            color: 'transparent'
                        }
                    ], false),
                    shadowColor: hexToRgba(config.colorConfig.seriesLine[idx][0],0.9),
                    shadowBlur: 20
                }
            },
            data:o.data
        })
    })
    return option;
}

//一般的折线图
export function comLine(comOptoin,config,data){
    let option = Object.assign(comOptoin, {});
    let resData = objToArr(data);
    let xData = resData.xData||['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾'];
    let yData = resData.yData||[{dataType:'',data:[10, 10, 30, 12, 15, 3, 7]},{dataType:'',data:[5, 12, 11, 14, 25, 16, 10]}];
    option.legend = {
        icon: 'circle',
        top: '5%',
        right: '5%',
        itemWidth: 6,
        itemGap: 20
    };
    option.tooltip = {
        trigger: 'axis',
        axisPointer: {
            label: {
                show: true,
                backgroundColor: 'transparent',
                color: config.colorConfig.tooltipAxisPointerColor,
                borderColor: 'transparent',
                shadowColor: 'transparent',
                shadowOffsetY: 0
            },
            lineStyle: {
                width: 0
            }
        },
        backgroundColor: '#transparent',
        textStyle: {
            color: config.colorConfig.tooltipColor
        },
        extraCssText:`box-shadow: 0 0 20px ${config.colorConfig.tooltipShadowColor} inset`
    }
    option.xAxis = [{
        type: 'category',
        data: xData,
        axisLine: {
            lineStyle: {
                color: config.colorConfig.xAxisLineColor
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: config.colorConfig.xAxisLabelColor
            },
            // 默认x轴字体大小
            fontSize: 12,
            // margin:文字到x轴的距离
            margin: 15
        },
        axisPointer: {
            label: {
                padding: [0, 0, 10, 0],
                margin: 15,
                fontSize: 12,
                backgroundColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'transparent' // 0% 处的颜色
                    }, {
                        offset: 0.86,
                        color: 'transparent' // 0% 处的颜色
                    }, {
                        offset: 0.86,
                        color: config.colorConfig.xAxisAxisPointerColor // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: config.colorConfig.xAxisAxisPointerColor  // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        boundaryGap: false
    }];
    option.yAxis = [{
        name:config.textConfig.unit,
        nameTextStyle:{
            color:config.colorConfig.yAxisLabelColor
          },
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: config.colorConfig.yAxisLineColor
            }
        },
        axisLabel: {
            textStyle: {
                color: config.colorConfig.yAxisLabelColor
            }
        },
        splitLine: {
            show: false
        }
    }];
    yData.map((o,idx)=>{
        option.series.push({
            name: o.dataType,
            type: 'line',
            data: o.data,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: { 
                width: 5,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                        offset: 0,
                        color: config.colorConfig.seriesLine[idx][0]
                    },
                    {
                        offset: 1,
                        color: config.colorConfig.seriesLine[idx][1]
                    }
                ]),
                shadowColor: hexToRgba(config.colorConfig.seriesLine[idx][1],0.3),
                shadowBlur: 10,
                shadowOffsetY: 20
            },
            itemStyle: {
                normal: {
                    color: config.colorConfig.seriesLine[idx][1],
                    borderColor: config.colorConfig.seriesLine[idx][1]
                }
            }
        })
    })
    return option;
}
function objToArr(data){
    if(!data||data.length<1||data[0].data.length<1){
        return [];
    }
    let resObj = { xData:[],yData:[]}
    data.map((item,idx)=>{
        let lineData = {dataType:'',data:[]};
        item.data.map((o)=>{
            if(idx==0){resObj.xData.push(o.name)}
            lineData.data.push(o.value)
        });
        
        lineData.dataType = item.dataType;
        resObj.yData.push(lineData)
    })
    return resObj
}
