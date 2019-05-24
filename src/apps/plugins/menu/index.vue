<template>
    <el-menu :default-active="defaultActive" 
          :unique-opened='true' 
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
        <sub-menu :data="data"></sub-menu>
    </el-menu>
</template> 

<script>
import subMenu from './submenu.vue'
export default {
    components:{
        subMenu
    },
    props:{
        data:{
            type:Array,
            default(){
                return []
            }
        },
        defaultActive:{
            type:String,
            default(){
                return ''
            }
        }
    }
}
</script>
