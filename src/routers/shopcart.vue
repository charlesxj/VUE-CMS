
<template>
  <div class="goodcar-container">
    <!-- 列表区域 -->
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner goodshow" v-for="(item,index) in goods" :key="item.id">
            <mt-switch v-model="$store.getters.GetSeletedStauts[item.id]" 
                       @change="changeSeleted(item.id,$store.getters.GetSeletedStauts[item.id])"></mt-switch>
            <img :src="item.img_url">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <goodinfonumber :count="item.count" :id="item.id" :index="index" :max="item.stock_quantity"></goodinfonumber>
                <a href="#" @click="deleteitem(item.id)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="goodBy">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner balance">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class='red'> {{this.$store.getters.GetTotalAmount.total}} </span>件，总价 ￥<span class='red'> {{this.$store.getters.GetTotalAmount.prices}} </span></p>
            </div>
            <mt-button type="danger" >结算</mt-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodinfonumber from "../routers/shopcart_number.vue";
import Axios from "axios";
export default {
  components: { goodinfonumber },
  data() {
    return {
      goods: []
    };
  },
  computed: {
    cartinfos() {
      return this.$store.state.car;
    }
  },
  methods: {
    changeSeleted(id,flag){
      console.log('flag'+flag);
      this.$store.commit('updateSelected',{id:id,selected:flag})
    },
    deleteitem(id) {
      this.$store.commit("deleteCartItem", id);
      this.goods = this.goods.filter(a => {
        return a.id != id;
      });
    },
    GetCartInfos() {
      // console.log("store");
      // console.log(this.$store.state);
      // console.log(this.$store.state.car);

      // var idArr = [];
      // this.$store.state.car.forEach(a => {
      //   idArr.push(item.id);
      // });
      // console.log(idArr);

      // // if (this.$store.state.car.length < 1) {
      // //   return false;
      // // }

      // var ids = "";
      // this.cartinfos.forEach(el => {
      //   ids = ids + "," + el.id;
      // });
      // ids = ids.substring(1);
      var idArr = [];
      //  console.log(this.$store.state);
      // console.log(this.$store.state.car);
      var tt = JSON.parse(localStorage.getItem("car"));
      tt.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length < 1) {
        return;
      }
      var ids = idArr.join(",");

      Axios.get(
        this.GLOBALVAR.urlhost + "/api/Goods?pageindex=-1&ids=" + ids
      ).then(
        a => {
          if (a.data.stauts === 0) {
            a.data.message.forEach(a1 => {
              // tt.some(b => {
              this.cartinfos.some(b => {
                if (a1.id == b.id) {
                  a1.count = b.count;
                  a1.selected = b.selected;
                }
              });
            });
            this.goods = a.data.message;
            console.log(this.goods);
          }
        },
        e => {
          console.log(e);
        }
      );
    }
  },
  mounted() {
    console.log("created");
    this.GetCartInfos();
  }
};
</script>

<style lang="scss" scoped>
.goodcar-container {
  background-color: #ccc;
  overflow: hidden;
  .goods-list {
    h1 {
      font-size: 13px;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
      p {
        margin: 0 0;
      }
    }
    .goodshow {
      display: flex;
      align-items: center;
      // align-content:center;
    }
  }
}

.balance{
  display:flex;
  align-items: center;
  justify-content: space-between;
  .red{
    color:red;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
