<template>
  <div class="app-lucky-header">
    <van-icon name="cross" class="close" @click="returnHome"/>
    <div class="date">{{date}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ")
    };
  },
  methods: {
    returnHome() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-lucky-header {
  height: 90px;
  position: relative;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #ffffff;
  }

  .date {
    position: absolute;
    bottom: 13px;
    left: 16px;
    font-family: HelveticaNeue;
    font-size: 24px;
    color: #ffffff;
  }
}
</style>
