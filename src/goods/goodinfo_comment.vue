<template>
  <div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
export default {
  components: {
    comment
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
