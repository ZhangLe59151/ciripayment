<template>
  <div class="fortunetelling-result-sales-record">
    <div class="message">Record your daily income for better predictions.</div>
    <van-button size="small" class="bottom-btn" @click="recordNow">Record Now</van-button>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    recordNow() {
      const yesterday = this.$moment()
        .subtract(1, "days")
        .format("YYYYMMDD");
      this.$router.push({ name: "AddRecord", query: { date: yesterday } });
    }
  }
};
</script>

<style lang="scss" scoped>
.fortunetelling-result-sales-record {
  padding: 24px 15px;
  background: #ffffff;
  border: 1px solid #e9ebed;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0 16px 11px 16px;
  text-align: center;

  .message {
    font-size: 16px;
    padding: 0 4px 0 4px;
    padding-bottom: 12px;
  }
}
</style>
