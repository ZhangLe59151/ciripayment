<template>
  <div class="app-support">
    <app-common-header title="Support" />
    <div class="feedback">
      <div class="feedback_title">
        Got feedback or
        experiencing problems?
      </div>
      <div class="feedback_word">
        Drop us a message and our customer
        support representatives will be happy to
        assist you!
      </div>
    </div>

    <div class="label_title">Your Email</div>

    <van-field
      v-model="form.email"
      placeholder="email@domain.com"
      class="form-value"
    />

    <div class="label_title">Your Message</div>

    <van-field
      class="form-value textarea"
      v-model="form.message"
      type="textarea"
      maxlength="500"
      placeholder="Describe your problem or feedback"
      rows="5"
      @input="descInput"
    />

    <div class="remain">{{remnant}}/500</div>

    <button
      class="submit_btn"
      @click="sendBtn"
    >Submit</button>

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
      }
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
        debugger;
        if (res.data.code === 200) {
          this.$notify({ message: "Sent Sucessfully", background: "#04A777" });
        } else {
          this.$notify({ message: "Failed to send", background: "#04A777" });
        }
      });
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
