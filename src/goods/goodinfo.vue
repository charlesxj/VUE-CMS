<template>
  <div class="goodsinfo-container">
    <!-- <h3 class="title">{{this.goodInfo.title}}</h3>
        <p class="content" v-html="this.goodInfo.content">
           
    </p>-->

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :circlePics="circlePics"></swiper>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{this.goodInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{this.goodInfo.market_price}}</del> &nbsp;&nbsp;销售价:
            <span class="now_price">￥{{this.goodInfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <number @Getselectedcount="Getselectedcount" :max="this.goodInfo.stock_quantity"></number>
          </p>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShowCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div>{{this.$store.state.car}}</div>

    <!-- 商品详情 -->

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品编号：{{this.goodInfo.goods_no}}</p>
          <p>库存情况：{{this.goodInfo.stock_quantity}}件</p>
          <p>上架时间: {{this.goodInfo.add_time|dateFormat111}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <!-- <mt-button type="primary" size="small">立即购买</mt-button> -->
        <mt-button type="primary" size="large" plain @click="godesc">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="gocomment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import swiper from "../commonvue/swiper.vue";
import { Toast } from "mint-ui";
import goodinfo_number from "../goods/goodinfo_number.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodInfo: {},
      circlePics: [],
      ballFlag: false,
      selectedcount: 1
    };
  },
  components: { swiper, number: goodinfo_number },
  created() {
    this.getRecyclePic();
    this.getgoodInfo();
  },
  methods: {
    Getselectedcount(count) {
      this.selectedcount = count;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badagePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xdist = badagePosition.left - ballPosition.left;
      const ydist = badagePosition.top - ballPosition.top;
      console.log(xdist + "/" + ydist);
      console.log("translate(" + xdist + "px," + ydist + "px)");
      el.style.transform = "translate(" + xdist + "px," + ydist + "px)";
      el.style.transition = "all 0.5s cubic-bezier(.38,1.35,.26,.33)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },

    addToShowCar() {
      var count = this.selectedcount;
      this.$store.state.car.forEach(el => {
        if (el.id == this.id) {
          count += el.count;
        }
      });

      if (count > this.goodInfo.stock_quantity) {
        Toast("已经到最大库存了，无法添加啦");
        return;
      }
      this.ballFlag = !this.ballFlag;
      var goodinfo = {
        id: this.id,
        count: this.selectedcount,
        price: this.goodInfo.sell_price,
        selected: true
      };
      this.$store.commit("addToCar", goodinfo);
    },
    gocomment() {
      console.log(this.id);
      this.$router.push({
        name: "goodinfocomment-route",
        params: { id: this.id }
      });
    },
    godesc() {
      console.log(this.id);
      // this.$router.push({name:'goodinfo-route',params:{id:id}});
      this.$router.push({
        name: "goodinfodesc-route",
        params: {
          desc: { title: this.goodInfo.title, descinfo: this.goodInfo.content }
        }
      });
    },
    getgoodInfo() {
      Axios.get(this.GLOBALVAR.urlhost + "/api/Goods/" + this.id).then(
        a => {
          if (a.data.stauts === 0) {
            this.goodInfo = a.data.message;
            console.log(this.goodInfo);
          }
        },
        e => {
          console.log(e);
        }
      );
    },
    getRecyclePic() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.circlePics = result.body.message;
            console.log(result.body.message);
            Toast("成功获取轮播图");
          } else {
            Toast(result);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  margin-bottom: 50px;
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin-bottom: 20px;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 378px;
    left: 140px;
    // transform: translate(99px,237px)
  }
}
.content {
  img {
    width: 100%;
  }
}
</style>
