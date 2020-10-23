
//添加聚合图
export default function createClusterLayer(options, map){
  return new Promise(async resolve => {
    const _Options = options;
    map.addSource(`cluster_${_Options.id}`, {
      type: "geojson",
      data: _Options.pointFeatures,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 100
    });
    map.addLayer({
      id: `cluster_${_Options.id}`,
      type: "circle",
      source: `cluster_${_Options.id}`,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });
    map.addLayer({
      id: `cluster_count_${_Options.id}`,
      type: "symbol",
      source: `cluster_${_Options.id}`,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });
    map.addLayer({
      id: `unclustered_point_${_Options.id}`,
      type: "circle",
      source: `cluster_${_Options.id}`,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });
    resolve({
      layerId:[`cluster_${_Options.id}`,`cluster_count_${_Options.id}`,`unclustered_point_${_Options.id}`],
      sourceId:[`cluster_${_Options.id}`]
    });
  });
}
