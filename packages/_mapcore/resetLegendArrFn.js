import GetColorVal from './getColorValClass';
import getJenksBreaks from './getJenksBreaks';
export  default function resetLegendArrFn(valueArr,legendType,colorArr){
  let legendArr = [], MINNUM = Math.min.call(null, ...valueArr),colorLegendArr=[];
  let jenksArrTemp = getJenksBreaks(valueArr, colorArr.length-1);
  let jenksArr = jenksArrTemp.map((item, index) => parseInt(item) || 0);
  if (jenksArr && jenksArr.length > 1) {
    for (let i = 0, l = jenksArr.length; i < l; i++) {
      if (i === 0) {
        if (parseInt(MINNUM) <= jenksArr[0]) {
          legendArr.push({
            type: legendType,
            value: colorArr[i],
            caption: `${parseFloat(MINNUM).toFixed(0)}~${Math.floor(jenksArr[i + 1])}`
          })

        }else {
          legendArr.push({
            type: legendType,
            value: colorArr[i],
            caption: `${parseFloat(jenksArr[0]).toFixed(0)}~${Math.floor(jenksArr[i + 1])}`
          })
        }
        colorLegendArr.push([Math.floor(jenksArr[i + 1]),new GetColorVal(colorArr[i]).colorRGB2Hex()]);

      }else if(i!==l-1){
        legendArr.push({
          type: legendType,
          value: colorArr[i],
          caption: `${Math.ceil(jenksArr[i])}~${Math.ceil(jenksArr[i + 1])}`
        })
        colorLegendArr.push([Math.floor(jenksArr[i + 1]),new GetColorVal(colorArr[i]).colorRGB2Hex()]);
      }

    }
  } else if (jenksArr.length === 1) {
    let name = Math.ceil(jenksArr[0])>0&&`0 ~ ${Math.ceil(jenksArr[0])}`||Math.ceil(jenksArr[0])===0&&`-1 ~ 0`||Math.ceil(jenksArr[0])<0&&`${Math.ceil(jenksArr[0])} ~ 0`;
    legendArr.push({
      type: legendType,
      value: colorArr[0],
      caption:name
    })
    colorLegendArr.push([Math.ceil(jenksArr[0]),new GetColorVal((colorArr[0])).colorRGB2Hex()]);
  } else {
    throw new Error("重置图例数据传参有误!");
  }
  return [legendArr,colorLegendArr];
}
