<template>
  <div class="credit">
    <van-nav-bar
      :title="$t('Credit.title')"
      left-arrow
      @click-left="$router.push({name: 'Home'})"
    />

    <credit-app-credit-limit />

    <credit-app-credit-update v-if="!finishedAll" />
    <credit-app-credit-finish-questions v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Credit",
  data() {
    return {
    };
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
    this.$api.getCreditQuestion().then(res => {
      if (res.data.code === 200) {
        this.$store.commit("InitCredit", res.data.data);
      }
    });
    // const creditMock =
    //   {
    //     currentCreditLimit: 5000,
    //     questions: [
    //       {
    //         "id": 1,
    //         "question": "Take a photo of your product",
    //         "type": 4,
    //         "options": null,
    //         "limitAmount": 8000,
    //         "value": null,
    //         "placeholder": ""
    //       },
    //       {
    //         "id": 5,
    //         "question": "Your income tax (personal / enterprise income tax)",
    //         "type": 5,
    //         "options": null,
    //         "limitAmount": 7000,
    //         "value": "",
    //         "placeholder": ""
    //       },
    //       {
    //         "id": 9,
    //         "question": "What do you sell or provide?",
    //         "type": 2,
    //         "options": null,
    //         "limitAmount": 6000,
    //         "value": "",
    //         "placeholder": "E.g. Sell clothes, sell food"
    //       }
    //     ]
    //   };
    // this.$store.commit("InitCredit", creditMock);
  }
};
</script>

<style lang="scss" scoped>
.credit {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #04a777;
}
</style>
