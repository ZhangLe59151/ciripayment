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
      maxlength="500" 
      @input="descInput" 
      v-model="desc"
      placeholder="Describe your problem or feedback" />

    <div class="remain" >{{remnant}}/500</div>

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
      if (this.remnant == 0) {
        return false;
      }
      this.remnant = 500 - txtVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-support {
  margin: 0 0 0 0;
  position: relative;

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
  margin: 16px 16px 0 16px;
  left: 16px;
  width: 90%;
  right: 16px;
  height: 144px;
  font-size: 16px;
  color: #2F3941;
  border-bottom-color: #87929d;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  }

  .remain {
    margin: 16px 16px 0 16px;
  }


</style>

