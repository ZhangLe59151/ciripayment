<template>
    <div class="app-credit-update">
      <van-swipe @change="onChange">
        <van-swipe-item>
          <div class="box-card">
            <div class="title">What's your monthly income?</div>
            <div class="input_number">
              <van-field
              
              v-model="form.memo"
              @focus="inputNote"
              maxlength="50"
              placeholder="5000"
              />
            </div>
            <div class="error_msg">Please enter an amount</div>
            <van-button class="submit-btn">+1,000 B criedit</van-button>
          </div>
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppCreditUpdate",
  data() {
    return {
      checked: true,
      form: {}
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
  methods: {
    onChange(index) {
      Toast('当前 Swipe 索引：' + index);
    }
  }

}
</script>

<style lang="scss" scoped>
  .app-credit-update{
    flex-grow:1;
    background-color: #04A777;

    .box-card{
      background-color: #ffffff;
      margin: 16px 28px 0 28px;
      height: 340px;
      border-radius: 10px;
      position: relative;

      .title{
        font-size: 20px;
        font-weight: bolder;
        text-align: center;
        position: absolute;
        left: 30px;
        right: 30px;
        top: 30px;
      }

      .input_number {
        position: absolute;
        height: 82px;
        left: 16px;
        right: 16px;
        top: 130px;
        font-size: 24px;
        border-color: #B41800;
        border-style: solid;
        border-width: 1px;
        border-radius: 4px;
      }

      .error_msg {
        position: absolute;
        top: 220px;
        font-size: 14px;
        color: #B41800;
        text-align: center;
        width: 100%;
      }
      
      .submit-btn{
        position: absolute;
        background: #FF8600;
        border-radius: 4px;
        left: 16px;
        right: 16px;
        width: 90%;
        height: 40px;
        color: white;
        font-size: 14px;
        line-height: 40px;
        bottom: 20px;
      }
      .disabled {
        background-color: #E9EBED;
        color: #87929D;
      }
      .submittedAnswer{
        font-size: 24px;
        position: relative;
        top: -2px;
      }
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
