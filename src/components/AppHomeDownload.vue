<template>
  <div class="app-home-download">
    <div class="cnt">
      Enjoy a better financial management experience with the Merchant Portal app.
    </div>
    <div class="imgs">
      <img :src="require('@/assets/imgs/appstore.png')">
      <img :src="require('@/assets/imgs/google.png')">
    </div>
  </div>
</template>


<style lang="scss" scoped>
.app-home-download {
  width: calc(100% - 60px);
  margin: 0 16px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(160, 180, 192, 0.2);
  border-radius: 4px;
  padding: 14px;
  position: relative;
  top: -60px;

  .cnt {
    font-size: 16px;
    color: #2f3941;
    letter-spacing: 0;
  }

  .imgs {
    margin-top: 10px;
    img {
      height: 26px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
