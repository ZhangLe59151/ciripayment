<template>
  <div class="fortunetelling-result">
    <app-lucky-header :center="true" />
    <section
      v-for="(item,index) in fortunetellingFrame"
      :key="index"
    >
      <app-fortunetelling-result-lucky
        :luckyArr.sync="item.luckyArr"
        :des.sync="item.des"
      />
    </section>
    <div v-if="!isRecord">
      <app-fortunetelling-result-sales-record />
    </div>
    <div class="bg-image-div">
      <img
        :src="require('@/assets/imgs/fortunetelling_results_pg.png')"
        class="bg-image"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { find } from "lodash";
export default {
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter",
      recordList: "recordList",
      fortunetellingFrame(state) {
        const fortunetellingFrame =
          state.fortunetellingFrame[
            this.$moment().format(this.localDateFormatter)
          ];

        const basicArray = [
          {
            luckyArr: [
              {
                label: this.$t("FortuneTelling.LuckyNumberLabel"),
                value: fortunetellingFrame.luckyNumber
              },
              {
                label: this.$t("FortuneTelling.LuckyWordsLabel"),
                value: fortunetellingFrame.luckyWords
              }
            ],
            des: fortunetellingFrame.luckyDescription
          }
        ];

        const addOnArray = [
          {
            luckyArr: [
              {
                label: this.$t("FortuneTelling.LuckySalesLabel"),
                value: fortunetellingFrame.luckySales
              }
            ],
            des: this.$t("FortuneTelling.LuckySalesDescription")
          }
        ];
        return this.isRecord ? basicArray.concat(addOnArray) : basicArray;
      }
    }),
    isRecord() {
      const yesterday = this.$moment()
        .subtract(1, "days")
        .format(this.localDateFormatter);
      return find(this.recordList, { date: yesterday }) ? true : !true;
    }
  }
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
