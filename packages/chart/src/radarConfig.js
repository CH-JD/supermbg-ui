import chartConfig from './nx-chart-config';
import {hexToRgba} from './nx-chart-config';
import {max} from './nx-chart-config';
//雷达图
export function radarFun(type,config,data){
  let group = type.split(",")[0];
  let groupFun = type.split(",")[1];
  let barConfig = Object.assign(chartConfig[group][groupFun],config);
  let comOptoin = {
      backgroundColor: barConfig.colorConfig.bgColor,
      tooltip: {
        textStyle:{
          color:barConfig.colorConfig.tooltipColor
      },
       backgroundColor:'transparent',
       extraCssText:`box-shadow: 0 0 20px ${barConfig.colorConfig.tooltipShadowColor} inset`,
      },
      radar:{
        name: {
          textStyle: {
            fontSize: 14,
            color: barConfig.colorConfig.titleColor,
            padding: [3, 5]
          }
        },
        splitNumber: 4,
        splitArea: {
          show: true,
          areaStyle: {
            color: ['transparent', hexToRgba(barConfig.colorConfig.radarAreaStyleColor,0.3),'transparent','transparent']
          }
        },
        splitLine: {
          lineStyle: {
            color: barConfig.colorConfig.splitLineColor
          }
        },
        axisLine: {
          lineStyle: {
            color: barConfig.colorConfig.axisLineColor
          }
        },
        indicator:[]
      },
      series:[]

  }
  let resOption = {};
  switch(groupFun){
      case "comRadar":
          resOption = comRadar(comOptoin,barConfig,data)
          break;
  }
 
  return resOption;
}

export function comRadar (comOptoin,config,data){
  let option = Object.assign(comOptoin, {});
  let resData = objToArr(data);
  let dataMax = 60;
  const source = {
    data: resData.yData||[43, 10, 28, 35, 50, 19, 13],
    indicator: resData.xData || [
      { name: '家政服务', max: dataMax},
      { name: '助餐服务', max: dataMax},
      { name: '助医服务', max: dataMax},
      { name: '待办服务', max: dataMax},
      { name: '交谈服务', max: dataMax},
      { name: '康复服务', max: dataMax},
      { name: '助行服务', max: dataMax},
    ]
  }
  const buildSeries = function(data){
    const helper = data.map((item, index) => {
      const arr = new Array(data.length);
      arr.splice(index, 1, item);
      return arr;
    })
    return [data, ...helper].map((item, index) => {
      return {
        type: 'radar',
        itemStyle: {
          color: config.colorConfig.areaColor
        },
        lineStyle: {
          color: index === 0 ? config.colorConfig.areaColor : 'transparent'
        },
        areaStyle: {
          color: index === 0 ? config.colorConfig.areaColor : 'transparent',
          opacity: 0.3
        },
        tooltip: {
          show: index === 0 ? false : true,
          formatter: function() {
            return source.indicator[index - 1].name + ' ：' + source.data[index - 1];
          }
        },
        z: index === 0 ? 1 : 2,
        data: [item]
      }
    })
  }
  option.radar.indicator = source.indicator;
  option.series = buildSeries(source.data);
  return option;
}

function objToArr(data){
  if(!data||data.length<1||data[0].data.length<1){
      return [];
  }
  let resObj = {xData:[],yData:[]}
  let indicator = [];
  data[0].data.map((o)=>{
       indicator.push(o.name)
      resObj.yData.push(o.value)
  });
  let dataMax = Number(max(resObj.yData))
  resObj.xData = indicator.map((item,idx)=>{
    return {name:item,max:dataMax}
  })
  return resObj
}