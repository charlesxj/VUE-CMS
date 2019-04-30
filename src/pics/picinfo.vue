<template>
  <div class="picinfo-container">
    <h3>{{picinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{picinfo.add_time|dateFormat111}}</span>
      <span>点击次数：{{picinfo.click}}</span>
    </p>
    <hr>
    <div class="picinfo-thumb">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="picinfo.zhaiyao"></div>
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import Axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      picinfo: {},
      slide1: [
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ]
    };
  },
  components: {
    "cmt-box": comment
  },
  created() {
    this.getphotoinfo();

    console.log(this.picinfo);
  },
  methods: {
    handleClose() {
      console.log("close");
    },
    getphotoinfo() {
      Axios.get(this.GLOBALVAR.urlhost + "/api/ImgInfo/" + this.id).then(
        a => {
          if (a.data.status === 0) {
            this.picinfo = a.data.message[0];
          }
        },
        e => {}
      );
    }
  }
};
</script>

<style lang="scss" >
.picinfo-container {
  margin-bottom: 50px;
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
     clear: both;
    font-size: 14px;
    text-indent: 2em;
  }
  .picinfo-thumb {
    margin: 10px;
    box-shadow: 0 0 8px #999;
    figure {
       margin: 0 50px ;
       padding: 0;
      float: left;
     text-align: center;
    }
  }
}
</style>
