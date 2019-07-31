<template>
  <div class="app-setting-list">
    <el-card class="box-card app-menu">
      Profile
      <img :src="nextIcon" alt>
    </el-card>

    <el-card class="box-card app-menu">
      Currency
      <div class="preview-value">
        THB
      </div>
      <img :src="nextIcon" alt>
      <el-divider></el-divider>
      Language
      <div class="preview-value">
        English
      </div>
      <img :src="nextIcon" alt>
    </el-card>

    <el-card class="box-card app-menu">
      Change Password
      <img :src="nextIcon" alt>
    </el-card>

    <el-card class="box-card app-menu">
      Terms & Conditions
      <img :src="nextIcon" alt>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AppSettingList",
  data() {
    return {
      nextIcon: require("@/assets/imgs/next.svg")
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-setting-list {
    margin: 10px 0;
    position: relative;
    .app-menu {
      margin: 10px 0;
      font-size: 14px;
      img {
        position: absolute;
        right: 30px;
      }

      .preview-value {
        position: absolute;
        right: 50px;
        display: inline-block;
        color: #87929D;
      }
    }
  }
</style>
