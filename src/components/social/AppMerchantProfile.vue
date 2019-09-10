<template>
  <div class="appMerchantProfile">
    <img class="bigImg" />
    <div class="merchantTitle">Gaggan Bangkok</div>
    <van-row>
      <van-col span="12" class="spanBox" >Resaurant</van-col>
      <van-col span="12" class="spanBox" >888 Likes</van-col>
    </van-row>
    <div class="imgTitle">{{ $t('Social.myPhoto') }}</div>
    <van-row>
      <img class="imgBox" />
      <img class="imgBox" />
      <img class="imgBox" />
    </van-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "appMerchantProfile",

  computed: {
    ...mapState({
      isLogin: "OTPVerified"
    })
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.appMerchantProfile {
  position: relative;
  height: 419px;
  width: 100%;
  background-color: white;

  .bigImg{
    height: 199px;
    width: 360px;
  }

  .merchantTitle {
    color: black;
    font-size: 16px;
    max-height: 19px;
    text-align: center;
    font-weight: bolder;
  }

  .spanBox {
    margin: 30px 0 0 0;
    width: 50%;
    height: 40px;
    border: 1px solid #EFF6FF;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #87929D;
  }

  .imgTitle {
    color: #2F3941;
    font-size: 14px;
    margin: 10px 16px 0 16px;
  }

  .imgBox {
    height: 80px;
    width: 80px;
    margin: 10px 0 0 16px;
    background-color: #87929D;
    border-radius: 4px;
  }

}
</style>
