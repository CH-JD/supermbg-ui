import Vue from 'vue';
import addPopupHandler from './popupTools'
import paintControlClass from "./paintControlClass";
import getJenksBreaks from  "./getJenksBreaks";
import creatLabelLayer from './mapBoxCore/creatLayer/creatLabelLayer'
import creatICONLayer from './mapBoxCore/creatLayer/creatICONLayer'
import addImgLoad from './addImgLoad'
const mapCore = {
  paintControlClass,
  getJenksBreaks,
  creatICONLayer,
  creatLabelLayer,
  addImgLoad,
  addPopupHandler
}

export default  {
  ...mapCore
}
