<template>
    <div class="app-credit-qa-mapper">
      <money-input-question v-if="String(question.type)==='1'" :question="question" />
      <money-input-question v-else-if="String(question.type)==='2'" :question="question" />
      <app-question-select-two v-else :question="question"/>
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
