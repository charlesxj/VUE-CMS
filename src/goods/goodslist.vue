<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodlist"
      :key="item.id"
      :to="'/home/goodinfo/'+item.id"
      tag="div"
    >
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥ {{item.sell_price}}</span>
          <span class="old">¥ {{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->

    <div
      class="goods-item"
      v-for="item in goodlist"
      :key="item.id"
      :to="'/home/goodinfo/'+item.id"
      @click="gotoSub(item.id)"
    >
      <img :src="item.img_url" alt>
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥ {{item.sell_price}}</span>
          <span class="old">¥ {{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getgoodlists()">加载更多</mt-button>
    <!-- <div class="goods-item">
      <img
        src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/16130/39/12690/305219/5caac12aEbb843fa5/ce6c1dee969fb626.jpg"
        alt
      >
      <h1 class="title">小米9 4800万超广角三摄 8GB+128GB全息幻彩蓝 骁龙855 全网通4G 双卡双待</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥ 3299.00</span>
          <span class="old">¥ 3399.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余60件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img
        src="https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/34035/40/4769/95681/5cb83cf9E1c52fc02/13a29cecb97cd4ab.jpg!q80.dpg.webp"
        alt
      >
      <h1 class="title">OPPO Reno 全面屏拍照手机 6G+256G 雾海绿 全网通 移动联通电信 双卡双待手机
关注Reno新品首发，享12期免息+N6蓝牙音箱+京东180天只换不修服务，隐藏式摄像头，4800万像素，闪充3.0，屏下指纹</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥ 3299.00</span>
          <span class="old">¥ 3399.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余60件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img
        src="https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/4398/28/6190/281470/5ba1ee9bE38ae264d/19f155adacf55419.jpg!q80.dpg.webp"
        alt
      >
      <h1 class="title">小米8屏幕指纹版 8GB+128GB 暮光金 全网通4G 骁龙845 双卡双待 全面屏拍照游戏智能手机</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥ 3299.00</span>
          <span class="old">¥ 3399.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余60件</span>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
import Axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      goodlist: []
    };
  },
  created() {
    console.log("开始啦");
    this.getgoodlists();
  },
  methods: {
    gotoSub(id) {
      // this.$router.push('/home/goodinfo/'+id);
      // this.$router.push({path:'/home/goodinfo/'+id});
      // this.$router.push({path:'/home/goodinfo',query:{id:id}})
      this.$router.push({name:'goodinfo-route',params:{id:id}});
    },
    getgoodlists() {
      Axios.get(
        this.GLOBALVAR.urlhost + "/api/Goods?pageindex=" + this.pageindex
      ).then(
        a => {
          console.log(a);
          if (a.data.stauts === 0) {
            console.log(a.data.message);
            if (a.data.message.length < 1) {
              Toast("没有数据啦");
            }
            this.goodlist = this.goodlist.concat(a.data.message);
            this.pageindex++;
          }
        },
        e => {
          console.log("error");
          console.log(e);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  margin-bottom: 50px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      p {
        margin: 0;
        padding: 5px;
      }
      background-color: #ccc;
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
