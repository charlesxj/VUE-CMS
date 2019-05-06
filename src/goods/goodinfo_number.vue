
<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="this.max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChangeed" ref="number">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../lib/mui/js/mui.min.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods:{
      countChangeed(){
          this.$emit('Getselectedcount',parseInt(this.$refs.number.value));
      }
  },
  watch:{
      'max':function(n,o){
          console.log(n+'/'+o);
        //   mui(".mui-numbox").numbox().setValue(n);---有时候无效，选择如下
        mui(".mui-numbox").numbox().setOption('max',n);
      }
  },
  props:['max']
};
</script>

<style lang="scss" scoped>
</style>
