import {barFun} from './barConfig'
import {lineFun} from './lineConfig'
import {pieFun} from './pieChart'
import {radarFun} from './radarConfig'
import {lineBarFun} from './lineBarConfig'

const chartConfig = {
   bar:{
       solidBar:{
            colorConfig:{
                bgColor:"#010d3a",//"010d3a"
                titleColor:"#dee0e4",
                tootipColor:'#ffffff',
                tooltipShadowColor:"#49BEE5",
                xAxisLineColor:"#ffffff",
                xAxisTickColor:'#7DFFFD',
                xAxisLabelColor:"#dee0e4",
                yAxisLineColor:"#ffffff",
                yAxisLabelColor:"#dee0e4",
                seriesMaxColor:["#2f66c0","#3b80e2","#4866c0"],//["#2f66c0","#3b80e2","#4866c0"]
                serisesValueColors:["#3B80E2","#49BEE5"],//["#3B80E2","#49BEE5"],["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"]
                seriseLableColor:"#ffffff"
            },
            textConfig:{
                title:"标题",
                unit:'单位'
            }
       },
       picogramBar:{
        colorConfig:{
            bgColor:"#38445E",
            titleColor:"#00F6FF",
            tootipColor:'#ffffff',
            tooltipShadowColor:"#49BEE5",
            xAxisLineColor:"#ff816d",
            xAxisLabelColor:"#999999",
            yAxisLineColor:"#ff816d",
            yAxisLabelColor:"#999999",
            yAxisSplitAreaColor:"#e1e1e1",
            yAxisSplitLineColor:"ff816d",
            seriseColorStops:["#e85e6a","#ffa018",'#57d762','#ec5489']
        },
        textConfig:{
            title:"标题",
            unit:'单位'
        }
       },
       verticalBar:{
        colorConfig:{
            bgColor:"#003366",
            titleColor:"#90979c",
            tootipColor:'#ffffff',
            tooltipShadowColor:"#49BEE5",
            yAxisLabelColor:"#ffffff",
            seriseBarLinear:["#3959ff","#2ec8cf"],//["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"],
            seriseBgBarColor:'#181f44'
        },
        textConfig:{
            title:""
        }
       },
       comBar:{
        colorConfig:{
            bgColor:"#00265f",
            titleColor:"#90979c",
            tootipColor:'#ffffff',
            tooltipShadowColor:"#49BEE5",
            xAxisLineColor:"#ffffff",
            xAxisLabelColor:"#e2e9ff",
            yAxisLabelColor:"#e2e9ff",
            yAxisLineColor:"#ffffff",
            yAxisSplitLineColor:"#ff816d",
            seriseLabelbgColor:"#00a0dd",
            seriseLabelRichD:"#3CDDCF",
            seriseLabelRichA:"#ffffff",
            seriseLabelRichB:"#234e6c",
            seriseBarLinear:[["#00f4ff","#004da7"],["#da9635","#ffa018"],["#ace866","#57d762"],["#f881a6","#ec5489"]],
            seriseBarshadowColor:'#00a0dd'
        },
        textConfig:{
            title:"标题",
            unit:'单位'
        }
       }
   },
   line:{
    pointLine:{
        colorConfig:{
            bgColor:"#000000",
            titleColor:"#ffffff",
            tooltipColor:'#5c6c7c',
            tooltipShadowColor:"#49BEE5", 
            toottipColorStops:"#ffffff",
            xAxisLabelColor:"#97aab4",
            xAxisLineColor:'#ffffff',
            xAxisSplitArea:'#f00f00',
            yAxisLabelColor:"#97aab4",
            yAxisLineColor:"#ffffff",
            yAxisSplitLineColor:"#ffffff",
            seriesLine:[["#2e7af0","#000000","#ffffff"],["#00ca95","#000000","#ffffff"],["#e64a6a","#000000","#ffffff"],["#ffe213","#000000","#ffffff"],["#ffe213","#000000","#611fc8"]]
        },
        textConfig:{
            title:"标题",
            unit:'单位'
        }
    },
    comLine:{
        colorConfig:{
            bgColor:"#fff",
            titleColor:"#000000",
            tooltipColor:'#5c6c7c',
            tooltipAxisPointerColor:'#556677',
            tooltipShadowColor:"#a3a3a3", 
            xAxisLineColor:"#DCE2E8",
            xAxisLabelColor:"#556677",
            xAxisAxisPointerColor:'#33c0cd',
            yAxisLabelColor:"#556677",
            yAxisLineColor:"#DCE2E8",
            seriesLine:[["#9effff","#9E87FF"],["#73DD39","#73DDFF"],["#ffbf64","#ff9c0f"],["#e83b6c","#df8760"],["#b08ae4","#5f1cc7"],["#7fd6ef","#13bced"]]
        },
        textConfig:{
            title:"全国6月销售统计",
            unit:'单位'
        }
    }
   },
   pie:{
       comPie:{
            colorConfig:{
                bgColor:"#ffffff",
                titleColor:"#000000",
                tooltipColor:'#5c6c7c',
                tooltipShadowColor:"#a3a3a3", 
                colorList:['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
            },
            textConfig:{
                title:"标题"
            } 
       },
       picPie:{
        colorConfig:{
            bgColor:"#0A2E5D",
            titleColor:"#ffffff",
            colorList:['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000'],
            seriseLableColor:'#dddddd',
            seriseLableLineColor:'#00ffff',
            legendColor:'#ffffff'
        },
        textConfig:{
            title:"标题22",
        } 
       }
   },
   radar:{
       comRadar:{
        colorConfig:{
            bgColor:"#080b30",
            titleColor:"#ffffff",
            tooltipColor:'#ffffff',
            tooltipShadowColor:"#a3a3a3",
            radarAreaStyleColor:"#0c3e81",
            splitLineColor:'#0c3e81',
            axisLineColor:'#0c3e81',
            areaColor:'#31e586'
        },
       }
   },
   lineBar:{
    comLineBar:{
        colorConfig:{
            bgColor:"#fff",
            titleColor:"#fff",
            tooltipColor:'#000000',
            tooltipShadowColor:"#dddddd", 
            xAxis:"#59588D",
            xAxisLabelColor:"#999999",
            xAxisLineColor:"#6b6b6b",
            yAxisLabelColor:"#999999",
            yAxisLineColor:"#DCE2E8",
            yAxisSplitLineColor:"#836565",
            seriseBarLinear:['#55d1ff', '#2d82ff'],
            seriseBarLabel:'#333333',
            seriseLineColor:"#3275FB",
            seriseLineLinear:["#4956ff","#ffffff"],
            seriseLineShadowColor:'#000000'
        },
        textConfig:{
            title:"标题",
            unit:'单位'
        }
    }
   }
}
export default chartConfig




/**
 * 
 * @param {*} type  
 * @param {*} config 
 * @param {*} data  
 */
export function parseChart(type,config,data){
    let group = type.split(",")[0];
    let resOption = {};
    switch(group){
        case "bar":
            resOption = barFun(type,config,data);
            break;
        case "line":
            resOption = lineFun(type,config,data);
        break;
        case "pie":
            resOption = pieFun(type,config,data);
        break;
        case "radar":
            resOption = radarFun(type,config,data);
        break;
        case "lineBar":
            resOption = lineBarFun(type,config,data);
        break;
    }
    return resOption;
}


/**
 * 
 * @param {*} colorVal  16进制颜色值
 * @param {*} opacity   透明度
 */
export function hexToRgba(colorVal,opacity){
    let opacityVal = opacity&&(Math.abs(opacity)>=1&&1||Math.abs(opacity))||1;
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorVal);
    return result ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(result[3], 16)},${opacityVal})`:"rgba(255,255,255,1)"
}


/**
 * 最大值
 */
export function max(arr){
    return Math.max.apply(null, arr);
  }

