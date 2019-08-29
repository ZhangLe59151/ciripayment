<template>
  <div
    class="radio-input-question"
    v-if="!question.value"
  >
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block"
      v-if="question.options.length === 2"
    >
      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-2' : (item !== form.value )?'option-2':'option-2 selecting')"
        @click="setData(item)"
      >{{ item }}</div>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4"
    >
      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-4' : (item !== form.value )?'option-4':'option-4 selecting')"
        @click="setData(item)"
      >{{ item }}</div>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 4 "
    >
      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-6' : (item !== form.value )?'option-6':'option-6 selecting')"
        @click="setData(item)"
      >{{ item }}</div>
    </div>
    <div
      class="error-msg"
      v-if="error"
    >{{$t("Credit.errorEnterOption")}}</div>
    <van-button
      class="submit-btn"
      @click="handleSubmit"
    >
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
      <img
        class="dollar-coin"
        src="../../assets/imgs/dollar_coin.png"
      >
    </van-button>
  </div>
  <div
    class="radio-input-question"
    v-else
  >
    <i class="iconfont iconsuccess" />
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block"
      v-if="question.options.length === 2"
    >

      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-2' : (item === question.value ) ? 'option-2 selected' : 'option-2 unselected')"
        disabled
      >{{ item }}</div>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4"
    >

      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-4' : (item === question.value ) ? 'option-4 selected' : 'option-4 unselected')"
        disabled
      >{{ item }}</div>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 4"
    >

      <div
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-6' : (item === question.value ) ? 'option-6 selected' : 'option-6 unselected')"
        disabled
      >{{ item }}</div>
    </div>
    <van-button
      class="submit-btn-done"
      disabled
    >{{question.limitAmount}} {{$store.state.currency}} Earned</van-button>
  </div>
</template>

<script>
import util from "@/util.js";
import { utimes } from "fs";

export default {
  name: "RadioInputQuestion",
  props: {
    question: Object
  },
  data() {
    return {
      form: {
        value: "",
        id: this.question.id
      },
      error: false
    };
  },
  created() {},
  methods: {
    handleSubmit() {
      event.preventDefault();
      if (this.form.value === "") {
        this.error = true;
        return false;
      }
      if (!this.error) {
        // this.$store.commit("UpdateCreditLimit", this.$store.state.credit.currentCreditLimit + this.question.limitAmount);
        // this.$store.commit("UpdateCreditAnswer", { id: this.question.id, value: this.form.answering });

        // send to server
        this.$api
          .submitCreditAnswer({ id: this.question.id, value: this.form.value })
          .then(res => {
            if (res.data.code === 200) {
              // update vuex and localstorage
              this.$store.commit(
                "UpdateCreditLimit",
                this.$store.state.credit.currentCreditLimit +
                  this.question.limitAmount
              );
              this.$store.commit("UpdateCreditAnswer", {
                id: this.question.id,
                value: this.form.value
              });
            }
          });
      }
    },
    // submitCreditAnswer() {
    //   this.$api.submitCreditAnswer(this.form).then(res => {
    //     if (res.data.code === 200) {
    //       // limitAmount += this.question.limitAmount;
    //       limitAmount = util.fmoney(this.question.limitAmount);
    //     }
    //   });
    // },
    setData(item) {
      this.error = false;
      this.form.value = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-input-question {
  background-color: #ffffff;
  min-height: 320px;
  width: calc(84vw);
  margin: auto;
  border-radius: 8px;
  color: #2f3941;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
  .iconsuccess {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #04a777;
    font-size: 24px;
  }

  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 35px;
  }

  .option-block {
    position: absolute;
    top: 110px;
    left: 16px;
    right: 16px;
    height: 40%;

    .option-2 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #c2c8cc;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 90px;
      width: 44%;
      font-size: 20px;
    }

    .error-2 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #b41800;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 90px;
      width: 44%;
      font-size: 20px;
    }

    .option-4 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #c2c8cc;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 60px;
      font-size: 14px;
      width: 44%;
    }

    .error-4 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #b41800;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 60px;
      font-size: 14px;
      width: 44%;
    }

    .error-6 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #b41800;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 40px;
      font-size: 16px;
      width: 44%;
    }

    .option-6 {
      text-align: center;
      float: left;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center;
      border: 1px solid #c2c8cc;
      background-color: white;
      border-radius: 4px;
      color: #2f3941;
      margin: 4px 6px 4px 6px;
      white-space: normal;
      height: 40px;
      font-size: 16px;
      width: 44%;
    }

    .selecting {
      background-color: #ff8600;
      color: white;
      border-color: #ff8600;
    }
    .selected {
      background-color: #87929d !important;
      color: white !important;
      opacity: 1 !important;
      border: 0px;
      box-shadow: none !important;
    }
    .unselected {
      background-color: #e9ebed !important;
      color: #87929d !important;
      opacity: 1 !important;
      border-color: white !important;
      border: 0px;
      box-shadow: none !important;
    }
  }

  .error-msg {
    position: absolute;
    bottom: 220px;
    left: 70px;
    font-size: 14px;
    color: #c44834;
    letter-spacing: 0;
    text-align: center;
  }
  .submit-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #ff8600;
    color: white;
    font-size: 14px;
    .btn-text {
      position: relative;
      left: -20px;
      top: -2px;
    }
    .dollar-coin {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 7px;
      right: 55px;
    }
  }

  .submit-btn-done {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #c2c8cc !important;
    color: white !important;
    opacity: 1 !important;
    box-shadow: none !important;
    font-size: 14px;
  }
}
</style>
