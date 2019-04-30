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
export default {
    data(){
        return{

        }
    },
    props:['circlePics']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
      text-align: center;
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
