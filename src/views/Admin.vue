<template>
  <div class="login-otp">

    <div class="tips">
      Silot Admin
    </div>

    <div class="otp">
      <div>Clear the application associated with this phone number</div>
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
          :rules="[
            { required: true, message: 'Please enter a valid phone number', trigger: 'blur' },
            {pattern: phoneValidationPattern, message: 'Please enter a valid phone number', trigger: 'blur'}
          ]"        >
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
            :maxlength="this.$store.state.phone.maxLen"
            :minlength="this.$store.state.phone.minLen"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <van-button
      size="large"
      class="bottom-btn-fixed"
      @click="handleNext"
    >
      Clear
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
  name: "login-otp",
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode"
    })
  },
  data() {
    return {
      show: false,
      form: {},
      phoneValidationPattern: this.$store.state.phone.thaiExp
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
          this.$api
            .deleteApplication({
              phoneNumber: this.form.nationalCode + this.form.phone
            })
            .then(res => {
              if (res.data.code === 200) {
                var msg = "clear application count: " + res.data.data.count;
                this.$toast(msg);
              } else {
                this.$toast(res.data.msg);
              }
            });
        } else {
          return false;
        }
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
  .login-otp {
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
    font-size: 30px;
    padding: 20px;
    font-weight: bold;
    color: #ff0000;
  }

  .otp {
    text-align: left;
    padding: 0 10%;
    font-size: 15px;
  }

}
</style>
