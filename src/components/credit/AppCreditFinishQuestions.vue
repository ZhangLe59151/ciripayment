<template>
  <div class="app-credit-finish-questions-wrapper">
    <van-swipe
      :loop="false"
      :show-indicators="false"
      :initial-swipe="3"
      :width="swipeWidth"
      v-show="!finishedAll"
    >

      <van-swipe-item
        v-for="item in questionList"
        :key="item.id"
        class="swipe-item"
      >
        <app-credit-q-a-mapper
          class="item-mapper"
          :question="item"
        />
      </van-swipe-item>
    </van-swipe>

    <div class="app-credit-success">
      <div class="app-credit-finish-questions">
        <i class="iconfont iconsuccess" />
        <div class="msg-1">
          {{ $t('Credit.questionHasBeenDone') }}
        </div>
        <div class="msg-2">
          {{ $t('Credit.comeBack') }}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { mapState } from "vuex";
import AppCreditQAMapper from "@/components/credit/AppCreditQAMapper";

export default {
  name: "AppCreditFinishQuestions",
  components: { AppCreditQAMapper },
  data() {
    return {
      swipeWidth: document.documentElement.clientWidth * 0.9
    };
  },
  computed: {
    ...mapState({
      questionList: state => state.credit.questions,
      finishedAll: state =>
        state.credit.questions.map(item => item.value).filter(Boolean)
          .length === 3
    })
  }
};
</script>

<style lang="scss" scoped>
.app-credit-finish-questions-wrapper {
  position: relative;

  .app-credit-success {
    z-index: 9999;
  }
  .app-credit-finish-questions {
    text-align: center;
    margin: 28px 16px 0px 16px;
    position: absolute;
    top: 20px;

    color: white;
    .iconsuccess {
      font-size: 80px;
    }
    .msg-1 {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .msg-1,
    .msg-2 {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .item-mapper {
    padding-top: 28px;
  }
}
</style>

<style lang="scss" scoped>
.app-credit-finish-questions-wrapper {
  flex-grow: 1;
  background-color: #04a777;
  padding-bottom: 25px;
  .swipe-item {
    padding-top: 20px;
    .item-mapper {
    }
  }
  .instruction {
    margin: 20px 0 10px 0;
    font-size: 14px;
    text-align: center;
    color: white;
  }
  .iconswipe {
    color: white;
    font-size: 34px;
    margin: 0 0 0 160px;
  }
}
</style>
