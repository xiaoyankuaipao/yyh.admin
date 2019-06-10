import Vue from "vue";
import { getStore } from "@/config/mUtils";

// 按钮权限指令
const btnhas = Vue.directive("btnhas", {
  inserted: function(el, binging) {
    if (!Vue.prototype.$_btnhas(binging.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

//按钮权限检查方法
Vue.prototype.$_btnhas = function(value) {
  let hasPermsission = false;
  let btnStr = getStore("btnpermissions");
  if (btnStr == undefined || btnStr == null) {
    return false;
  }
  let btnpermissions = btnStr.split(",");
  for (let i = 0; i < btnpermissions.length; i++) {
    if (btnpermissions[i] == value) {
      hasPermsission = true;
      break;
    }
  }
  return hasPermsission;
};

export default { btnhas}
