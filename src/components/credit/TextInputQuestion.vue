<template>
  <div v-if="!!question.value" class="text-input-question">
    <i class="iconfont iconsuccess" />
    <div class="title">{{question.question}}</div>
    <div class="answer">{{question.value}}</div>
    <van-button class="submit-btn-disabled" disabled >1,000 {{$store.state.currency}} Earned</van-button>
  </div>
  <div v-else class="text-input-question">
    <div class="title">{{question.question}}</div>
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
        <el-input :class="error? 'input-box-error': 'input-box'" v-model="form.answering"
                  :placeholder="question.placeholder">
        </el-input>
      </el-form-item>
    </el-form>
    <div v-if="error" class="error_msg">Please enter an amount</div>
    <van-button class="submit-btn" @click="handleSubmit">
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
      <img class="dollar-coin" src="../../assets/imgs/dollar_coin.png">
    </van-button>
  </div>
</template>

<script>
export default {
  name: "TextInputQuestion",
  props: {
    question: Object
  },
  data() {
    return {
      form: {
        answering: ""
      },
      error: false
    }
  },
  methods: {
    validateInput() {
      this.error = !this.form.answering;
    },
    handleSubmit() {
      this.validateInput();
      if (this.validateInput()) {
        // send to server
        // update vuex and localstorage
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-input-question{
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
      text-align:center;
      position: relative;
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

    .error_msg {
      font-size: 14px;
      color: #B41800;
      text-align: center;
      width: 100%;
    }
    .input-box{
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    .input-box-error {
      border: 1px solid #B41800;
      border-radius: 4px;
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
  .text-input-question{
    .el-input--small .el-input__inner{
      border: none;
      border-radius: 4px;
      width:264px;
      height: 80px;
      font-size:24px;
      color: #87929D;
      text-align: center;
      padding-right:0;
    }
  }
</style>
