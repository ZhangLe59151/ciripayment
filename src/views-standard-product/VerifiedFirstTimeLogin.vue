<template>
  <div class="verified-first-time">
    <van-nav-bar
      @click-right="$router.back()"
      :border="false"
    >
      <van-icon name="cross" slot="right" />
    </van-nav-bar>

    <div class="welcomeWrapper">
      <div class="welcome-title">
        Welcome!
      </div>
      <div class="sub">
        Before getting started, we want to make sure that it’s really you.
      </div>

      <div class="instruction">
        Enter last 4 digits of your National ID
      </div>
      <van-password-input
        :value="value"
        info
        @focus="showKeyboard = true"
        :mask="false"
        :length="4"
        :gutter="15"
        style="margin-left: -15px"
      />

    </div>

    <!--    <div class="page">3/3</div>-->
    <!--    &lt;!&ndash; 数字键盘 &ndash;&gt;-->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
export default {
  name: "VerifiedFirstTimeLogin",
  data() {
    return {
      showKeyboard: true,
      value: "",
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .welcomeWrapper{
    padding: 5%;
    padding: 5%;
    .welcome-title{
      font-size: 24px;
      font-weight: bold;
      margin-top:50px;
      margin-bottom: 25px;
    }
    .sub{
      margin-bottom: 25px;
      color: #2F3941;
    }
    .instruction{
      color: #2F3941;
      margin-bottom: 10px;
    }
  }

</style>
