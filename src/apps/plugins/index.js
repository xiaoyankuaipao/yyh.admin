/**
 * 全局组件
 */
import ySubmenu from './menu/submenu.vue'
import yMenu from './menu/index';


/*扩展方法 */
import * as mUtils from '@/config/mUtils';

var plugin={
    ySubmenu:ySubmenu,
    yMenu:yMenu
};

export default {
    install(Vue){
        /*全局组件 */
        for(var i in plugin){
            Vue.component(i,plugin[i]);
        }

        /*扩展方法 */
        for(let prop in mUtils){
            Vue.prototype['$' + prop] = mUtils[prop]
        }
    }

    
}

