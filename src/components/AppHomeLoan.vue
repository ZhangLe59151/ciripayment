<template>
  <div
    class="app-home-lucky"
    @click="$router.push({name: 'Home'})"
  >
    <div class="des">
      {{$t("AppHomeLoan")}}
    </div>
    <div class="amount">
      100,000 ฿
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomeLucky"
};
</script>

<style lang="scss" scoped>
.app-home-lucky {
  height: 80px;
  width: 100%;
  text-align: center;
  .des {
    margin-top: 16px;
    font-family: HelveticaNeue;
    font-size: 14px;
    color: #363f47;
    letter-spacing: 0;
    text-align: center;
  }

  .amount {
    margin-top: 8px;
    font-family: HelveticaNeue-Bold;
    font-size: 24px;
    color: #363f47;
    letter-spacing: 0;
    text-align: center;
  }
}
</style>

