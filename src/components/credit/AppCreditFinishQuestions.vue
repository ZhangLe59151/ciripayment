<template>
    <div class="app-credit-finish-questions">
      <i class="iconfont iconsuccess" />
      <div class="msg-1">
        All of today’s questions have been answered.
      </div>
      <div class="msg-2">
        Come back tomorrow for more questions!
      </div>
<!--      FIXME: for testing-->
<!--      <app-credit-q-a-mapper :type="'1'" />-->
    </div>

</template>

<script>
import AppCreditQAMapper from "@/components/credit/AppCreditQAMapper";
export default {
  name: "AppCreditFinishQuestions",
  components: { AppCreditQAMapper }
}
</script>

<style lang="scss" scoped>
  .app-credit-finish-questions{
    text-align:center;
    padding: 28px 16px 265px 16px;
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
</style>
