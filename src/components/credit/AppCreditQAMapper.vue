<template>
    <div class="app-credit-qa-mapper">
      <money-input-question v-if="String(question.type)==='1'" :question="question" />
      <text-input-question v-else-if="String(question.type)==='2'" :question="question" />
      <radio-input-question v-else :question="question"/>
    </div>
</template>

<script>
import MoneyInputQuestion from "@/components/credit/MoneyInputQuestion";
import TextInputQuestion from "@/components/credit/TextInputQuestion";
import RadioInputQuestion from "@/components/credit/RadioInputQuestion";
export default {
  name: "AppCreditQAMapper",
  components: {
    RadioInputQuestion,
    TextInputQuestion,
    MoneyInputQuestion
  },
  props: ["question"]
};
</script>

<style lang="scss" scoped>
.app-credit-qa-mapper {
}
</style>
