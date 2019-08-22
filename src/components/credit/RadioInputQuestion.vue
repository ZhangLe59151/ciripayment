<template>
  <div class="radio-input-question" v-if="!question.value">
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block"
      v-if="question.options.length === 2">
      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-2' : (item !== form.value )?'option-2':'option-2 selecting')"
        @click="setData(item)"
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4">
      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-4' : (item !== form.value )?'option-4':'option-4 selecting')"
        @click="setData(item)"
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 4 ">
      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-6' : (item !== form.value )?'option-6':'option-6 selecting')"
        @click="setData(item)"
      >{{ item }}</van-button>
    </div>

    <van-button class="submit-btn" @click="handleSubmit">
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
      <img class="dollar-coin" src="../../assets/imgs/dollar_coin.png">
    </van-button>
  </div>
  <div class="radio-input-question" v-else>
    <i class="iconfont iconsuccess" />
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block"
      v-if="question.options.length === 2">

      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-2' : (item === question.value ) ? 'option-2 selected' : 'option-2 unselected')"
        disabled
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4">

      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-4' : (item === question.value ) ? 'option-4 selected' : 'option-4 unselected')"
        disabled
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 4">

      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        :class="(error? 'error-6' : (item === question.value ) ? 'option-6 selected' : 'option-6 unselected')"
        disabled
      >{{ item }}</van-button>
    </div>
    <van-button class="submit-btn-done" disabled >{{question.limitAmount}} {{$store.state.currency}} Earned</van-button>
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
    }
  },
  created() {
  },
  methods: {
    handleSubmit() {
      event.preventDefault();
      if (this.form.value === "") { this.error = true; return false; }
      if (!this.error) {
        // this.$store.commit("UpdateCreditLimit", this.$store.state.credit.currentCreditLimit + this.question.limitAmount);
        // this.$store.commit("UpdateCreditAnswer", { id: this.question.id, value: this.form.answering });

        // send to server
        this.$api.submitQuestion({ id: this.question.id, value: this.form.value }).then(
          res => {
            if (res.data.code === 200) {
              // update vuex and localstorage
              this.$store.commit("UpdateCreditLimit", this.$store.state.credit.currentCreditLimit + this.question.limitAmount);
              this.$store.commit("UpdateCreditAnswer", { id: this.question.id, value: this.form.value });
            }
          }
        )
      }
    },
    // submitQuestion() {
    //   this.$api.submitQuestion(this.form).then(res => {
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
}
</script>

<style lang="scss" scoped>
  .radio-input-question{
    background-color: #ffffff;
    height: 340px;
    width: 304px;
    margin: auto;
    border-radius: 8px;
    color: #2F3941;
    padding: 30px 20px 20px 20px;
    box-sizing: border-box;
    position:relative;
    .iconsuccess{
      position: absolute;
      top: 10px;
      right:10px;
      color: #04a777;
      font-size:24px;
    }

    .title{
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
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #C2C8CC;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height: 90px;
        width: 124px;
        font-size:20px;
      }

      .error-2 {
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #B41800;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height: 90px;
        width: 124px;
        font-size:20px;
      }

      .option-4{
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #C2C8CC;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height: 60px;
        font-size: 16px;
        width: 124px;

      }

      .error-4{
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #B41800;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height: 60px;
        font-size: 16px;
        width: 124px;

      }

      .option-6{
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #B41800;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height:40px;
        font-size: 16px;
        width: 124px;
      }

      .error-6{
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #C2C8CC;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height:40px;
        font-size: 16px;
        width: 124px;
      }

      .selecting {
        background-color: #ff8600 ;
        color: white ;
        border-color: #ff8600 ;
      }
      .selected{
        background-color: #87929D !important;
        color: white !important;
        opacity: 1!important;
      }
      .unselected{
        background-color: #E9EBED !important;
        color: #87929D !important;
        opacity: 1!important;
        border-color: white !important;
        border: 0px;
        box-shadow: none !important;
      }
    }

    .option-block-2 {
      position: absolute;
      top: 110px;
      left: 16px;
      right: 16px;
      height: 40%;

      .option {
        border-color: #C2C8CC;
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        height: 90px;
        width: 124px;
        font-size:20px;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
      }
      .selecting {
        background-color: #ff8600 ;
        color: white ;
        border-color: #ff8600 ;
      }
      .selected{
        background-color: #87929D !important;
        color: white !important;
        opacity: 1!important;
      }
      .unselected{
        background-color: #E9EBED !important;
        color: #87929D !important;
        opacity: 1!important;
        border-color: white !important;
        border: 0px;
        box-shadow: none !important;
      }
    }

    .option-block-4 {
      position: absolute;
      top: 110px;
      left: 16px;
      right: 16px;
      height: 40%;

      .option {
        border-color: #87929D;
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        height: 60px;
        width: 124px;
        margin: 4px 6px 4px 6px;
        white-space: normal;
      }
      .selecting {
        background-color: #ff8600 ;
        color: white ;
        border-color: #ff8600 ;
      }
      .selected{
        background-color: #87929D !important;
        color: white !important;
        opacity: 1!important;
      }
      .unselected{
        background-color: #E9EBED !important;
        color: #87929D !important;
        opacity: 1!important;
        border: 0px;
        box-shadow: none !important;
      }
    }

    .option-block-6 {
      position: absolute;
      top: 110px;
      left: 16px;
      right: 16px;
      height: 40%;

      .option {
        border-color: #87929D;
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        height:40px;
        width: 124px;
        margin: 4px 6px 4px 6px;
        white-space: normal;
      }
      .selecting {
        background-color: #ff8600 ;
        color: white ;
        border-color: #ff8600 ;
      }
      .selected{
        background-color: #87929D !important;
        color: white !important;
        opacity: 1!important;
      }
      .unselected{
        background-color: #E9EBED !important;
        color: #87929D !important;
        opacity: 1!important;
        border-color: white !important;
        border: 0px;
        box-shadow: none !important;
      }
    }

    .submit-btn{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 260px;
      height:40px;
      background-color: #FF8600;
      color:white;
      font-size: 14px;
      .btn-text{
        position: relative;
        left: -20px;
        top: -2px;
      }
      .dollar-coin{
        width: 24px;
        height:24px;
        position: absolute;
        top: 7px;
        right: 55px;
      }

    }

    .submit-btn-done{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 260px;
      height:40px;
      background-color: #C2C8CC !important;
      color:white !important;
      opacity: 1 !important;
      box-shadow: none !important;
      font-size: 14px;
    }

  }
</style>
