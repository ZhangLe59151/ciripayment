<template>
  <div class="app-setting-list">
    <el-card class="box-card app-menu">
      Profile
      <img :src="nextIcon" alt @click="verifyIdentity">
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
    <el-dialog
      :visible="profileDialog"
      :before-close="handleClose"
      width="90%"
    >
      <div class="dialog-title">View Profile</div>
      <div class="dialog-des">
        Some information in the profile page may be sensitive. Please verify your identity to continue.
      </div>
      <div class="dialog-tip">
        Enter last 4 digits of your National ID
      </div>

      <van-password-input
        :value="nationalID"
        :length="4"
        :gutter="15"
        @focus="showKeyboard = true"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AppSettingList",
  data() {
    return {
      nextIcon: require("@/assets/imgs/next.svg"),
      profileDialog: false,
      nationalID: ""
    }
  },
  methods: {
    handleClose() {
      this.profileDialog = false;
    },
    verifyIdentity() {
      this.profileDialog = true;
    },
    handleNext() {
      this.$router.push({ name: "SettingsProfile" });
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

    .dialog-title {
      font-size: 24px;
      color: #000000;
      line-height: 36px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .dialog-des {
      font-size: 16px;
      color: #000000;
      margin-bottom: 20px;

    }

    .dialog-tip {
      font-size: 14px;
      color: #000000;
      margin-bottom: 20px;
    }
  }
</style>
