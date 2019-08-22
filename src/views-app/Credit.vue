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
      finishedAll: false
    }
  },
  created() {
    // this.$api.getQuestion().then(res => {
    //   if (res.data.code === 200) {
    //     let numberOfAnswered = res.data.data.questions.map(item => item.value).filter(Boolean).length;
    //     this.finishedAll = (numberOfAnswered === 3);
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
              "Yes",
              "No"
            ],
            "limitAmount": 5000,
            "value": null,
            "placeholder": ""
          },
          {
            "id": 5,
            "question": "What is your monthly income?",
            "type": 1,
            "options": null,
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

    let numberOfAnswered = creditMock.questions.map(item => item.value).filter(Boolean).length;
    this.finishedAll = (numberOfAnswered === 3);
    this.$store.commit("InitCredit", creditMock);
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
