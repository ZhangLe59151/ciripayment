<template>
  <div class="fortunetelling-result">
    <app-lucky-header :center="true"/>
    <section v-for="(item,index) in fortunetellingFrame[today]" :key="index">
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
      fortunetellingFrame: state => state.fortunetellingFrame
    })
  },
  methods: {

  },
  created() {
    this.today = this.$moment().format("YYYYMMDD");
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
