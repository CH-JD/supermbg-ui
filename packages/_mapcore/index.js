
import addPopupHandler from './popupTools'
import changeOpacity from './changeOpacity'
import GetColorVal from './getColorValClass'
import paintControlClass from "./paintControlClass";
import getJenksBreaks from  "./getJenksBreaks";
import creatLabelLayer from './_abovelayer/creatLabelLayer'
import creatICONLayer from './_abovelayer/createICONLayer'
import addImgLoad from './addImgLoad'
import creatRestLayer from './_abovelayer/creatRESTLayer'
import SourceConfig from './_sourceModel/index'
import getRestData from './getRestData'
import createMVTLayer from './_abovelayer/createMVTLayer'
import createWMTSLayer from './_abovelayer/createWMTSLayer'
import {removeLayer,removeSource} from './removeLayer'
import resetLegendArrFn from './resetLegendArrFn'
import changLayerSort from './toggleLayerSort'
import createClusterLayer from "./_abovelayer/createClusterLayer";
import createHoneycombLayer from "./_abovelayer/createHoneycombLayer";
import createScatterLayer from "./_abovelayer/createScatterLayer";
import createGridLayer from "./_abovelayer/createGridLayer";
import createHeatMapLayer from "./_abovelayer/createHeatMapLayer";
import createHexagonLayer from "./_abovelayer/createHexagonLayer";
import createSubsecLayer from "./_abovelayer/createSubsecLayer";
import createBlockLayer from "./_abovelayer/createBlockLayer";
import creatRestDataLayer  from "./_abovelayer/creatRestDataLayer";
import createTielsLayer from "./_abovelayer/createTielsLayer";
import createWMSLayer from "./_abovelayer/createWMSLayer";
import {
  resetBorderColor,
  resetBorderWidth,
} from './render'
import resetIconConfig from './render'
const mapCore = {
  resetLegendArrFn,
  paintControlClass,
  creatICONLayer,
  changeOpacity,
  getJenksBreaks,
  createClusterLayer,
  createHoneycombLayer,
  createScatterLayer,
  createGridLayer,
  createHeatMapLayer,
  createHexagonLayer,
  createSubsecLayer,
  createBlockLayer,
  creatRestDataLayer,
  createTielsLayer,
  creatRestLayer,
  createMVTLayer,
  createWMSLayer,
  createWMTSLayer,
  creatLabelLayer,
  addImgLoad,
  addPopupHandler,
  getRestData,
  removeLayer,
  removeSource,
  resetBorderColor,
  resetBorderWidth,
  resetIconConfig,
  GetColorVal,
  changLayerSort,
  SourceConfig
};

export default  {
  ...mapCore
}
