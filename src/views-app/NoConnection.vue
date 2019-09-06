<template>
  <div class="no-connection">
    <div class="offline-title">
      {{$t("Offline.title")}}
    </div>
    <img src="@/assets/imgs/authentication/noConnectionIcon.svg" />
    <div class="ins">
      {{$t("Offline.ins")}}
    </div>
    <van-button
      @click="refresh"
      class="refresh-btn">
      <i class="iconfont iconrefresh" />
      <div class="btn-text">
        {{$t("Offline.button")}}
      </div>
    </van-button>
  </div>
</template>

<script>
export default {
  name: "NoConnection",
  methods: {
    refresh() {
      this.$router.push({ name: "Home" });
    }
  }
}
</script>

<style lang="scss" scoped>
  .no-connection{
    text-align: center;
    padding: 100px 70px 0 70px;
    .offline-title{
      color: #2F3941;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 42px;
    }
    img {
      height: 63px;
      width:auto;
    }
    .ins {
      width: calc(100vw - 140px);
      font-size: 16px;
      margin-top: 32px;
      color: #68737D;
      margin-bottom: 20px;
    }
    .refresh-btn {
      background-color: #FFA702;
      color: #2F3941;
      font-size: 16px;
      height: 38px;
      width: 120px;
      line-height: 20px;
      padding-left: 0;
      padding-right: 0;
      i {
        display: inline-block;
      }
      .btn-text {
        font-size: 14px;
        display: inline-block;
        margin-left: 10%;
      }
    }

  }
</style>
