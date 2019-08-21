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
      v-model="email" 
      placeholder="email@domain.com" />

    <div class="label_title">Your Message</div>

    <textarea 
      class="textarea"
      maxlength="200" 
      @input="descInput" 
      v-model="desc"
      placeholder="Describe your problem or feedback" />

    <div>{{remnant}}/500</div>

  </div>
</template>

<script>
export default {
  name: "Support",
  data() {
    return {
      email: "",
      login: true,
      remnant: 500,
      desc: ""
    };
  },
  methods: {
    descInput(){
      var txtVal = this.desc.length;
      this.remnant = 200 - txtVal;
      remnant: 500;
      }
  }
};
</script>

<style lang="scss" scoped>
.app-support {
  margin: 0 0 0 0;

  .feedback {
    background-color: #c8c8c8;
    height: 184px;
    margin: 0 0 0 0;
    position: relative;

    .feedback_title {
      position: absolute;
      font-size: 24px;
      font-weight: bolder;
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
    }
  }
}

.label_title {
    margin: 16px 16px 0 16px;
    height: 24px;
  }

.textarea {
  margin: 16px 16px 4px 16px;
  height: 144px;
  font-size: 16px;
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
