<template>
    <div class="app-credit-update">
      <van-swipe
        @change="onChange"
        :loop="false"
        :show-indicators="false"
        :width="swipeWidth" >
        <van-swipe-item
          v-for="item in questionList"
          :key="item.id"
          class="swipe-item">
          <app-credit-q-a-mapper
            class="item-mapper"
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
import AppCreditQAMapper from "@/components/credit/AppCreditQAMapper";

export default {
  name: "AppCreditUpdate",
  components: { AppCreditQAMapper },
  data() {
    return {
      checked: true,
      test1: false,
      type: {
        number: true,
        radio: false
      },
      form: {
      },
      swipeWidth: 355
    }
  },
  computed: {
    ...mapState({
      questionList: state => state.credit.questions
    })
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
      .item-mapper{
        margin: 0 6px 0 28px;
      }
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
