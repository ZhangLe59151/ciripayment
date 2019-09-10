<template>
  <div class="appMerchantList">
    <div class="title">Merchants Similar To You</div>
    <div class="card" @click="viewDetail">
      <img class="imgBox" src="" />
      <div class="imgTitle">Little Thaus Co.</div>
      <div class="descriptText"><span class="iconfont iconsociallikeoutline" />128 Likes</div>
      <div class="descriptText"><span class="iconfont iconretail" />Retail Business</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appMerchantList",
  methods: {
    viewDetail() {
      //this.$emit('childByValue', true)
      this.$router.push({ name: "SocialMerchantDetailPage" });
    }
  }
};
</script>

<style lang="scss" scoped>
.appMerchantList {
  height: 200px;
  width: 100%;
  background-color: #EBE9ED;

  .title {
    margin: 16px 16px 0 16px;
    font-size: 14px;
    color: black;
  }
  
  .card {
    margin: 10px 16px 4px 16px;
    border-radius: 4px;
    height: 191px;
    width: 160px;
    background-color: white;

    .imgBox {
      border-radius: 4px;
      height: 120px;
      width: 100%;
      background-color: #A0B4C0;
    }

    .imgTitle {
      color: #2F3941;
      font-size: 14px;
      font-weight: bolder;
      margin: 3px 13px 0 3px;
    }

    .descriptText {
      color: #87929D;
      font-size: 12px;
      margin: 3px 3px 0 3px;
    }
  }

}
</style>
