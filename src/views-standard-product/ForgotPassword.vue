<template>
  <div class="forgot-password">
    <van-nav-bar
      @click-right="$router.back()"
      :border="false"
    >
      <van-icon name="cross" slot="right" />
    </van-nav-bar>

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
          class="disabled-field"
          prop="phone"
        >
          <span
            slot="label"
          >
              <span
                style="margin: 0 10px;"
              >+66</span>
            <i class="el-icon-caret-bottom" style="color: #053C5E"></i>
          </span>
          <el-input
            v-model="form.phone"
            placeholder="08 1234 1234"
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
        :gutter="15"
        style="margin-left: -15px"
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
export default {
  name: "ForgotPassword",
  data() {
    return {
      showKeyboard: true,
      value: "",
      form: {},
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
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
    .disabled-field{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
      span {
        color: #c0c4cc;
      }
    }


  }

</style>
