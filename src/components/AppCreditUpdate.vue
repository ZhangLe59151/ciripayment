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
            prop="Q1"
          >
            <el-row v-if="!Answers || !Answers.Q1">
              <el-col :span="18">
                <el-input inputmode="numeric" v-model="form.Q1" >
                  <div class="currency" slot="suffix">{{$store.state.currency}}</div>
                </el-input>
              </el-col>
              <el-col :span="5" :offset="1">
                <van-button
                  size="small"
                  @click="submitAnswers"
                  v-bind:class="[(!form.Q1) ? 'submit-btn disabled' : 'submit-btn']"
                  :disabled="!form.Q1"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="2">
                <van-checkbox v-model="checked" checked-color="#04A777"></van-checkbox>
              </el-col>
              <el-col :span="21" class="submittedAnswer">
                {{Answers.Q1}} {{$store.state.currency}}
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div class="box-card">
          <el-form-item
            label="What's your monthly expenses?"
            prop="Q2"
          >
            <el-row v-if="!Answers || !Answers.Q2">
              <el-col :span="18">
                <el-input inputmode="numeric" v-model="form.Q2" >
                  <div class="currency" slot="suffix">{{$store.state.currency}}</div>
                </el-input>
              </el-col>
              <el-col :span="5" :offset="1">
                <van-button
                  size="small"
                  class="submit-btn"
                  @click="submitAnswers"
                  v-bind:class="[(!form.Q2) ? 'submit-btn disabled' : 'submit-btn']"
                  :disabled="!form.Q2"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="2">
                <van-checkbox v-model="checked" checked-color="#04A777"></van-checkbox>
              </el-col>
              <el-col :span="21" class="submittedAnswer">
                {{Answers.Q2}} {{$store.state.currency}}
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        <div class="box-card">
          <el-form-item
            label="What's your favourite restaurant?"
            prop="Q3"
          >
            <el-row v-if="!Answers || !Answers.Q3">
              <el-col :span="18">
                <el-input v-model="form.Q3" >
                </el-input>
              </el-col>
              <el-col :span="5" :offset="1">
                <van-button
                  size="small"
                  class="submit-btn"
                  @click="submitAnswers"
                  v-bind:class="[(!form.Q3) ? 'submit-btn disabled' : 'submit-btn']"
                  :disabled="!form.Q3"
                >Submit</van-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="2">
                <van-checkbox v-model="checked" checked-color="#04A777"></van-checkbox>
              </el-col>
              <el-col :span="21" class="submittedAnswer">
                {{Answers.Q3}}
              </el-col>
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
      form: {}
    }
  },
  computed: {
    ...mapState({
      Answers: state => {
        let emptyAnswer = { Q1: "", Q2: "", Q3: "" };
        let savedAnswer = state.userInfo.creditAnswers;
        return {
          ...emptyAnswer, ...savedAnswer
        }
      }
    })
  },
  // created() {
  //   this.form = this.Answers;
  // },
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
    submitAnswers() {
      let submittingAnswers = this.form;
      let submittedAnswers = this.Answers;
      let updatingAnswers = { ...submittedAnswers, ...submittingAnswers };
      let numberOfAnswered = Object.values(updatingAnswers).filter(String).length;
      let updatingCreditLimit = numberOfAnswered * 10000 + 5000;
      this.$store.commit("UpdateUserInfo", { creditAnswers: updatingAnswers, creditLimit: updatingCreditLimit });
      this.$store.commit("fetchCreditDataFromLocal");
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
      height: 95px;
      box-sizing: border-box;
      .submit-btn{
        background: #FF8600;
        border-radius: 4px;
        height: 40px;
        width: 100%;
        color: white;
        font-size: 14px;
        position: relative;
        top: -4px;
        line-height: 40px;
      }
      .disabled {
        background-color: #E9EBED;
        color: #87929D;
      }
      .submittedAnswer{
        font-size: 24px;
        position: relative;
        top: -2px;
      }
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
    .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: #FF8600;
    }
    .el-input__suffix {
      color: #363f47;
      position: absolute;
      font-size: 16px;
    }
    .van-checkbox__icon--round .van-icon{
      border-radius: 100% !important;
      width: 16px;
      height: 16px;
    }
  }
</style>
