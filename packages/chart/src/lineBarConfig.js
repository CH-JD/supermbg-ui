import echarts from 'echarts';
import chartConfig from './nx-chart-config';
import {hexToRgba} from './nx-chart-config';
//折线柱状图
export function lineBarFun(type,config,data){
    let group = type.split(",")[0];
    let groupFun = type.split(",")[1];
    let chartClass = type.split(",")[2];
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
            top: '100',
            right: '40',
            left: '60',
            bottom: '40' //图表尺寸大小
        },
        tooltip:{
            trigger: 'axis',
            textStyle:{
                color:barConfig.colorConfig.tooltipColor
            },
             backgroundColor:'transparent',
             extraCssText:`box-shadow: 0 0 20px ${barConfig.colorConfig.tooltipShadowColor} inset`,
             padding:[10,10]
        },
        xAxis: [{
            type: 'category',
            color: barConfig.colorConfig.xAxis,
            data: [],
            axisLabel: {
                margin: 10,
                color: barConfig.colorConfig.xAxisLabelColor,
                textStyle: {
                    fontSize: 12
                },
            },
            axisLine: {
                lineStyle: {
                    color: hexToRgba(barConfig.colorConfig.xAxisLineColor,0.37),
                }
            },
            axisTick: {
                show: false
            },
        }],
        yAxis: [{
            name:barConfig.textConfig.unit,
            nameTextStyle:{
                color:barConfig.colorConfig.yAxisLabelColor
            },
            axisLabel: {
                //formatter: '{value}%',
                color: barConfig.colorConfig.yAxisLabelColor,
                textStyle: {
                    fontSize: 12
                },
            },
            axisLine: {
                lineStyle: {
                    color: hexToRgba(barConfig.colorConfig.yAxisLineColor,0.37),
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: hexToRgba(barConfig.colorConfig.yAxisSplitLineColor,0.2),
                    type: 'dashed',
                }
            }
        }],
        series:[]

    }
    let resOption = {};
    switch(groupFun){
        case "comLineBar":
            resOption = comlineBar(comOptoin,barConfig,data,chartClass)
            break;
    }
    return resOption;

}
export function comlineBar(comOptoin,config,data,chartClass){
    let option = Object.assign(comOptoin, {});
    let resData = objToArr(data,chartClass);
    let xData = resData.xData||['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
    let barData = resData.barData||[{dataType:'',data:[40, 80, 50, 36, 30, 35, 40, 60]}];
    let lineData = resData.lineData||[{dataType:'',data:[47, 67, 47, 37, 37, 35, 40, 60]}];
    option.xAxis[0].data = xData;
    option.color=[config.colorConfig.seriseBarLinear[1],config.colorConfig.seriseLineLinear[0]];
    option.legend = {
        icon: 'circle',
        top: '5%',
        right: '5%',
        itemWidth: 6,
        itemGap: 20
    },
    barData.map(o=>{
        option.series.push({
            name:o.dataType,
            type: 'bar',
            data: o.data,
            barWidth: '16px',
            itemStyle: {
                normal: {
                    color: function(params) { //展示正值的柱子，负数设为透明
                        let colorArr = params.value > 0 ? config.colorConfig.seriseBarLinear : ['transparent', 'transparent']
                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colorArr[0] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: colorArr[1] // 100% 处的颜色
                        }], false)
                    },
                    barBorderRadius: [30, 30, 0, 0] //圆角大小
                },
            },
            label: {
                normal: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: config.colorConfig.seriseBarLabel,
                    position: 'top',
                }
            }
        })
    })
    lineData.map(o=>{
        option.series.push({
            data: o.data,
            type: 'line',
            smooth: true,
            name: o.dataType,
            //symbol: 'none',
            lineStyle: {
                color: config.colorConfig.seriseLineColor,
                width: 3,
                shadowColor: hexToRgba(config.colorConfig.seriseLineShadowColor,0.3), //设置折线阴影
                shadowBlur: 10,
                shadowOffsetY: 10,
            },
            tooltip:{},
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                                offset: 0,
                                color: hexToRgba(config.colorConfig.seriseLineLinear[0],0.5),

                            },
                            {
                                offset: 1,
                                color: hexToRgba(config.colorConfig.xAxisLineColor[1],0.1),
                            }
                        ],
                        false
                    ),


                }
            },
        })
    })

    return option;
}


function objToArr(data,chartClass){
    if(!data||data.length<1||data[0].data.length<1){
        return [];
    }
    let types = chartClass.split("-")
    let resObj = {xData:[],lineData:[],barData:[],legend:[]}
    data.map((item,idx)=>{
        if(idx<types.length){
            let obj = {dataType:'',data:[]};
            item.data.map((o)=>{
                if(idx==0){resObj.xData.push(o.name)}
                obj.data.push(o.value)
            });
            obj.dataType = item.dataType;
            resObj.legend.push(item.dataType);
            types[idx]=='line'? resObj.lineData.push(obj):resObj.barData.push(obj)
        }
    })
    return resObj
}
