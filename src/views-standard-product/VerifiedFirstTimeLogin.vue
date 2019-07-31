<template>
  <div class="verified-first-time">
    <WapHeader :right="true" />

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
        style="margin-left: -15px ; color : #929292;"
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
import WapHeader from "@/components/WapHeader";

export default {
  name: "VerifiedFirstTimeLogin",
  components: {
    WapHeader
  },
  data() {
    return {
      showKeyboard: true,
      value: ""
    };
  },
  watch: {
    value(val) {
      if (this.value.length === 4) {
        this.$api.checkNationId({ nationalId: val }).then(res => {
          if (res.data.code === 200 && res.data.data.same) {
            this.$router.push({ name: "CreatePasswordSP" });
          } else {
            //FIXME: not implemented yet, the api return when error
            this.$toast(res.data.msg);
          }
        });
      }
    }
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.welcomeWrapper {
  padding: 5%;
  padding: 5%;
  .welcome-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 25px;
  }
  .sub {
    margin-bottom: 25px;
    color: #2f3941;
  }
  .instruction {
    color: #2f3941;
    margin-bottom: 10px;
  }
}
</style>
