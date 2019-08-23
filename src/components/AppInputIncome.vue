<template>
  <div class="app-input-income">
    <!-- <div class="pick_date">Today, 13 Aug 2019</div> -->
    <van-row class="input_label">
        Income
    </van-row>

    <van-field
        readonly
        clickable
        :value="value"
        @touchstart.native.stop="show = true"
    />

    <van-number-keyboard class="input"
        v-model="value"
        :show="show"
        :maxlength="6"
        @blur="show = false"
    />

  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col, Icon, NumberKeyboard } from "vant";

Vue.use(Row).use(Col).use(Icon).use((NumberKeyboard));

export default {
  name: "AppInputIncome",
  props: {},
  data() {
    return {
      show: false,
      value: ""
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

.app-input-income {
  margin-top:16px;
    margin-right:16px;
    margin-left:16px;
    height: 64px;

    .input_label {
        height: 20px;
        font-size: 14px;
    }

    .input_number {
        top: 4px;
        height: 40px;
        font-size: 24px;
        color: #04A777;
    }

    .input:focus {
        border: 2px solid #333;
        outline: none;
    }
}

</style>
