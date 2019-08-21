<template>
    <div class="app-credit-qa-mapper">
      <money-input-question v-if="type==='1'" question="What's your monthly income?" answer="d" />
    </div>
</template>

<script>
import MoneyInputQuestion from "@/components/credit/MoneyInputQuestion";
export default {
  name: "AppCreditQAMapper",
  components: {
    MoneyInputQuestion
  },
  props: {
    type: String
  }
}
</script>

<style lang="scss" scoped>
  .app-credit-qa-mapper{
  }
</style>
