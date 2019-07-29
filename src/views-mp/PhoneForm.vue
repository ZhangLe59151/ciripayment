<template>
  <div class="phone-form">
    <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        style="margin-top: 20px;"
    >
      <span class="label-title">Mobile Number</span>
      <el-form-item
          label-width="95px"
          style="width:80%;"
          prop="phone"
          :rules="[
            { required: true, message: 'Please enter a valid phone number', trigger: 'blur' },
            {pattern: phoneValidationPattern, message: 'Please enter a valid phone number', trigger: 'blur'}
          ]"
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
    <van-button
        size="large"
        class="bottom-btn"
        @click="handleNext"
    >
      Next
    </van-button>
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
import { mapState } from "vuex";

export default {
  name: "PhoneForm.vue",
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode"
    })
  },
  data() {
    return {
      show: false,
      form: {
        phone: "",
        nationalCode: "",
        applicantPhoneNumber: ""
      },
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      ls: window.localStorage
    };
  },
  created() {
    this.form.nationalCode = this.columns[0];
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
          this.$emit("sendOTP", true);
        } else {
          return false
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/bottom-btn.scss";
.phone-form {
  min-height: 200px;

  .bottom-btn {
    position: absolute;
    bottom: 10px;
    left: 0;
  }

  .label-title {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
