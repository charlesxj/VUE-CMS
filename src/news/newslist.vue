
<template>
  <div class="middlediv">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="imgUrl+item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发布时间：{{ item.add_time | dateFormat111 }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { FormatDate } from "../commonjs/filter.js";
import { Toast } from "mint-ui";

import axios from "axios";
export default {
  data() {
    return {
      newslist: [],
      imgUrl: this.GLOBALVAR.urlhost
    };
  },
  filters: {
    dd: function(value){
        console.log("dd~");
        return FormatDate(value);
    },
    dateFilter: function(value, fmt = "yyyy-MM-dd hh:mm:ss") {
      var that = new Date(Date.parse(value));
      var o = {
        "M+": that.getMonth() + 1, //月份
        "d+": that.getDate(), //日
        "h+": that.getHours(), //小时
        "m+": that.getMinutes(), //分
        "s+": that.getSeconds(), //秒
        "q+": Math.floor((that.getMonth() + 3) / 3), //季度
        S: that.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (that.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {       
      var _this = this;
      axios.get(this.GLOBALVAR.urlhost+"/api/values").then(
        function(res) {
          if (res.data.status === 0) {
            console.log(res.data.message);
            _this.newslist = res.data.message;
          }
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  h1 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
    padding-top: 2px;
  }
}
.middlediv {
  margin-bottom: 50px;
}
</style>
