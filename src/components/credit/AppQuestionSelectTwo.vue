<template>
  <div
    class="box-card"
    v-if="!!question.value"
  >
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block-2"
      v-if="questionItem.options.length === 2"
    >
      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        class="option"
        @click="setDate(item)"
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block-4"
      v-if="question.options.length === 4"
    >
      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        class="option"
        @click="setDate(item)"
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block-6"
      v-if="question.options.length > 4 "
    >
      <van-button
        v-for="(item,index) in questionItem.options"
        :key="index"
        class="option"
        @click="setDate(item)"
      >{{ item }}</van-button>
    </div>

    <van-button
      class="submit-btn"
      @click="submitQuestion"
    >
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
      <img
        class="dollar-coin"
        src="../../assets/imgs/dollar_coin.png"
      >
    </van-button>
  </div>
  <div
    class="box-card"
    v-else
  >
    <i class="iconfont iconsuccess" />
    <div class="title">{{ question.question }}</div>
    <div
      class="option-block-done-2"
      v-if="question.options.length === 2"
    >

      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        v-if="false"
        class="option-done"
        disabled
      >{{ item }}</van-button>

      <van-button
        v-for="(item,index) in question.options"
        :key="index"
        v-if="true"
        class="option-done-selected"
        disabled
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block-done-4"
      v-if="question.options.length === 4"
    >

      <van-button
        v-for="(item,index) in question.options"
        @v-if="unselected(item)"
        :key="index"
        class="option-done"
        disabled
      >{{ item }}</van-button>

      <van-button
        v-for="(item,index) in question.options"
        @v-if="selected(item)"
        :key="index"
        class="option-done-selected"
        disabled
      >{{ item }}</van-button>
    </div>

    <div
      class="option-block-done-6"
      v-if="question.options.length > 4"
    >

      <van-button
        v-for="(item,index) in question.options"
        @v-if="unselected(item)"
        :key="index"
        class="option-done"
        disabled
      >{{ item }}</van-button>

      <van-button
        v-for="(item,index) in question.options"
        @v-if="selected(item)"
        :key="index"
        class="option-done-selected"
        disabled
      >{{ item }}</van-button>
    </div>
    <van-button
      class="submit-btn-done"
      disabled
    >{{question.limitAmount}} {{$store.state.currency}} Earned</van-button>
  </div>
</template>

<script>
import util from "@/util.js";
import { utimes } from "fs";

export default {
  name: "AppQuestionSelectTwo",
  props: {
    question: Object
  },
  data() {
    return {
      form: {
        value: "",
        id: this.question.id
      },
      limitAmount: this.question.limitAmount,
      isAnswered: this.question.value ? true : false,
      value: ""
    };
  },
  created() {
    this.isAnswered = this.question.value ? true : false;
    this.limitAmount = this.question.limitAmount;
  },
  methods: {
    submitQuestion() {
      this.$api.submitQuestion(this.form).then(res => {
        if (res.data.code === 200) {
          //limitAmount += this.question.limitAmount;
          limitAmount = util.fmoney(this.question.limitAmount);
        }
      });
    },
    setData(item) {
      this.form.value = item;
    },
    selected(item) {
      return item === this.question.value ? true : false;
    },
    unselected(item) {
      return item === this.question.value ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  background-color: #ffffff;
  height: 340px;
  width: 304px;
  margin-right: 10px;
  border-radius: 8px;
  position: relative;
  .iconsuccess {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #04a777;
    font-size: 24px;
  }

  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    position: absolute;
    left: 30px;
    right: 30px;
    top: 30px;
  }

  .option-block {
    position: absolute;
    top: 110px;
    left: 16px;
    right: 16px;
    height: 40%;

    .option {
      border-color: #87929d;
      border-width: 1px;
      background-color: white;
      border-radius: 4px;
      width: 45%;
      margin: 4px 6px 4px 6px;
      white-space: normal;
    }
  }

  .option-done {
    border-color: #e9ebed;
    border-width: 1px;
    background-color: #e9ebed;
    color: #87929d;
    border-radius: 4px;
    width: 45%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }
}

.submit-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 260px;
  height: 40px;
  background-color: #ff8600;
  color: white;
  font-size: 14px;
  .btn-text {
    position: relative;
    left: -20px;
    top: -2px;
  }
  .dollar-coin {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 7px;
    right: 55px;
  }

  .option-block-4 {
    position: absolute;
    top: 110px;
    left: 16px;
    right: 16px;
    height: 40%;

    .option {
      border-color: #87929d;
      border-width: 1px;
      background-color: white;
      border-radius: 4px;
      height: 50%;
      width: 45%;
      margin: 4px 6px 4px 6px;
      white-space: normal;
    }
  }

  .submit-btn-done {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 260px;
    height: 40px;
    background-color: #c2c8cc !important;
    color: white !important;
    opacity: 1 !important;
    box-shadow: none !important;
    font-size: 14px;
  }
}

.option-block-done-2 {
  position: absolute;
  top: 110px;
  left: 16px;
  right: 16px;
  height: 40%;

  .option-done-selected {
    border-color: #87929d;
    border-width: 1px;
    background-color: #87929d;
    color: white;
    border-radius: 4px;
    width: 45%;
    height: 100%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }

  .option-done {
    border-color: #e9ebed;
    border-width: 1px;
    background-color: #e9ebed;
    color: #87929d;
    border-radius: 4px;
    width: 45%;
    height: 100%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }
}

.option-block-done-4 {
  position: absolute;
  top: 110px;
  left: 16px;
  right: 16px;
  height: 40%;

  .option-done-selected {
    border-color: #87929d;
    border-width: 1px;
    background-color: #87929d;
    color: white;
    border-radius: 4px;
    width: 45%;
    height: 50%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }

  .option-done {
    border-color: #e9ebed;
    border-width: 1px;
    background-color: #e9ebed;
    color: #87929d;
    border-radius: 4px;
    width: 45%;
    height: 50%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }
}

.option-block-done-6 {
  position: absolute;
  top: 110px;
  left: 16px;
  right: 16px;
  height: 40%;

  .option-done-selected {
    border-color: #87929d;
    border-width: 1px;
    background-color: #87929d;
    color: white;
    border-radius: 4px;
    width: 45%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }

  .option-done {
    border-color: #e9ebed;
    border-width: 1px;
    background-color: #e9ebed;
    color: #87929d;
    border-radius: 4px;
    width: 45%;
    margin: 4px 6px 4px 6px;
    white-space: normal;
  }
}

.submit-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 274px;
  height: 40px;
  background-color: #ff8600;
  color: white;
  font-size: 14px;
  .btn-text {
    position: relative;
    left: -20px;
    top: -2px;
  }
  .dollar-coin {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 7px;
    right: 55px;
  }
}

.submit-btn-done {
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 274px;
  height: 40px;
  background-color: #c2c8cc !important;
  color: white !important;
  opacity: 1 !important;
  box-shadow: none !important;
  font-size: 14px;
}
</style>
