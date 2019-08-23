<template>
  <div class="radio-input-question" v-if="!question.value">
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block"
      v-if="question.options.length === 2">
      <!--      <van-button-->
      <!--        v-for="(item,index) in question.options"-->
      <!--        :key="index"-->
      <!--        :class="(error? 'error-2' : (item !== form.value )?'option-2':'option-2 selecting')"-->
      <!--        @click="setData(item)"-->
      <!--      >{{ item }}</van-button>-->
      <el-row>
        <el-col :span="11">
          <van-button
            :class="(error? 'error-2' : (question.options[0] !== form.value )?'option-2':'option-2 selecting')"
            @click="setData(question.options[0])"
          >{{ question.options[0] }}</van-button>
        </el-col>
        <el-col :span="11" :offset="1">
          <van-button
            :class="(error? 'error-2' : (question.options[1] !== form.value )?'option-2':'option-2 selecting')"
            @click="setData(question.options[1])"
          >{{ question.options[1] }}</van-button>
        </el-col>
      </el-row>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4">
      <el-row>
        <el-col :span="11">
          <div
            :class="(error? 'error-4' : (question.options[0] !== form.value )?'option-4':'option-4 selecting')"
            @click="setData(question.options[0])"
          ><div style="margin:auto;">{{ question.options[0] }}</div></div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div
            :class="(error? 'error-4' : (question.options[1] !== form.value )?'option-4':'option-4 selecting')"
            @click="setData(question.options[1])"
          >{{ question.options[1] }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <div
            :class="(error? 'error-4' : (question.options[2] !== form.value )?'option-4':'option-4 selecting')"
            @click="setData(question.options[2])"
          >{{ question.options[2] }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div
            :class="(error? 'error-4' : (question.options[3] !== form.value )?'option-4':'option-4 selecting')"
            @click="setData(question.options[3])"
          >{{ question.options[3] }}</div>
        </el-col>
      </el-row>
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
      <el-row>
        <el-col :span="11">
          <div
            :class="(error? 'error-2' : (question.options[0] !== question.value )?'option-2 unselected':'option-2 selected')"
            disabled
          >{{ question.options[0] }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div
            :class="(error? 'error-2' : (question.options[1] !== question.value )?'option-2 unselected':'option-2 selected')"
            disabled
          >{{ question.options[1] }}</div>
        </el-col>
      </el-row>
    </div>

    <div
      class="option-block"
      v-if="question.options.length > 2 && question.options.length<=4">

      <el-row>
        <el-col :span="11">
          <div
            :class="(error? 'error-4' : (question.options[0] !== question.value )?'option-4 unselected':'option-4 selected')"
            disabled
          >{{ question.options[0] }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div
            :class="(error? 'error-4' : (question.options[1] !== question.value )?'option-4 unselected':'option-4 selected')"
            disabled
          >{{ question.options[1] }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <div
            :class="(error? 'error-4' : (question.options[2] !== question.value )?'option-4 unselected':'option-4 selected')"
            disabled
          >{{ question.options[2] }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div
            :class="(error? 'error-4' : (question.options[3] !== question.value )?'option-4 unselected':'option-4 selected')"
            disabled
          >{{ question.options[3] }}</div>
        </el-col>
      </el-row>
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
    name: "RadioTemp",
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
      .option-2 {
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
        border-width: 1px;
        background-color: white;
        border-radius: 4px;
        border-color: #C2C8CC;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        min-height: 90px;
        width: 124px;
        font-size:20px;
        line-height: 20px !important;

      }

      .error-2 {
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
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
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
        border: 1px solid #c2c8cc;
        text-align: center;
        overflow: hidden;
        background-color: white;
        border-radius: 4px;
        color: #2F3941;
        margin: 4px 6px 4px 6px;
        white-space: normal;
        height: 60px;
        font-size: 13px;
        width: 124px;
        line-height: 20px;
      }

      .error-4{
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center;
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

<style lang="scss">
  .radio-input-question{

    .option-2{
      .van-button{
        line-height: 20px;
      }
    }

    .option-4{
      .van-button{
        line-height: 13px;
      }
    }
  }
</style>
