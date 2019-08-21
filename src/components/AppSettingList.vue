<template>
  <div class="app-setting-list">

    <!-- <van-cell-group>
      <van-cell
        title="Profile"
        is-link
        @click="verifyIdentity"
        value=""
      />
    </van-cell-group> -->

    <van-cell-group>
      <van-cell
        title="Language"
        is-link
        value="English"
        :to="{name: 'LanguageSelect'}"
      />
      <van-cell
        title="Terms & Conditions"
        is-link
        value=""
        :to="{name: 'TermsAndConditions'}"
      />
      <van-cell
        title="Support"
        is-link
        value=""
        :to="{name: 'Support'}"
      />
    </van-cell-group>

    <van-cell-group v-if="false && this.$store.state.userInfo.accountVerified">
      <van-cell
        title="Change Password"
        is-link
        value=""
        :to="{name: 'ForgotPasswordSP'}"
      />
    </van-cell-group>

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
        :value="value"
        :length="4"
        :gutter="15"
        @focus="showKeyboard = true"
        style="margin-left: -15px ; color : #929292;"
      />
    </el-dialog>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
export default {
  name: "AppSettingList",
  data() {
    return {
      profileDialog: false,
      showKeyboard: false,
      value: "",
      login: true
    };
  },
  methods: {
    handleClose() {
      this.value = "";
      this.profileDialog = false;
      this.showKeyboard = false;
    },
    verifyIdentity() {
      this.$api.getApplictionStatus().then(res => {
        if (res.data.code === 200) {
          this.profileDialog = true;
          this.showKeyboard = true;
        } else {
          this.$router.push({
            name: "Profile",
            query: { applicationStatus: "no" }
            // 'no' means the user does not have an application.
          });
        }
      });
    },

    onInput(key) {
      this.value = (this.value + key).slice(0, 4);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    checkNationalId(val) {
      this.$api.checkNationId({ nationalId: val }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.same == true) {
            this.$router.push({ name: "Profile" });
          } else {
            this.$toast("The national id is wrong.");
            this.handleClose();
          }
        }
      });
    }
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (val.length === 4) {
          this.checkNationalId(val);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-setting-list {
  margin: 10px 0;
  position: relative;

  .dialog-title {
    font-size: 24px;
    color: #000000;
    line-height: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .van-cell-group {
    margin-top: 20px;
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
  .van-number-keyboard {
    z-index: 3001 !important;
  }
}

.setting_title {
  margin: 16px 16px 4px 16px;
  font-size: 12px;
  font-weight: bolder;
  color: #2F3941;
}
</style>

<style lang="scss" >
.app-setting-list {
  .van-password-input__security {
    height: 40px;

    li {
      font-size: 14px;
      color: #87929d;
      letter-spacing: 0;
      text-align: center;
      border: 1px solid #c8c8c8;
      height: 40px;
      line-height: 40px;
      width: 40px;
      flex: none;
      margin-right: 10px;
      border-radius: 4px;
    }
  }

  .van-password-input__security::after {
    border: none;
  }
}
</style>
