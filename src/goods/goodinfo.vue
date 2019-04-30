<template>
  <div class="goodsinfo-container">
    <!-- <h3 class="title">{{this.goodInfo.title}}</h3>
        <p class="content" v-html="this.goodInfo.content">
           
    </p>-->

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
                市场价:<del>￥2399</del> &nbsp;&nbsp;销售价:<span class="price-now">￥2199</span>
            </p>
            <p>购买数量:</p>
        </div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>

    <!-- 商品详情 -->

    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import swiper from "../commonvue/swiper.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodInfo: {},
      circlePics:[]
    };
  },
  components:{swiper},
  created() {
    this.getRecyclePic();
    this.getgoodInfo();    
  },
  methods: {
    getgoodInfo() {
      Axios.get(this.GLOBALVAR.urlhost + "/api/Goods/" + this.id).then(
        a => {
          if (a.data.stauts === 0) {
            this.goodInfo = a.data.message;
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

<style lang="scss" >
.goodsinfo-container {
  background-color: #eee;  
  overflow: hidden;
}
.content {
  img {
    width: 100%;
  }
}
</style>
