<template>
  <div class="fortunetelling-result">
    <app-lucky-header :center="true"/>
    <section v-for="(item,index) in fortunetellingFrame" :key="index">
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
import { find } from "lodash";
export default {
  components: {
    AppLuckyHeader,
    AppFortunetellingResultLucky,
    AppFortunetellingResultSalesRecord
  },
  data() {
    return {
      bgImageUrl: require("@/assets/imgs/fortunetelling_results_pg.png")
    };
  },
  computed: {
    ...mapState({
      fortunetellingFrame(state) {
        const fortunetellingFrame =
          state.fortunetellingFrame[this.$moment().format("YYYYMMDD")];

        let resultArray = [
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
        ];
        if (this.isRecord) {
          resultArray.push({
            luckyArr: [
              {
                label: this.$t("LuckySalesLabel"),
                value: fortunetellingFrame.luckySales
              }
            ],
            des: this.$t("LuckySalesDescription")
          });
        }
        return resultArray;
      },
      recordList: state => state.recordList
    }),
    isRecord() {
      const yesterday = this.$moment()
        .subtract(1, "days")
        .format("YYYYMMDD");
      return find(this.recordList, { date: yesterday }) ? true : !true;
    }
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.fortunetelling-result {
  height: 100vh;
  background-color: #ff8600;
  position: relative;
}

.bg-image-div {
  text-align: center;
}

.bg-image {
  width: 240px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -120px;
}
</style>
