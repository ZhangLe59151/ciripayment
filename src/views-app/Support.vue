<template>
  <div class="app-support">
    <app-common-header :title="$t('Setting.support')" />
    <div class="feedback">
      <div class="feedback_title">
        {{ $t('Setting.feedbackTitle') }}
      </div>
      <div class="feedback_word">
        {{ $t('Setting.feedbackWord') }}
      </div>
    </div>

    <div class="label_title">{{ $t('Setting.emailTitle') }}</div>

    <van-field
      v-model="form.email"
      :placeholder="$t('Setting.emailPlaceholder')"
      @blur="validateEmail"
      class="form-value"
      :error="emailError"
    />

    <div class="label_title">{{ $t('Setting.message') }}</div>

    <van-field
      class="form-value textarea"
      v-model="form.message"
      type="textarea"
      maxlength="500"
      :placeholder="$t('Setting.messagePlaceholder')"
      rows="5"
      @input="descInput"
    />

    <div class="remain">{{remnant}}/500</div>

    <button
      class="submit_btn"
      @click="sendBtn"
    >{{ $t('Setting.sendEmail') }}</button>

  </div>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      login: true,
      remnant: 500,
      form: {
        email: "",
        message: ""
      },
      emailError: false
    };
  },
  methods: {
    descInput() {
      var txtVal = this.form.message.length;
      if (this.remnant == 0) {
        return false;
      }
      this.remnant = 500 - txtVal;
    },
    sendBtn() {
      this.$api.feedback(this.form).then(res => {
        this.$notify({
          message: this.$t('Setting.${res.data.code === 200 ? "sendSucceed" : "sendFailed"}'), background: "#04A777"});
      });
    },
    validateEmail() {
      this.emailError = this.$store.state.email.regExp.test(this.form.email) ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-support {
  margin: 0;
  position: relative;

  .feedback {
    background-color: #e9ebed;
    height: 184px;
    margin: 0;
    position: relative;

    .feedback_title {
      position: absolute;
      font-size: 24px;
      color: #2f3941;
      font-weight: bold;
      left: 16px;
      right: 16px;
      top: 20px;
    }

    .feedback_word {
      position: absolute;
      font-size: 16px;
      left: 16px;
      right: 16px;
      top: 96px;
      color: #1e1e1e;
      letter-spacing: 0;
      line-height: 24px;
    }
  }
}

.label_title {
  margin: 16px 16px 0 16px;
  height: 24px;
  font-size: 14px;
  color: #2f3941;
  letter-spacing: 0;
  line-height: 22px;
}

.form-value {
  padding: 0;
  width: 328px;
  left: 16px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #c2c8cc !important;

  &.textarea {
    right: 16px;
    height: 144px;
    letter-spacing: 0;
    line-height: 24px;
    font-size: 16px;
    color: #2f3941;
    border-bottom-color: #87929d;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    resize: none;
  }
}

.remain {
  margin: 8px 0 0 16px;
  font-size: 12px;
  color: #87929d;
  letter-spacing: 0;
}

.submit_btn {
  margin: 16px 16px 0 16px;
  border-radius: 4px;
  background-color: #ff8600;
  border: none;
  color: white;
  font-size: 16px;
  height: 40px;
  width: 90%;
}
</style>
