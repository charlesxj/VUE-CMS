<template>
  <div class="cmt-container">
    <h3>发布评论</h3>
    <br>
    <textarea placeholder="请输入评论内容(不超过120字)" maxlength="120" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="AddCommentInfo">发布评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments " :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼 &nbsp;&nbsp;用户：{{item.user_name}} &nbsp;&nbsp;&nbsp;发布时间:{{item.add_time|dateFormat111}}</div>
        <div class="cmt-body">{{(item.content.trim().length<1) ? "此用户很懒，没有留言":item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="GetCommentInfo">更多</mt-button>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      content: ""
    };
  },
  created() {
    this.GetCommentInfo();
  },
  methods: {
    AddCommentInfo() {
      if (this.content.trim().length < 1) {
        Toast("评论后才能发表哦~");
        return;
      }
      var FormParams = {
        belongId: this.id,
        content: this.content,
        user_name: "匿名啦"
      };
      console.log(this.content);
      axios.post(this.GLOBALVAR.urlhost + "/api/comments/", FormParams).then(
        a => {
          Toast("评论成功");
          this.comments.unshift(FormParams);
          this.content = "";
        },
        e => {
          Toast("评论失败");
        }
      );
    },
    GetCommentInfo() {
      axios
        .get(
          this.GLOBALVAR.urlhost +
            "/api/comments/" +
            this.id +
            "?pageindex=" +
            this.pageindex
        )
        .then(
          a => {
            if (a.data.status === 0) {
              if (a.data.message.length < 1) {
                Toast("到底啦~~");
              } else {
                this.comments = this.comments.concat(a.data.message);
                this.pageindex++;
              }
            }
          },
          e => {
            console.log(e);
          }
        );
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
        min-height: 35px;
      }
    }
  }
}
</style>
