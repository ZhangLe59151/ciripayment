<template>
    <div class="app-credit-update">
      <el-form
        label-width="0px"
        :model="form"
        ref="elForm"
        size="small"
        label-position="top"
        class="elForm"
      >
        <div class="box-card">
          <el-form-item
            label="What's your monthly income?"
            prop="monthlyIncome"
            :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },
            ]"
          >
            <el-row v-if="!Answers || !Answers.Q1">
              <el-col :span="18">
                <el-input inputmode="numeric" pattern="[0-9]*\,*\.*" v-model="form.Q1" @input="activeSubmitButton">
                  <div class="currency" slot="suffix">{{$store.state.currency}}</div>
                </el-input>
              </el-col>
              <el-col :span="4" :offset="2">
                <van-button
                  size="small"
                  class="bottom-btn"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
                <van-checkbox v-model="checked" checked-color="#04A777">{{formatCurrency(Answers.Q1)}}</van-checkbox>
            </el-row>
          </el-form-item>
        </div>
        <div class="box-card">
          <el-form-item
            label="What's your monthly expenses?"
            prop="monthlyIncome"
            :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },
            ]"
          >
            <el-row v-if="!Answers || !Answers.Q2">
              <el-col :span="18">
                <el-input inputmode="numeric" pattern="[0-9]*\,*\.*" v-model="form.Q2" @input="activeSubmitButton">
                  <div class="currency" slot="suffix">{{$store.state.currency}}</div>
                </el-input>
              </el-col>
              <el-col :span="4" :offset="2">
                <van-button
                  size="small"
                  class="bottom-btn"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <van-checkbox v-model="checked" checked-color="#04A777">{{formatCurrency(Answers.Q2)}}</van-checkbox>
            </el-row>
          </el-form-item>
        </div>
        <div class="box-card">
          <el-form-item
            label="What's your favourite restaurant?"
            prop="monthlyIncome"
            :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },
            ]"
          >
            <el-row v-if="!Answers || !Answers.Q3">
              <el-col :span="18">
                <el-input inputmode="numeric" pattern="[0-9]*\,*\.*" v-model="form.Q3" @input="activeSubmitButton">
                  <div class="currency" slot="suffix">{{$store.state.currency}}</div>
                </el-input>
              </el-col>
              <el-col :span="4" :offset="2">
                <van-button
                  size="small"
                  class="bottom-btn"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <van-checkbox v-model="checked" checked-color="#04A777">{{Answers.Q3}}</van-checkbox>
            </el-row>
          </el-form-item>
        </div>
      </el-form>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppCreditUpdate",
  data() {
    return {
      checked: true,
      form: {
        Q1: "",
        Q2: "",
        Q3: ""
      }
    }
  },
  computed: {
    ...mapState({
      Answers: state => state.userInfo.creditAnswers
    })
  },
  methods: {
    formatNumber(n) {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatCurrency(val) {
      val = String(val);
      // don't validate empty input
      if (val === "") {
        return;
      }

      // check for decimal
      if (val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimalPos = val.indexOf(".");

        // split number by decimal point`
        var leftSide = val.substring(0, decimalPos);
        var rightSide = val.substring(decimalPos);

        // add commas to left side of number
        leftSide = this.formatNumber(leftSide);

        // validate right side
        rightSide = this.formatNumber(rightSide);

        // Limit decimal to only 2 digits
        rightSide = rightSide.substring(0, 2);

        // join number by .
        val = leftSide + "." + rightSide;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        val = this.formatNumber(val);
      }
      // send updated string to input
      return val;
    },
    activeSubmitButton() {

    }
  }

}
</script>

<style lang="scss" scoped>
  .app-credit-update{
    flex-grow:1;
    background-color: #E9EBED;
    .box-card{
      background-color: #ffffff;
      padding: 16px;
      margin-bottom: 8px;
    }
  }
</style>

<style lang="scss">
  .app-credit-update {
    .el-input__inner {
      font-size: 24px;
      padding-left: 0;
      padding-bottom: 10px;
    }
    .el-input__suffix {
      color: #363f47;
      position: absolute;
      font-size: 16px;
    }
  }
</style>
