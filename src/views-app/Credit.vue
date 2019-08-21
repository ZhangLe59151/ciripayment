<template>
  <div class="credit">
    <van-nav-bar
      @click-left="$router.push({name: 'Home'})"
      :border="false"
      left-arrow
    >
      <div
        slot="title"
        class="header-title"
      >
        Credit Line
      </div>
    </van-nav-bar>

   <credit-app-credit-limit />
<!--    <credit-app-credit-update />-->
  </div>
</template>

<script>
export default {
  name: "Credit",
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
        Q1: "",
        Q2: "",
        Q3: ""
      }
    };
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
