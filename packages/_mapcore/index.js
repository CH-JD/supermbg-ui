
import addPopupHandler from './popupTools'
import changeOpacity from './changeOpacity'
import paintControlClass from "./paintControlClass";
import getJenksBreaks from  "./getJenksBreaks";
import creatLabelLayer from './_abovelayer/creatLabelLayer'
import creatICONLayer from './_abovelayer/creatICONLayer'
import addImgLoad from './addImgLoad'
import creatRestLayer from './_abovelayer/creatRESTLayer'
import SourceConfig from './_sourceModel/index'
import getRestData from './getRestData'
import {removeLayer,removeSource} from './removeLayer'
import {
  resetBorderColor,
  resetBorderWidth,
} from './render'
import resetIconConfig from './render'
const mapCore = {
  paintControlClass,
  creatICONLayer,
  changeOpacity,
  getJenksBreaks,
  creatRestLayer,
  creatLabelLayer,
  addImgLoad,
  addPopupHandler,
  getRestData,
  removeLayer,
  removeSource,
  resetBorderColor,
  resetBorderWidth,
  resetIconConfig,
  SourceConfig
}

export default  {
  ...mapCore
}
