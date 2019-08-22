<template>
    <div class="app-credit-finish-questions-wrapper">
      <van-swipe
        :loop="false"
        :show-indicators="false"
        :initial-swipe="3"
      >

        <van-swipe-item
          v-for="item in questionList"
          :key="item.id"
          class="swipe-item">
          <app-credit-q-a-mapper
            class="item-mapper"
            :question="item"
          />
        </van-swipe-item>
        <van-swipe-item>
          <div class="app-credit-finish-questions">
            <i class="iconfont iconsuccess" />
            <div class="msg-1">
              All of today’s questions have been answered.
            </div>
            <div class="msg-2">
              Come back tomorrow for more questions!
            </div>
          </div>
        </van-swipe-item>

      </van-swipe>

    </div>

</template>

<script>
import { mapState } from "vuex";
import AppCreditQAMapper from "@/components/credit/AppCreditQAMapper";

export default {
  name: "AppCreditFinishQuestions",
  components: { AppCreditQAMapper },
  computed: {
    ...mapState({
      questionList: state => state.credit.questions,
      finishedAll: state => state.credit.questions.map(item => item.value).filter(Boolean).length === 3

    })
  }
}
</script>

<style lang="scss" scoped>
  .app-credit-finish-questions{
    text-align:center;
    padding: 28px 16px 0px 16px;
    color:white;
    .iconsuccess{
      font-size: 80px;
    }
    .msg-1{
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .msg-1,.msg-2{
      font-size:20px;
      font-weight: bold;
    }
  }
  .item-mapper{
    padding-top:28px;
  }
</style>
