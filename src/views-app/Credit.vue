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
        Business Worth
      </div>
    </van-nav-bar>
   <app-credit-limit />
    <app-credit-update />
  </div>
</template>

<script>
import mapState from "vuex";
export default {
  name: "Credit",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      finishedAll: state =>
        (Array.isArray(state.credit.questions)) ? state.credit.questions.map(item => item.value).filter(Boolean)
          .length === 3 : false,
      questions: state => state.credit.questions
    })
  },
  created() {
    // this.$api.getQuestion().then(res => {
    //   if (res.data.code === 200) {
    //     this.$store.commit("InitCredit", res.data.data);
    //   }
    // });
    const creditMock =
      {
        currentCreditLimit: 50000,
        questions: [
          {
            "id": 1,
            "question": "Do you have a driving licence?",
            "type": 3,
            "options": [
              "B-", "2", "hi", "hello","3","3"
            ],
            "limitAmount": 5000,
            "value": null,
            "placeholder": ""
          },
          {
            "id": 5,
            "question": "What is your monthly income?",
            "type": 3,
            "options": ["0", "1", "2", "3", "4", "5"],
            "limitAmount": 7000,
            "value": "",
            "placeholder": "25000"
          },
          {
            "id": 9,
            "question": "What do you sell or provide?",
            "type": 2,
            "options": null,
            "limitAmount": 6000,
            "value": "",
            "placeholder": "E.g. Sell clothes, sell food"
          }
        ]
      };
    this.$store.commit("InitCredit", creditMock);
  }
}
</script>

<style lang="scss" scoped>
  .credit{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
