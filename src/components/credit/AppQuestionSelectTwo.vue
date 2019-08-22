<template>
  <div class="box-card">
        <div class="title">{{ question.question }}</div>
        <div class="option-block">
          <van-button 
            v-for="(item,index) in question.options"
            :key="index"
            class="option"
            text="item"
            ></van-button>
        </div>
        <van-button class="submit-btn">+{{ currentCreditLimit }} {{$store.state.currency}} credit</van-button>
  </div>
</template>

<script>
export default {
  name: "AppQuestionSelectTwo",
  props: ['question','currentCreditLimit'],
  data() {
    return {
      form: {}
    }
  },
  created() {
    //Object.entries(this.question.options).forEach(([key, value]) => this.form[`${value}`] = `${value}`);
  }
}
</script>

<style lang="scss" scoped>
  .box-card{
      background-color: #ffffff;
      margin: 16px 6px 0 28px;
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

      .option-block {
        position: absolute;
        top: 110px;
        left: 16px;
        right: 16px;
        height: 30%;

        .option {
          border-color: #87929D;
          border-width: 1px;
          background-color: white;
          border-radius: 4px;
          width: 45%;
          height: 40%;
          margin: 4px 6px 4px 6px;
          white-space: normal;
        }
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
    }
</style>
