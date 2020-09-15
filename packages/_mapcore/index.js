
import addPopupHandler from './popupTools'
import paintControlClass from "./paintControlClass";
import getJenksBreaks from  "./getJenksBreaks";
import creatLabelLayer from './_abovelayer/creatLabelLayer'
import creatICONLayer from './_abovelayer/creatICONLayer'
import addImgLoad from './addImgLoad'
import creatRestLayer from './_abovelayer/creatRESTLayer'
import SourceConfig from './_sourceModel/index'
const mapCore = {
  paintControlClass,
  getJenksBreaks,
  creatICONLayer,
  creatRestLayer,
  creatLabelLayer,
  addImgLoad,
  addPopupHandler,
  SourceConfig
}

export default  {
  ...mapCore
}
