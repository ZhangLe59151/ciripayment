<template>
  <div class="send-otp">
    <van-nav-bar
      title
      left-text="Back"
      right-text="Cancel"
      left-arrow
      @click-left="$router.back()"
      @click-right="handleCancel"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        <span><b>New Application</b></span>
      </div>
    </van-nav-bar>

    <div class="tips">
      Enter your mobile
      number to get started
    </div>

    <div class="otp">
      <div>A one-time password (OTP) will be sent to verify your number.</div>
      <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        style="margin-top: 20px;"
      >
        <el-form-item
          label-width="95px"
          style="width:80%;"
          prop="phone"
          :rules="[{ required: true, message: 'Please enter a valid phone number', trigger: 'blur' },{pattern: phoneValidationPattern, message: 'Please enter a valid phone number', trigger: 'blur'}]"
        >
          <span
            slot="label"
            @click="show = true"
          >
            <van-icon name="phone-o" />
            <span style="margin:0 5px;">{{form.nationalCode}}</span>
            <van-icon name="arrow-down" />
          </span>
          <el-input
            v-model="form.phone"
            placeholder="Mobile number"
            class="input"
            :maxlength="this.$store.state.phone.maxLen"
            :minlength="this.$store.state.phone.minLen"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <van-button
      size="large"
      class="bottom-btn"
      @click="handleNext"
    >
      Next
    </van-button>
    <div class="page">3/3</div>
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-picker
        show-toolbar
        title="National code"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import util from "@/util.js";
import { mapState } from "vuex";
import { find } from "lodash";

export default {
  name: "send-otp",
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode"
    })
  },
  data() {
    return {
      active: 2,
      show: false,
      form: {
        phone: "",
        nationalCode: "",
        applicantPhoneNumber: ""
      },
      ls: window.localStorage,
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      stepperActive: require("@/assets/imgs/stepper_active.png")
    };
  },
  methods: {
    setPattern(nationalCode) {
      const item = this.nationCode.find(test => test.code === nationalCode);
      const expName = item ? item.nation + "Exp" : "sgExp";
      if (this.$store.state.phone[expName] !== undefined) {
        this.phoneValidationPattern = this.$store.state.phone[expName];
      } else {
        this.phoneValidationPattern = this.$store.state.phone.sgExp;
      }
    },
    onConfirm(value, index) {
      this.form.nationalCode = value;
      this.setPattern(value);
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    handleNext() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.$store.commit("UpdateForm", {
            applicantPhoneNumber: this.form.nationalCode + this.form.phone,
            nationalCode: this.form.nationalCode,
            phone: this.form.phone
          });
          this.sendOtp();
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$store.commit("ClearForm");
      util.redirectToHome(this);
    },
    sendOtp() {
      this.$api
        .sendOtp({
          phoneNumber: this.form.nationalCode + this.form.phone
        })
        .then(res => {
          if (res.data.code !== 200) {
            this.$notify(
              res.data.code === 10003 ? this.$t("OTPErrorMsg") : res.data.msg
            );
            return;
          }
          this.$router.push({ name: "VerifyOtp" });
        });
    }
  },
  created() {
    this.form.nationalCode = this.columns[0];
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.send-otp {
  text-align: center;

  .steps {
    text-align: left;
    width: 80%;
    margin-left: 10%;
  }
  .title {
    font-size: 20px;
    padding: 20px;
  }
  .tips {
    font-size: 27px;
    padding: 20px;
  }

  .otp {
    text-align: left;
    padding: 0 10%;
    font-size: 15px;
  }

  .page {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 20px;
  }
}
</style>
