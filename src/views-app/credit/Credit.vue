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
      finishedAll: state => {
        if (state.credit.questions === []) {
          return true;
        }
        return (Array.isArray(state.credit.questions)) ? state.credit.questions.map(item => item.value).filter(Boolean)
          .length === state.credit.questions.length : false
      },
      questions: state => state.credit.questions
    })
  },
  created() {
    this.$api.getCreditQuestion().then(res => {
      if (res.data.code === 200) {
        this.$store.commit("InitCredit", res.data.data);
      }
    });
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
