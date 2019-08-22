<template>
    <div class="app-credit-qa-mapper">
      <money-input-question v-if="question.type==='1'" :question="question" />
      <app-question-select-two v-else-if="question.type==='3'" :question="question"/>
    </div>
</template>

<script>
import MoneyInputQuestion from "@/components/credit/MoneyInputQuestion";
import AppQuestionSelectTwo from "@/components/credit/AppQuestionSelectTwo";
export default {
  name: "AppCreditQAMapper",
  components: {
    AppQuestionSelectTwo,
    MoneyInputQuestion
  },
  props: ["question"]
}
</script>

<style lang="scss" scoped>
  .app-credit-qa-mapper{
  }
</style>
