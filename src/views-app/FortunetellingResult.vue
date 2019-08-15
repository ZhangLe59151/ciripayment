<template>
  <div class="fortunetelling-result">
    <app-lucky-header :center="true"/>
    <section v-for="(item,index) in luckyComponentArr" :key="index">
      <app-fortunetelling-result-lucky :luckyArr.sync="item.luckyArr" :des.sync="item.des"/>
    </section>
    <div v-if="!isRecord">
      <app-fortunetelling-result-sales-record/>
    </div>
    <div class="bg-image-div">
      <img :src="bgImageUrl" class="bg-image">
    </div>
  </div>
</template>

<script>
import AppLuckyHeader from "@/components/AppLuckyHeader";
import AppFortunetellingResultLucky from "@/components/AppFortunetellingResultLucky";
import AppFortunetellingResultSalesRecord from "@/components/AppFortunetellingResultSalesRecord";
import { mapState } from "vuex";
export default {
  components: {
    AppLuckyHeader,
    AppFortunetellingResultLucky,
    AppFortunetellingResultSalesRecord
  },
  data() {
    return {
      bgImageUrl: require("@/assets/imgs/fortunetelling_results_pg.png"),
      isRecord: false,
      today: ""
    };
  },
  computed: {
    ...mapState({
      luckyComponentArr: state => state.luckyComponentArr
    })
  },
  methods: {
    getFortunetellingByAPI() {
      this.$api.getFortunetelling().then(res => {
        if (res.data.code === 200) {
          let fortunetellingFrame = res.data.data;
          fortunetellingFrame["luckyDescription"] =
            res.data.data.luckyWords[0]["value"];
          fortunetellingFrame["luckyWords"] =
            res.data.data.luckyWords[0]["key"];
          this.$store.commit("SaveFortunetellingResult", {
            [this.today]: this.buildFortunetellingFrame(fortunetellingFrame)
          });
        }
      });
    },
    buildFortunetellingFrame(fortunetellingFrame) {
      return !this.isRecord
        ? [
            {
              luckyArr: [
                {
                  label: this.$t("LuckyNumberLabel"),
                  value: fortunetellingFrame.luckyNumber
                },
                {
                  label: this.$t("LuckyWordsLabel"),
                  value: fortunetellingFrame.luckyWords
                }
              ],
              des: fortunetellingFrame.luckyDescription
            }
          ]
        : [
            {
              luckyArr: [
                {
                  label: this.$t("LuckyNumberLabel"),
                  value: fortunetellingFrame.luckyNumber
                },
                {
                  label: this.$t("LuckyWordsLabel"),
                  value: fortunetellingFrame.luckyWords
                }
              ],
              des: fortunetellingFrame.luckyDescription
            },
            {
              luckyArr: [
                {
                  label: this.$t("LuckySalesLabel"),
                  value: fortunetellingFrame.luckySales
                }
              ],
              des: this.$t("LuckySalesDescription")
            }
          ];
    },
    queryFortunetelling() {
      this.today = this.$moment().format("YYYYMMDD");
      this.getFortunetellingByAPI();
    },
    checkIsRecord() {
      const yesterday = this.$moment()
        .subtract(1, "days")
        .format("YYYYMMDD");
      this.isRecord = localStorage.getItem(yesterday);
    }
  },
  created() {
    this.checkIsRecord();
    this.queryFortunetelling();
  }
};
</script>

<style lang="scss" scoped>
.fortunetelling-result {
  height: 100vh;
  background-color: #ff8600;
}

.bg-image-div {
  text-align: center;
}

.bg-image {
  width: 60%;
}
</style>