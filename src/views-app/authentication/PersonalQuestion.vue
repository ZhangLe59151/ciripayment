<template>
  <div class="peronal-question">
    <div
      class="personalPageContent"
      v-show="questionPage"
    >
    <div class="am-progress">
      <div class="am-progress-bar1"></div>
      <div class="am-progress-bar2" :style="tabActive > 0 ? 'background-color: #fdae44;' : ''"></div>
      <div class="am-progress-bar3" :style="tabActive === 2 ? 'background-color: #fdae44;' : ''"></div>
    </div>
      <van-tabs
        v-model="tabActive"
        animated
        color="#fdae44"
        title-active-color="#fdae44"
      >
        <van-tab
          title=""
          :disabled="this.tab1"
        >
          <div class="questionTitle">{{ form[2].question }}</div>
          <div
            v-for="(item,index) in form[2].options"
            :key="index"
          >
            <van-button
              :class="formClass.classId1[index].className"
              @click="answer(0, form[2].id, item)"
            >{{ item }}
              <i :class="formClass.classId1[index].iconName" />
            </van-button>

          </div>

        </van-tab>
        <van-tab :disabled="this.tab2">
          <div class="questionTitle">{{ form[1].question }}</div>
          <div
            v-for="(item,index) in form[1].options"
            :key="index"
          >
            <van-button
              :class="formClass.classId2[index].className"
              @click="answer(0, form[1].id, item)"
            >{{ item }}
              <i :class="formClass.classId2[index].iconName" />
            </van-button>

          </div>

        </van-tab>

        <van-tab title="">
          <div class="questionTitle">{{ form[0].question }}</div>
          <div
            v-for="(item,index) in form[0].options"
            :key="index"
          >
            <van-button
              :class="formClass.classId3[index].className"
              @click="answer(0, form[0].id, item)"
            >{{ item }}
              <i :class="formClass.classId3[index].iconName" />
            </van-button>
          </div>

        </van-tab>
      </van-tabs>

      <div
        class="skipword"
        @click="skipQuestion"
      >{{ $t('Login.skipQuestion') }}</div>
    </div>
    <div
      class="splashPage"
      v-show="splash"
    >
      <img
        class="icon"
        :src="iconSucceed"
      />
      <div class="title">{{ $tc('Login.completeQuestion', 1)}}<br>{{ $tc('Login.completeQuestion', 2)}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "personal-question",

  data() {
    return {
      splash: false,
      questionPage: true,
      tabActive: 0,
      tab1: false,
      tab2: false,
      allSkip: true,
      iconSucceed: require("@/assets/imgs/personal/success.svg"),
      iconBk: require("@/assets/imgs/personal/confetti.png"),
      formClass: {
        classId1: [
          {
            iconName: "iconfont iconretail",
            btnBackgroundColor: "#5bcff2",
            iconColor: "#3D9AC7",
            className: "card1"
          },
          {
            iconName: "iconfont iconrestaurant",
            btnBackgroundColor: "#fdae44",
            iconColor: "#E2761E",
            className: "card2"
          },
          {
            iconName: "iconfont iconservice",
            btnBackgroundColor: "#70cb9d",
            iconColor: "#32A974",
            className: "card3"
          },
          {
            iconName: "iconfont iconlike",
            btnBackgroundColor: "#fdae44",
            iconColor: "#E2761E",
            className: "card4"
          }
        ],
        classId2: [
          {
            iconName: "iconfont iconphasesignin1",
            btnBackgroundColor: "#5bcff2",
            iconColor: "#3D9AC7",
            className: "card1"
          },
          {
            iconName: "iconfont iconphasesignin",
            btnBackgroundColor: "#fdae44",
            iconColor: "#E2761E",
            className: "card5"
          },
          {
            iconName: "iconfont iconmaturedbusiness",
            btnBackgroundColor: "#70cb9d",
            iconColor: "#32A974",
            className: "card3"
          }
        ],
        classId3: [
          {
            iconName: "iconfont iconincrease-sales",
            btnBackgroundColor: "#5bcff2",
            iconColor: "#3D9AC7",
            className: "card1"
          },
          {
            iconName: "iconfont iconexpandsignin",
            btnBackgroundColor: "#fdae44",
            iconColor: "#E2761E",
            className: "card5"
          },
          {
            iconName: "iconfont iconexploresignin",
            btnBackgroundColor: "#70cb9d",
            iconColor: "#32A974",
            className: "card4"
          }
        ]
      },
      form: [{ options: [] }, { options: [] }, { options: [] }],
      answerList: [
        { id: 0, value: " " },
        { id: 1, value: " " },
        { id: 2, value: " " }
      ]
    };
  },
  created() {
    this.$api.getQuestionPersonal(1).then(res => {
      if (res.data.code === 200) {
        this.form = res.data.data.questions;
      }
    });
  },
  methods: {
    skipQuestion() {
      const to = this.$route.query.to;
      if (this.tabActive === 0) {
        this.$router.push({
          name: "PersonalQuestion",
          params: { id: 1 },
          query: { to: to }
        });
        this.tab1 = true;
        this.tabActive = 1;
      } else if (this.tabActive === 1) {
        this.$router.push({
          name: "PersonalQuestion",
          params: { id: 2 },
          query: { to: to }
        });
        this.tab1 = this.tab2 = true;
        this.tabActive = 2;
      } else {
        if (this.allSkip) {
          this.$store.commit("UnfirstLaunch");
          if (to === "EnterLoanInfo") {
            this.$api.getHomePageInfo().then(res => {
              if (res.data.code === 200) {
                // check if user already has loan
                const hasLoan = res.data.data.hasLoan;
                // if already got loan, move to Loan result page instead of Loan Form
                if (hasLoan && ["EnterLoanInfo"].includes(to)) {
                  this.$router.push({ name: "Loan" });
                  return false;
                }
                // else- check credit limit to see if he can apply loan
                this.$api.verifyLoanApplyAble().then(res => {
                  if (res.data.code === 200) {
                    res.data.data.verifyResult
                      ? this.$router.push({ name: "EnterLoanInfo" })
                      : this.$router.push({
                          name: "LoanAmountExceedLimitError"
                        });
                  } else {
                    this.$notify(res.data.msg);
                  }
                });
              }
            });
            return false;
          }
          this.$router.push(to ? { name: to } : { name: "Home" });
        } else {
          this.sendAnswer();
        }
      }
    },
    sendAnswer() {
      this.$api.postAnswerPersonal(this.answerList).then(res => {
        if (res.data.code === 200) {
          const to = this.$route.query.to;
          this.splash = true;
          this.$store.commit("UnfirstLaunch");
          this.questionPage = false;
          setTimeout(() => {
            if (to === "EnterLoanInfo") {
              this.$api.getHomePageInfo().then(res => {
                if (res.data.code === 200) {
                  // check if user already has loan
                  const hasLoan = res.data.data.hasLoan;
                  // if already got loan, move to Loan result page instead of Loan Form
                  if (hasLoan && ["EnterLoanInfo"].includes(to)) {
                    this.$router.push({ name: "Loan" });
                    return false;
                  }
                  // else- check credit limit to see if he can apply loan
                  this.$api.verifyLoanApplyAble().then(res => {
                    if (res.data.code === 200) {
                      res.data.data.verifyResult
                        ? this.$router.push({ name: "EnterLoanInfo" })
                        : this.$router.push({
                            name: "LoanAmountExceedLimitError"
                          });
                    } else {
                      this.$notify(res.data.msg);
                    }
                  });
                }
              });
              return false;
            }
            this.$router.push(to ? { name: to } : { name: "Home" });
          }, 1000);
        }
      });
    },
    answer(answerid, id, answer) {
      const to = this.$route.query.to;
      this.allSkip = false;
      this.answerList[answerid].id = id;
      this.answerList[answerid].value = answer;
      this.$router.push({
        name: "PersonalQuestion",
        params: { id: answerid },
        query: { to: to }
      });
      if (this.tabActive === 2) {
        this.sendAnswer();
      } else {
        this.tabActive += 1;
        this.$router.push({
          name: "PersonalQuestion",
          params: { id: this.tabActive },
          query: { to: to }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.splashPage {
  background: url("../../assets/imgs/personal/confetti.png") no-repeat;
  background-size: cover;
  height: 100vh;

  .title {
    position: fixed;
    top: calc(50vh + 110px);
    left: calc(50vw - 102px);
    width: 204px;
    color: #000000;
    font-size: 24px;
    text-align: center;
  }

  .icon {
    position: fixed;
    top: calc(50vh - 50px);
    left: calc(50vw - 50px);
    height: 100px;
    width: 100px;
  }
}

.peronal-question {
  //background: url("../../assets/imgs/landing_bg.png") no-repeat;
  background-size: cover;
  height: 100vh;

  .am-progress {
    position: fixed;
    top: 45px;
    left: 16px;
    height: 6px;
    width: 196px;
    z-index: 999;

    .am-progress-bar1 {
      position: absolute;
      width: 65px;
      height: 6px;
      background-color: #fdae44;
    }

    .am-progress-bar2 {
      position: absolute;
      width: 65px;
      height: 6px;
      left: 72px;
      background-color: #dde0e2;
    }

    .am-progress-bar3 {
      position: absolute;
      width: 65px;
      height: 6px;
      left: 143px;
      background-color: #dde0e2;
    }
  }


  .personalPageContent {
    position: fixed;
    margin: 0 16px 0 16px;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .questionTitle {
    margin: 48px 0 0 0;
    font-size: 24px;
  }

  .card1 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    width: calc(100% - 32px);
    color: #000000;
    background-color: #5bcff2;

    .iconretail {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3d9ac7;
    }

    .iconphasesignin1 {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3d9ac7;
    }

    .iconincrease-sales {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3d9ac7;
    }
  }

  .card2 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    color: #000000;
    background-color: #fdae44;

    .iconrestaurant {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #e2761e;
    }
  }

  .card3 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    color: #000000;
    background-color: #70cb9d;

    .iconservice {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32a974;
    }

    .iconmaturedbusiness {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32a974;
    }

    .iconexploresignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32a974;
    }
  }

  .card4 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    color: #000000;
    background-color: #dde0e2;

    .iconlike {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #bac1c5;
    }

    .iconexploresignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #bac1c5;
    }
  }
 
  .card5 {
    position: relative;
    font-size: 20px;
    text-align: left;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    color: #000000;
    background-color: #76d69c;

    .cardSmailTitle {
      font-size: 16px;
    }

    .iconphasesignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32a974;
    }

    .iconexpandsignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32a974;
    }
  }

  .iconfont {
    font-size: 34px;
  }

}

.skipword {
  position: fixed;
  color: #87929d;
  text-align: center;
  font-size: 14px;
  left: 0;
  width: 100%;
  bottom: 40px;
}

</style>