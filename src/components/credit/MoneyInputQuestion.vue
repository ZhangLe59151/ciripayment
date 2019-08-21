<template>
  <div v-if="!!answer" class="money-input-question">
    <i class="iconfont iconsuccess" />
    <div class="title">{{question}}</div>
    <div class="answer">{{answer}}<div class="baht">{{$store.state.currency}}</div></div>
    <van-button class="submit-btn-disabled" disabled >1,000 {{$store.state.currency}} Earned</van-button>
  </div>
  <div v-else class="money-input-question">
    <div class="title">{{question}}</div>
    <el-form
      label-width="0px"
      :model="form"
      ref="elForm"
      size="small"
      label-position="top"
      class="elForm"
    >
        <el-form-item
          prop="answering">
          <el-input inputmode="numeric" v-model="form.answering" placeholder="0">
            <div class="currency" slot="suffix">{{$store.state.currency}}</div>
          </el-input>
        </el-form-item>
    </el-form>
    <van-button class="submit-btn">
      <div class="btn-text">+1,000 {{$store.state.currency}} Credit</div>
      <img class="dollar-coin" src="../../assets/imgs/dollar_coin.png">
    </van-button>
  </div>
</template>

<script>
export default {
  name: "MoneyInputQuestion",
  props: {
    question: String,
    answer: String
  },
  data(){
    return {
      form: {
        answering: ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .money-input-question{
    background-color: #ffffff;
    height: 340px;
    width: 304px;
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
    .answer {
      width: 264px;
      height: 80px;
      box-sizing: border-box;
      background-color: #E9EBED;
      padding-top:26px;
      font-size:24px;
      position: relative;

      .baht{
        font-size:16px;
        position: absolute;
        right:12px;
        bottom:30px;
      }
    }
    .submit-btn-disabled{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 264px;
      height:40px;
      background-color: #C2C8CC !important;
      color:white !important;
      opacity: 1 !important;
      box-shadow: none !important;
      font-size: 14px;
    }

    .currency{
      font-size: 16px;
      color: #2F3941;
      position: relative;
      top:25px;
      left:-5px;
    }
    .submit-btn{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 264px;
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
  }
</style>

<style lang="scss">
  .money-input-question{
    .el-input--small .el-input__inner{
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      width:264px;
      height: 80px;
      font-size:24px;
      color: #87929D;
      text-align: center;
    }
  }
</style>
