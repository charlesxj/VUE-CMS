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
      <ul class="photo-list">
        <li v-for="(item,index) in imgList" :key="index">
          <img v-lazy="item.img_url">
          <div class="info">
            <h1 class="info-title">{{item.title}}</h1>
            <div class="info-body">{{item.zhaiyao}}</div>
          </div>
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
      imgcategroy: [],
      currentIndex: 0,
      imgList: []
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
      axios.get(this.GLOBALVAR.urlhost + "/api/ImgCategory").then(
        a => {
          if (a.data.status === 0) {
            a.data.message.unshift({ title: "全部", id: 0 });
            this.imgcategroy = a.data.message;
          }

          this.getImgInfo(0);
        },
        e => {}
      );
    },
    getImgInfo(index) {
      axios.get(this.GLOBALVAR.urlhost + "/api/ImgCategory/" + index).then(
        a => {
          if (a.data.status === 0) {
            this.imgList = a.data.message;
            console.log(this.imgList);
          }
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

.photo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: 50px 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    margin: 10px;
    position: relative;

    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    img {
      width: 100%;
      vertical-align: middle;
    }

    .info {
      z-index:199;
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.4);
      // max-height: 84px;
      overflow: hidden;
      width:100%;
      max-height: 84px;
      .info-title {
        font-size: 14px;        
      }

      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
