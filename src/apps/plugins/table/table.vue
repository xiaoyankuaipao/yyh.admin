<!--
 * 支持分页的表格组件
-->

<template>
    <div>
        <el-table ref="table" border fit="fit" :stripe="stripe" :data="tableData" :empty-text="emptyText" highlight-current-row
         @selection-change="onSelectionChange" @current-change="onCurrentRowChanged" style="width:100%">
            <slot name="columns"></slot>
        </el-table>
        <div v-if="pagination" class="Pagination" tyle="text-align: left;margin-top: 10px;">
            <el-pagination v-if="reload" @size-change="handleSizeChanged" @current-change="handleCurrentPageChanged" :current-page="currentPage"
                :page-sizes="pageSize" :page-size="limit" layout="total, -> ,sizes, -> , prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        /**列宽是否自撑开 */
        fit:{
            type:Boolean,
            default:true,
            required:false
        },
        /**是否显示斑马纹 */
        stripe:{
            type:Boolean,
            default:true,
            required:false
        },
        /**表格高度 */
        tableHeight:{
            type:Number,
            default:0,
            required:false
        },
        /**是否分页 */
        pagination:{
            type:Boolean,
            default:true,
            required:false
        },
        /**分页数量选项 */
        pageSize:{
            type:Array,
            default:function(){
                return [5,10,20,50,100]
            },
            required:false 
        },
        /**查询API，方法 */
        searchApi:{
            type:Function,
            required:true
        },
        /**查询参数 */
        params:{
            type:Object,
            default(){
                return {};
            },
            required:false
        }
    },
    data(){
        return {
            reload:true,
            tableData:[],
            offset:0,// 偏移数，(currentpage-1)*limit
            limit:20,//每页数量
            count:0,//总数
            currentPage:1,//当前页码数
            emptyText:'Sorry,暂无数据',
            selectRow:null,//选中行
        }
    },
    created(){
        this.initData()
    },
    methods:{
        /**获取数据 */
        async getAPIData(){
            var params = this.params
            if(this.pagination){
                params.page = this.currentPage;
                params.rows = this.limit;
            }
            this.emptyText = "加载中……";
            this.tableData = [];
            this.reload = false;
            const result = await this.searchApi(params);
            if(result.state == 1){
                this.tableData = result.result.data;
                this.count = result.result.totalCount;
                if(this.tableData.length == 0){
                    this.emptyText = '暂无数据……';
                }
                this.reload = true;
            }else{
                this.$message.error('获取数据失败!');
            }
        },
        async initData(){
            try{
                this.getAPIData();
            }catch(err){
                this.$message.error('获取数据失败!');
            }
        },
        /**每页数量变化事件 */
        handleSizeChanged(val){
            this.limit = val 
            this.getAPIData()
        },
        /**当前页变化事件 */
        handleCurrentPageChanged(val){
            this.currentPage = val 
            this.offset = (val-1)*this.limit
            this.getAPIData()
        },
        /**行选中事件 */
        onCurrentRowChanged(selection){
            this.selectRow = selection;
        },
        /**当选择项变化时触发 */
        onSelectionChange(selection){
            this.selectRow=selection;
        },
        /**获取选中行 */
        getSelectRow(){
            return this.selectRow;
        },
        /**获取当前表格中的数据 */
        getTableData(){
            return this.tableData()
        },
        /**查询 */
        search(params){
            for(var i in params){
                this.params[i] = params[i]
            }
            this.getAPIData();
        },
        /**取消选中 */
        clearSelection(){
            this.$refs.table.clearSelection();
        }
    }
}
</script>

<style lang="less" scoped>

</style>
