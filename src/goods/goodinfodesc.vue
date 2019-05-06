<template>
  <div class="container">
    <h3>{{this.goodinfo.title}}</h3>
    <div v-html="this.goodinfo.descinfo" class="descinfo"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodinfo: this.$route.params.desc
    };
  }
};
</script>

<style lang="scss" >
.container {
    padding: 4px;
  h3 {
    font-size: 13px;
    color: blue;
    text-align: center;
    margin: 15px 0;
  }

  .descinfo {
    h4 {
      font-size: 12px;
    }

    img {
      width: 100%;
    }
  }
}
</style>
