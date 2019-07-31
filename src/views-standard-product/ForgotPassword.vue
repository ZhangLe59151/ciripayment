<template>
  <div class="forgot-password">
    <WapHeader :right="true" />
    <div class="forgotWrapper">
      <div class="forgot-title">
        Forgot Password
      </div>

      <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        style="margin-top: 15px;"
      >
        <el-form-item
          label-width="80px"
          class="forgotpassword"
          prop="phone"
        >
          <span
            slot="label"
          >
              <span
                style="margin: 0 10px;"
              >{{form.nationalCode}}</span>
            <i class="el-icon-caret-bottom" style="color: #929292"></i>
          </span>
          <el-input
            v-model="form.phone"
            placeholder=""
            :maxlength="this.$store.state.phone.maxLen"
            :minlength="this.$store.state.phone.minLen"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="sub">
        Please verify your identity to reset your password.
      </div>

      <div class="instruction">
        Enter last 4 digits of your National ID
      </div>
      <van-password-input
        :value="value"
        info
        @focus="showKeyboard = true"
        :mask="false"
        :length="4"
        style="margin-left: -15px; color : #929292"
      />

    </div>

    <!--    <div class="page">3/3</div>-->
    <!--    &lt;!&ndash; 数字键盘 &ndash;&gt;-->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import WapHeader from "@/components/WapHeader";

export default {
  name: "ForgotPassword",
  components: {
    WapHeader
  },
  data() {
    return {
      showKeyboard: true,
      value: "",
      form: {}
    };
  },
  watch: {
    value() {
      if (this.value.length === 4) {
        this.$api.checkNationID(this.value).then(res => {
          if (res.data.code === 200 && res.data.data.same) {
            this.$router.push({ name: "ResetPasswordSP" })
          } else {
            //FIXME: not implemented yet, the api return when error
            this.$toast(res.data.msg);
          }
        })
      }
    }
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  created() {
    // Reset form content to clear previous submitted information
    this.$store.commit("InitForm");
    const form = Object.assign({}, this.$store.state.form);
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.form = Object.assign({}, form);
  }
}
</script>

<style lang="scss" scoped>
  .forgotWrapper{
    padding: 5%;
    padding: 5%;
    .forgot-title{
      font-size: 24px;
      font-weight: bold;
      margin-top:50px;
      margin-bottom: 25px;
    }
    .sub{
      margin-bottom: 25px;
      color: #2F3941;
    }
    .instruction{
      color: #2F3941;
      margin-bottom: 10px;
    }

  }

</style>
