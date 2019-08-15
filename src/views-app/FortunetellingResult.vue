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
export default {
  components: {
    AppLuckyHeader,
    AppFortunetellingResultLucky,
    AppFortunetellingResultSalesRecord
  },
  data() {
    return {
      bgImageUrl: require(`@/assets/imgs/fortunetelling_results_pg.png`),
      isRecord: false
    };
  },
  computed: {
    luckyComponentArr() {
      return !this.isRecord
        ? [
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
            }
          ]
        : [
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
          ];
    }
  },
  methods: {
    onConfirm(value, index) {
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    getFortunetelling() {
      this.setLuckyNumber("111");
      this.setLuckyWords("333");
      this.setLuckySales("444");
      // this.$api.getFortunetelling().then(res => {
      //   if (res.data.code === 200) {
      //     this.$store.commit("updateSettlement", this.settlementChoosing);
      //   }
      // });
    },
    setLuckyNumber(value) {
      this.luckyComponentArr[0].luckyArr[0].value = value;
    },
    setLuckyWords(value) {
      this.luckyComponentArr[0].luckyArr[1].value = value;
    },
    setLuckySales(value) {
      if (this.isRecord) {
        this.luckyComponentArr[1].luckyArr[0].value = value;
      }
    },
    checkIsRecord() {
      const yesterday = this.$moment()
        .subtract(1, "days")
        .format("YYYYMMDD");
      console.log(yesterday);
      this.isRecord = localStorage.getItem(yesterday);
    }
  },
  created() {
    this.checkIsRecord();
    console.log(this.isRecord);
    this.getFortunetelling();
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