<template>
  <div class="app-container">
    <mt-header fixed title="vue 项目">
      <span slot="left" @click="goBack" v-show="this.flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-lib" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/member">
        <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/shopcart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{this.$store.getters.GetAmount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    goBack() {
      console.log(this.$router);
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  watch: {
    "$route.path": function(n, o) {
      if (n === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  z-index: 99;
}
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
  // position:absolute;
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

// .mui-tab-tab .mui-tab-item-lib.mui-active {
//   color: #007aff;
// }

// .mui-tab-tab .mui-tab-item-lib {
//   display: table-cell;
//   overflow: hidden;
//   width: 1%;
//   height: 50px;
//   text-align: center;
//   vertical-align: middle;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   color: #929292;
// }

// .mui-tab-tab .mui-tab-item-lib .mui-icon {
//   top: 3px;
//   width: 24px;
//   height: 24px;
//   padding-top: 0;
//   padding-bottom: 0;
// }

// .mui-tab-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
//   font-size:11px;
// 	display: block;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// }
.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-lib {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-lib .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-lib .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
