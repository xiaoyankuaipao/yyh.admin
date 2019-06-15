<template>
  <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
      <!-- <bm-view style="width: 100%; height:100%; flex: 1"></bm-view> -->
      <!-- 添加比例尺 -->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> 
      <!-- 添加缩放控件 -->
      <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
      <!-- 添加地图类型 -->
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <!-- 添加缩略图 -->
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
      <!-- 添加定位 -->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- 添加版权信息 -->
      <bm-copyright
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        :copyright="[{id: 1, content: 'Copyright Message', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a>yyh-admin</a>'}]">
      </bm-copyright>
      <!-- tianjia 城市 -->
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <!-- 添加全景 -->
      <bm-panorama></bm-panorama>

      <!-- 添加自定义控件 -->
      <bm-control>
        <el-button @click="addZoom(19)">缩放至最大</el-button>
        <el-button @click="addZoom(10)">还原</el-button>
        <el-button @click="addZoom(3)">缩放至最小</el-button>
      </bm-control>

      <!-- 交通路况 -->
      <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>

    <!-- 画点 -->
    <!-- <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker> -->
    <!-- <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker> -->
  </baidu-map>
</template>
<script>
export default {
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
     addZoom (level) {
      this.zoom = level;
      this.distanceTool = new DistanceTool(map, {lineStroke : 2})
    },
    
  }
}
</script>

<style>
    .bm-view{
        width: 100%;
        height: 100%;
    }
    /* 隐藏左下角baidu logo */
    .anchorBL{display:none;}
</style>

