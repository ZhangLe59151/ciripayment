<template>
  <div class="fortunetelling-result">
    <app-lucky-header :center="true"/>
    <section v-for="(item,key) in luckyComponentArr" :key="key">
      <app-fortunetelling-result-lucky :luckyArr="item.luckyArr" :des="item.des"/>
    </section>
  </div>
</template>

<script>
import AppLuckyHeader from "@/components/AppLuckyHeader";
import AppFortunetellingResultLucky from "@/components/AppFortunetellingResultLucky";
export default {
  components: {
    AppLuckyHeader,
    AppFortunetellingResultLucky
  },
  data() {
    return {
      luckyComponentArr: [
        {
          luckyArr: [
            {
              label: this.$t("LuckyNumberLabel"),
              value: "unknown"
            },
            {
              label: this.$t("LuckyWordsLabel"),
              value: "unknown"
            }
          ],
          des: this.$t("LuckyDescription")
        },
        {
          luckyArr: [
            {
              label: this.$t("LuckySalesLabel"),
              value: "unknown"
            }
          ],
          des: this.$t("LuckySalesDescription")
        }
      ]
    };
  },
  computed: {},
  methods: {
    onConfirm(value, index) {
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    handleStart() {}
  },
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn";
.fortunetelling-result {
  height: 100vh;
  background-color: #ff8600;
}
</style>

<style lang="scss">
.loginWrapper {
  .el-form-item__error {
    position: relative;
    left: 15px;
  }
}
</style>
