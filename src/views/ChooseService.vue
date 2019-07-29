<template>
  <div class="choose-service">
    <van-nav-bar
      title
      left-text="Back"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        <span><b>New Application</b></span>
      </div>
    </van-nav-bar>
    <div class="title">BUSINESS BANKING</div>
    <div class="tips">
      What service are you <br>
      applying for?
    </div>
    <div class="description">You may select more than one.</div>

    <el-checkbox-group
      v-model="checkList"
      style="text-align: left;margin-top: 20px;"
    >
      <el-checkbox
        label="0"
        style="margin-left: 15%;padding: 10px 0;width: 70%;position: relative;"
      >Payment Service(s)</el-checkbox>
      <div class="line"></div>
      <el-checkbox
        label="1"
        style="margin-left: 15%;padding: 10px 0;width: 70%;position: relative;"
      >Maketing Service(s)</el-checkbox>
    </el-checkbox-group>

    <van-button
      size="large"
      class="bottom-btn"
      @click="handleNext"
    >
      Next
    </van-button>
    <div class="powered">
      <img :src="logo">
      <div>Powered by Silot AI</div>
    </div>

    <van-dialog
      v-model="dialog"
      :showConfirmButton="false"
    >
      <div class="dialog-title">Do you need to open a business account?</div>
      <div class="dialog-des">
        <i class="el-icon-warning"></i>
        <span>You cannot withdraw your earnings if you do not have an ABC Bank business account.</span>
      </div>

      <van-button
        class="bottom-btn-boxed"
        @click="handleDialogConfirm"
      >
        Yes,I Need An Account
      </van-button>

      <van-button
        class="bottom-btn-boxed btn-cancel"
        @click="handleDialogCancel"
      >
        No, Proceed
      </van-button>

    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "ChooseService",
  data() {
    return {
      logo: require("@/assets/imgs/logo.png"),
      form: {},
      checkList: [],
      dialog: false
    };
  },
  methods: {
    handleDialogConfirm() {
      this.dialog = false;
      this.checkList = ["0"];
      this.handleAfterDialog();
    },
    handleDialogCancel() {
      this.dialog = false;
      this.checkList = ["0"];
      this.handleAfterDialog();
    },

    handleAfterDialog() {
      this.$store.commit("InitForm");
      this.$store.commit("UpdateForm", {
        serviceType: this.checkList.join(",")
      });
      console.log(this.$store.state.form.serviceType);
      this.$router.push({
        name: "SendOtp"
      });
    },

    handleNext() {
      if (this.checkList.length === 0) {
        this.$notify(this.$t("noSelectServiceErrorMsg"));
        return false;
      }
      if (!this.checkList.includes("1")) {
        this.dialog = true;
        return false;
      }

      this.$store.commit("InitForm");
      this.$store.commit("UpdateForm", {
        serviceType: this.checkList.join(",")
      });
      console.log(this.$store.state.form.serviceType);
      this.$router.push({
        name: "SendOtp"
      });
    }
  },
  created() {
    // Reset form content to clear previous submitted information
    this.$store.commit("ClearForm");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.choose-service {
  text-align: center;
  .line {
    width: 70%;
    margin-left: 15%;
    height: 1px;
    background-color: #979797;
  }
  .description {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    text-align: center;
  }
  .close {
    text-align: right;
    padding: 10px 10px 0 0;
  }
  .title {
    font-size: 13px;
    padding: 0 20px;
    background-color: #053c5e;
    color: #d8d8d8;
    border: 1px solid #979797;
    vertical-align: middle;
    height: 48px;
    line-height: 48px;
  }
  .tips {
    font-size: 31px;
    padding: 54px 24px 30px;
  }
  .sign-tips {
    text-align: center;
    color: #000;
    font-size: 15px;
    margin-top: 30px;

    .login-link {
      display: block;
      color: #000;
      text-decoration: underline;
    }
  }
  .powered {
    width: 150px;
    height: 22px;
    margin: 50px auto 0;
    div {
      display: block;
      float: left;
      margin-left: 10px;
      height: 22px;
      color: #929292;
      font-size: 11px;
      line-height: 22px;
    }
    img {
      width: 22px;
      display: block;
      float: left;
    }
  }

  .dialog-title {
    font-size: 24px;
    color: #000000;
    letter-spacing: 0;
    margin-top: 10px;
    padding: 0 10px;
  }

  .dialog-des {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    width: 80%;
    margin-left: 10%;
    text-align: left;
    margin-top: 10px;
    > i {
      color: #fcaa10;
      display: inline-block;
      margin-right: 2px;
    }
  }
}
</style>

<style lang="scss">
// modify the checkbox's color;
.choose-service {
  .el-checkbox__input {
    position: absolute;
    right: 10px;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #04a777;
    border-color: #04a777;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000000;
    font-weight: bold;
  }

  .el-checkbox__inner:hover {
    border-color: #04a777;
  }
}
</style>
