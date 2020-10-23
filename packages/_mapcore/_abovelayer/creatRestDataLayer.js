import resetLegendArrFn from '../resetLegendArrFn'
function getRestDataUrl(features,options) {
  return new Promise(resolve => {
    if(features.length){
      let dataList = [],valueArr =[],colorArr=[],pointGeoJson = {
        type: 'FeatureCollection',
        features: []
      },fillFeaturesSource ={
        type: 'FeatureCollection',
        features: []
      };
      for(let val of features){
        if(val.properties.VALUE){
          fillFeaturesSource.features.push(val);
          val.properties.VALUE =parseFloat(val.properties.VALUE);
          val.properties['value']=parseFloat(val.properties.VALUE);
          pointGeoJson.features.push({
            type: "feature",
            geometry: {
              "type": "Point",
              "coordinates": [parseFloat(val.properties.CENTER_X), parseFloat(val.properties.CENTER_Y)]
            },
            properties: val.properties
          });
          dataList.push({
            value:val.properties.VALUE,
            name:val.properties.NAME,
            lngLat:[parseFloat(val.properties.CENTER_X), parseFloat(val.properties.CENTER_Y)]
          });
          valueArr.push(parseFloat(val.properties.VALUE));
        }
      }
      let MAXNUM = Math.max.call(null, ...valueArr);
      for(let val of options.mapConfig.renderColor.defaultConfigColorArr){
        if(val.colorName===options.mapConfig.renderColor.color){
          colorArr = val.colorArr;
        }
      }
      if(colorArr.length===0){
        options.mapConfig.renderColor.color=options.mapConfig.renderColor.defaultConfigColorArr[0].colorName;
        colorArr=options.mapConfig.renderColor.defaultConfigColorArr[0].colorArr;
      }
      let legendArr = resetLegendArrFn(valueArr,"color",colorArr)[0];
      for(let item of fillFeaturesSource.features){
        for (let i = 0, l = legendArr.length; i < l; i++) {
          if (i === l - 1 && item.properties['value'] >= parseInt(legendArr[i].caption.split("~")[0])) {
            item.properties["color"] = legendArr[i].value;
          } else if (parseInt(legendArr[i].caption.split("~")[0]) <= item.properties['value'] && parseInt(legendArr[i].caption.split("~")[1]) > item.properties['value']) {
            item.properties["color"] = legendArr[i].value;
          }
        }
        item.properties["height"] = parseInt(MAXNUM) !== 0 && parseInt(100000 * item.properties['value'] / MAXNUM) || 0;
        item.height = parseInt(MAXNUM) !== 0 && parseInt(100000 * item.properties['value'] / MAXNUM) || 0;
      }
      resolve([fillFeaturesSource,pointGeoJson,dataList,legendArr]);
    }
  })
};

export default function creatRestDataLayer(map,options){
  return new Promise(resolve => {
    const _Options = options;
    console.log(_Options);
    let sqlParam = new _Options.SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: `${_Options.dataSet}@${_Options.datasourceName}`
      },
      datasetNames: [`${_Options.datasourceName}:${_Options.dataSet}`],
      fromIndex:0,
      toIndex:9999,
      maxFeatures:9999
    });
    new _Options.mapboxgl.supermap.FeatureService(_Options.url).getFeaturesBySQL(sqlParam,async (serviceResult) => {
      if (serviceResult.result&&serviceResult.result.features) {
        let res = await getRestDataUrl(serviceResult.result.features.features,_Options),
          fillFeatures = res[0],
          dataList = res[2],
          legendArr = res[3],
          pointFeatures = res[1];
        map.addSource(`fill_${_Options.id}`, {
          type: 'geojson',
          data: fillFeatures
        });
        map.addSource(`icon_${_Options.id}`, {
          type: 'geojson',
          data: pointFeatures
        });
        map.addLayer({
          "id": `fill_${_Options.id}`,
          "maxzoom": 21,
          "type": "fill",
          "layout": {},
          "paint": {
            "fill-color": ['get', 'color'],
            "fill-opacity": 1,
          },
          "source": `fill_${_Options.id}`,
          "minzoom": 0
        });
        map.addLayer({
          "id": `line_${_Options.id}`,
          "maxzoom": 21,
          "type": "line",
          "layout": {
            "line-join": "miter",
            "line-miter-limit": 2,
            "line-round-limit": 1.05,
          },
          "paint": {
            "line-color": _Options.mapConfig.boderConfig.color || "#219bc0",
            "line-opacity": 1,
            "line-width": _Options.mapConfig.boderConfig.width || 0.75
          },
          "source": `fill_${_Options.id}`,
          "minzoom": 0
        });
        map.addLayer({
          "id": `font_${_Options.id}`,
          "type": "symbol",
          "source": `icon_${_Options.id}`,
          "interactive": true,
          "layout": {
            "text-size": {
              base: 10,
              stops: [
                [3, 12],
                [7, 14],
                [15, 16]
              ],
            },
            "text-font": [
              "Arial Regular"
            ],
            "text-max-width": 20,
            "text-offset": [0, 0.2],
            "text-anchor": "top",
            "text-field": "{NAME}",
          },
          "paint": {
            "text-color": "#333",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.25,
          },
        });
        map.addLayer({
          "id": `label_${_Options.id}`,
          "type": "symbol",
          "source": `icon_${_Options.id}`,
          "interactive": true,
          "layout": {
            "text-size": {
              base: 10,
              stops: [
                [3, 12],
                [7, 14],
                [15, 16]
              ],
            },
            "text-font": [
              "Arial Regular"
            ],
            "text-max-width": 20,
            "text-letter-spacing": -.5,
            "text-offset": [0.25, 1.75],
            "text-anchor": "top",
            "text-field": "{value}",
          },
          "paint": {
            "text-color": "#333",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.25,
          },
        });
        resolve({
          fillFeatures,
          dataList,
          legendArr,
          pointFeatures,
          sourceId:[`fill_${_Options.id}`, `icon_${_Options.id}`],
          layerId:[`fill_${_Options.id}`,`line_${_Options.id}`,`font_${_Options.id}`,`label_${_Options.id}`],
        });
      }
    });
  })
}
