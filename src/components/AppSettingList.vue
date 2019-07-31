<template>
  <div class="app-setting-list">
    <el-card class="box-card app-menu">
      Profile
    </el-card>

    <el-card class="box-card app-menu">
      Currency
      <el-divider></el-divider>
      Language
    </el-card>

    <el-card class="box-card app-menu">
      Change Password
    </el-card>

    <el-card class="box-card app-menu">
      Terms & Conditions
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AppSettingList"
}
</script>

<style lang="scss" scoped>
  .app-setting-list {
    margin: 10px 0;
    position: relative;
    .app-menu {
      margin: 10px 0;
      font-size: 14px;
    }
  }
</style>
