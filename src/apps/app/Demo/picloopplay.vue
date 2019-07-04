<template>
    <div>
        <y-picloopplay :urls="picData"></y-picloopplay>    
    </div>    
</template>

<script>
export default {
    data(){
        return {
            picData:[
                // 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3884861603,63467093&fm=26&gp=0.jpg',
                // 'http://pic39.nipic.com/20140314/8098773_002550872154_2.jpg',
                // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561187918&di=0226719f40cd13f2cdbc5655c8a73f92&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9678463fe652730cd52d1285d8874782f428b0ed1f9db-JevoUv_fw658',
                // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561187945&di=c3c5a7ae0baddd3465f2be98232f1b81&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa164605c111d5bf56e4f3a3590faab32ca3cd9b2cea2-S3P47q_fw658'
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561470884&di=be86f21fe950ebbe13bf40f47f27c6df&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-10%2F2012101714105846249.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561471037&di=9baf80b6cd472ae6328cd49200a92b54&imgtype=jpg&er=1&src=http%3A%2F%2Fpic5.nipic.com%2F20100120%2F3641224_180653657501_2.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560876364705&di=3164028b8db3f0113c04815764109e5a&imgtype=0&src=http%3A%2F%2Fp1.pstatp.com%2Flarge%2Fpgc-image%2F8a112a1d521c4e249b49115e54b77206'
            ]
        }
    }
}  
</script>

<style lang="less" scoped>

</style>
