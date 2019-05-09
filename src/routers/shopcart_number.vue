
<template>
  <div :class="['mui-numbox','test'+index]" data-numbox-min="1" :data-numbox-max="this.max" style="height:25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      ref="number"
      @change="changeItem"
      :value="count"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../lib/mui/js/mui.min.js";
import {Toast} from 'mint-ui';
export default {
  methods: {
    changeItem() {
      console.log(
        "change：" +
          mui(".test" + this.index)
            .numbox()
            .getValue() +'/'+this.count
      );
     
      if(this.$refs.number.value>this.max){
        Toast("不能超过最大库存"+this.max);
        return;
      }

      this.$store.commit("MdfToCar", {
        id: this.id,
        count: mui(".test" + this.index)
          .numbox()
          .getValue()
      });
    }
  },
  mounted() {
    mui(".test" + this.index).numbox();
    console.log("max" +this.id+"/"+ this.max);
    // console.log("aa" + +'/'+this.id);
    // mui(".mui-numbox").numbox().setValue(this.$store.getters.GetGoodAmount(this.id));
    // console.log("aabb" +  mui(".mui-numbox").numbox().getValue());
  },
  watch:{
    'max':function(n,o){
          console.log('watch'+n+'/'+o);
        //   mui(".mui-numbox").numbox().setValue(n);---有时候无效，选择如下
        mui(".test" + this.index).numbox().setOption('max',n);
      }
  },
  data() {
    return {
      amount: 0
    };
  },
  created() {
    // this.amount = this.$store.getters.GetGoodAmount(this.id);
    // console.log(this.amount);
    console.log("aa" + "/" + this.id);
  },
  props: ["id", "count", "index", "max"]
};
</script>

<style lang="scss" scoped>
</style>
