<template>
  <div class="credit">
    <app-common-header title="Credit Line" />

<<<<<<< HEAD
    <credit-app-credit-limit />
    <credit-app-credit-update v-if="!finishedAll" />
=======
   <credit-app-credit-limit />

    <credit-app-credit-update v-if="!finishedAll"/>
>>>>>>> c3ed0071cbbda39670398ac123f60ac53a1f17e3
    <credit-app-credit-finish-questions v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Credit",
  data() {
    return {
<<<<<<< HEAD
      finishedAll: false
    };
=======
    }
>>>>>>> c3ed0071cbbda39670398ac123f60ac53a1f17e3
  },
  computed: {
    ...mapState({
      finishedAll: state => state.credit.questions.map(item => item.value).filter(Boolean).length === 3,
      questions: state => state.credit.questions
    })
  },
  created() {
    // this.$api.getQuestion().then(res => {
    //   if (res.data.code === 200) {
    //     let numberOfAnswered = res.data.data.questions.map(item => item.value).filter(Boolean).length;
    //     this.finishedAll = (numberOfAnswered === 3);
    //     this.$store.commit("InitCredit", res.data.data);
    //   }
    // });

<<<<<<< HEAD
    const creditMock = {
      currentCreditLimit: 50000,
      questions: [
        {
          id: 1,
          question: "Do you have a driving licence?",
          type: 3,
          options: ["Yes", "No"],
          limitAmount: 5000,
          value: null,
          placeholder: ""
        },
        {
          id: 5,
          question: "What is your monthly income?",
          type: 1,
          options: null,
          limitAmount: 7000,
          value: "",
          placeholder: "25000"
        },
        {
          id: 9,
          question: "What do you sell or provide?",
          type: 2,
          options: null,
          limitAmount: 6000,
          value: "",
          placeholder: "E.g. Sell clothes, sell food"
        }
      ]
    };

    let numberOfAnswered = creditMock.questions
      .map(item => item.value)
      .filter(Boolean).length;
    this.finishedAll = numberOfAnswered === 3;
=======
    const creditMock =
      {
        currentCreditLimit: 50000,
        questions: [
          {
            "id": 6,
            "question": "What is your monthly expenses?",
            "type": 1,
            "options": null,
            "limitAmount": 7000,
            "value": "",
            "placeholder": "25000"
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

>>>>>>> c3ed0071cbbda39670398ac123f60ac53a1f17e3
    this.$store.commit("InitCredit", creditMock);
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
