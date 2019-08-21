<template>
  <div class="credit">
    <app-common-header title="Credit Line" />

   <credit-app-credit-limit />
    <credit-app-credit-update v-if="!finishedAll"/>
    <credit-app-credit-finish-questions v-else />
  </div>
</template>

<script>
export default {
  name: "Credit",
  data() {
    return {
      finishedAll: false,
    }
  },
  created() {
    // this.$store.commit("fetchCreditDataFromLocal");
    // fetch credit from server or userphone:
    let credit = {
      creditLimit: 5000,
      creditQuestions: {
        Q1: "What's your monthly income",
        Q2: "What's your monthly expenses",
        Q3: "Whats your favourite restaurant"
      },
      creditAnswers: {
        Q1: "a",
        Q2: "a",
        Q3: "a"
      }
    };
    let numberOfAnswered = Object.values(credit.creditAnswers).filter(String).length;
    this.finishedAll = (numberOfAnswered === 3);
    this.$store.commit("InitCredit", credit);
  }
}
</script>

<style lang="scss" scoped>
  .credit{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #04A777;

  }
</style>
