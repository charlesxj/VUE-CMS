<template>
  <div>
    <!-- 顶部 -->
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item',item.id==0?'mui-active':'']"
          v-for="item in imgcategroy"
          :key="item.id"
        >{{item.id}}-{{item.title}}</a>
        <!-- <a class="mui-control-item">热点</a>
        <a class="mui-control-item">北京</a>
        <a class="mui-control-item">社会</a>
        <a class="mui-control-item">娱乐</a>
        <a class="mui-control-item">科技</a>-->
      </div>
      <ul>
          <li v-for="item in list" :key="item">
              <img v-lazy="item">
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mui from "../lib/mui/js/mui.min.js";
import axios from "axios";

export default {
  data() {
    return {
      imgcategroy: []
    };
  },
  mounted() {
    // mui(".mui-scroll-wrapper").scroll({
    //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // });
    var options = {
      scrollY: false, //是否竖向滚动
      scrollX: true, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
      deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
      bounce: true //是否启用回弹
    };
    mui(".mui-scroll-wrapper").scroll(options);
  },
  created() {
    this.getImgCategroy();
  },
  methods: {
    getImgCategroy() {
      axios.get("http://10.1.1.10:8011/api/values").then(
        a => {
          if (a.data.status === 0) {
            a.data.message.unshift({ title: "全部", id: 0 });
            this.imgcategroy = a.data.message;
          }
          console.log(this.imgcategroy);
        },
        e => {}
      );
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

img[lazy='loading']{
    width: 40px;
    height: 300px;
    margin:auto;
}
</style>
