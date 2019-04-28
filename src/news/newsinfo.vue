<template>
  <div class="newinfo-container">
    <h3 class="title">{{newinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newinfo.add_time|dateFormat111}}</span>
      <span>点击：{{newinfo.click}}次</span>
    </p>
    <div class="content" v-html="newinfo.zhaiyao"></div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import axios from "axios";
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      newinfo:{}
    };
  },
  mounted() {
    this.GetNewsInfo();
  },
  components:{
    'comment-box':comment
  },
  methods: {
    GetNewsInfo() {
      axios.get(this.GLOBALVAR.urlhost+"/api/values/" + this.id).then(
        a => {
          if(a.data.status===0){
            console.log(a.data.message);
            this.newinfo=a.data.message;
          }else{
            console.log(a);
          }
        },
        e => {
          console.log(e);
        }
      );
    }
  }
};
</script>

<style lang="scss" >
.newinfo-container {
  margin-bottom:55px;
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .content{
    img{
      width: 70%;
      height: 70%;
    }
  }
}
</style>
