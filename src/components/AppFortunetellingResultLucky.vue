<template>
  <div class="fortunetelling-result-lucky">
    <section v-for="(item,index) in luckyArr" :key="index">
      <div class="lucky-label">{{item.label}}</div>
      <div class="lucky-value">{{item.value}}</div>
    </section>
    <div class="luck-result-message">{{des}}</div>
  </div>
</template>

<script>
export default {
  props: {
    luckyArr: {
      default() {
        return [
          {
            label: "--",
            value: "--"
          }
        ];
      },
      required: true,
      type: Array
    },
    des: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      luckyNumber: "--",
      luckyWords: "--"
    };
  },
  computed: {},
  methods: {
    getFortunetelling() {
      console.log("123");
      // this.$api.getFortunetelling().then(res => {
      //   if (res.data.code === 200) {
      //     this.$store.commit("updateSettlement", this.settlementChoosing);
      //   }
      // });
    }
  },
  mounted() {
    this.getFortunetelling();
  }
};
</script>

<style lang="scss" scoped>
.fortunetelling-result-lucky.second-lucky {
  background: red;
}
.fortunetelling-result-lucky {
  padding: 24px 20px;
  background: #ffffff;
  border: 1px solid #e9ebed;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0 16px 11px 16px;
  text-align: center;

  .lucky-label {
    color: #ff8600;
    font-size: 14px;
    padding-bottom: 4px;
  }

  .lucky-value {
    color: #000000;
    font-size: 24px;
    padding-bottom: 21px;
    font-weight: bold;
  }

  .luck-result-message {
    color: #87929d;
    font-size: 14px;
    font-style: italic;
    padding: 16px 4px 0px 4px;
  }
}
</style>
