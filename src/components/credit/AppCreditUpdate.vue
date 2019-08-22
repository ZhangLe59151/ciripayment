<template>
    <div class="app-credit-update">
      <van-swipe
        @change="onChange"
        :loop="false"
        :show-indicators="false"
        :width="swipeWidth" >
        <van-swipe-item
          v-for="item in form.questionList"
          :key="item.id"
          class="swipe-item">
          <app-credit-q-a-mapper
            :question="item"
          />
        </van-swipe-item>
      </van-swipe>
      <div class="instruction">Swipe left to skip this question for now</div>
      <i class="iconfont iconswipe" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util.js";
import AppCreditQAMapper from "@/components/credit/AppCreditQAMapper";

export default {
  name: "AppCreditUpdate",
  components: { AppCreditQAMapper },
  // props: ['question','currentCreditLimit'],
  data() {
    return {
      checked: true,
      test1: false,
      type: {
        number: true,
        radio: false
      },
      form: {
        currentCreditLimit: "",
        questionList: []
      },
      swipeWidth: 355
    }
  },
  computed: {
    ...mapState({
      Answers: state => {
        let emptyAnswer = { Q1: "", Q2: "", Q3: "" };
        let savedAnswer = state.userInfo.creditAnswers;
        return {
          ...emptyAnswer, ...savedAnswer
        }
      }
    })
  },
  created() {
    // this.$api.getQuestion().then(res => {
    //   if (res.data.code === 200) {
    //     this.form.currentCreditLimit = util.fmoney(res.data.data.currentCreditLimit);
    //     this.form.questionList = res.data.data.questions;
    //     // debugger
    //   }
    // });

    const questionListMock = [
      {
        "id": 1,
        "question": "Do you have a driving licence?",
        "type": 3,
        "options": [
          "Yes",
          "No"
        ],
        "limitAmount": 5000,
        "value": null,
        "placeholder": ""
      },
      {
        "id": 2,
        "question": "What is your monthly income?",
        "type": 1,
        "options": null,
        "limitAmount": 7000,
        "value": "2300",
        "placeholder": "25000"
      },
      {
        "id": 3,
        "question": "What do you sell or provide?",
        "type": 2,
        "options": null,
        "limitAmount": 6000,
        "value": null,
        "placeholder": "E.g. Sell clothes, sell food"
      }
    ]
    this.form.questionList = questionListMock;
  },
  methods: {
    onChange(index) {
      this.swipeWidth = 300;
    }
  }

}
</script>

<style lang="scss" scoped>
  .app-credit-update{
    flex-grow:1;
    background-color: #04A777;

    .swipe-item {
      padding-top: 20px;
    }
    .instruction {
      margin: 20px 0 10px 0;
      font-size: 14px;
      text-align: center;
      color: white;
    }
    .iconswipe{
      color:white;
      font-size: 34px;
      margin: 0 0 0 160px;
    }

  }
</style>

<style lang="scss">
  .app-credit-update {
    .el-input__inner {
      font-size: 24px;
      padding-left: 0;
      padding-bottom: 10px;
    }
    .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: #FF8600;
    }
    .el-input__suffix {
      color: #363f47;
      position: absolute;
      font-size: 16px;
    }
    .van-checkbox__icon--round .van-icon{
      border-radius: 100% !important;
      width: 16px;
      height: 16px;
    }
  }
</style>
