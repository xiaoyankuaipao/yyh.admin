/**
 * 全局组件
 */
import ySubmenu from './menu/submenu.vue'
import yMenu from './menu/index';


var plugin={
    ySubmenu:ySubmenu,
    yMenu:yMenu
};

export default {
    install(Vue){
        for(var i in plugin){
            Vue.component(i,plugin[i]);
        }
    }
}

