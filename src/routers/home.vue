
<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in circlePics" :key="item.id">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      circlePics: []
    };
  },
  created() {
    this.getRecyclePic();
  },
  methods: {
    getRecyclePic() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.circlePics = result.body.message;
            console.log(result.body.message);
            Toast("成功获取轮播图");
          }else{
              Toast(result);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: cadetblue;
    // }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
