<template>
  <div class="peronal-question">
    <div
      class="personalPageContent"
      v-show="questionPage"
    >
      <div class="am-progress">
        <div class="am-progress-bar1"></div>
        <div
          class="am-progress-bar2"
          :style="tabActive > 0 ? 'background-color: #fdae44;' : ''"
        >
        </div>
        <div
          class="am-progress-bar3"
          :style="tabActive === 2 ? 'background-color: #fdae44;' : ''"
        >
        </div>
      </div>

      <van-tabs
        v-model="tabActive"
        animated
        color="#000000"
        title-active-color="#000000"
        border="false"
      >

        <van-tab
          title=""
          v-for="(fm,i) in form"
          :key="fm.id"
        >
          <div class="questionTitle">{{ fm.question }}</div>
          <div
            v-for="(item,index) in fm.options"
            :key="index"
          >
            <van-button
              class="card"
              :style="{'backgroundColor': formClass[`classId${i+1}`][index].btnBgColor}"
              @click="answer(i, fm.id, item)"
            >{{ item }}
              <i
                :class="formClass[`classId${i+1}`][index].iconName"
                :style="{'color': formClass[`classId${i+1}`][index].iconColor}"
              />
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
      <div>
        <i class="iconfont iconsuccess" />
        <div class="title">{{ $tc('Login.completeQuestion', 1)}}<br>{{ $tc('Login.completeQuestion', 2)}}</div>
      </div>

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
      tab0: false,
      tab1: false,
      tab2: false,
      allSkip: true,
      formClass: {
        classId1: [
          {
            iconName: "iconfont iconretail",
            btnBgColor: "#5bcff2",
            iconColor: "#3D9AC7"
          },
          {
            iconName: "iconfont iconrestaurant",
            btnBgColor: "#fdae44",
            iconColor: "#E2761E"
          },
          {
            iconName: "iconfont iconservice",
            btnBgColor: "#70cb9d",
            iconColor: "#32A974"
          },
          {
            iconName: "iconfont iconlike",
            btnBgColor: "#e9ebed",
            iconColor: "#c2c8cc"
          }
        ],
        classId2: [
          {
            iconName: "iconfont iconphasesignin1",
            btnBgColor: "#5bcff2",
            iconColor: "#3D9AC7"
          },
          {
            iconName: "iconfont iconphasesignin",
            btnBgColor: "#8fd1cd",
            iconColor: "#3c9e98"
          },
          {
            iconName: "iconfont iconmaturedbusiness",
            btnBgColor: "#70cb9d",
            iconColor: "#32A974"
          }
        ],
        classId3: [
          {
            iconName: "iconfont iconincrease-sales",
            btnBgColor: "#fdae44",
            iconColor: "#E2761E"
          },
          {
            iconName: "iconfont iconexpandsignin",
            btnBgColor: "#70cb9d",
            iconColor: "#32A974"
          },
          {
            iconName: "iconfont iconexploresignin",
            btnBgColor: "#e9ebed",
            iconColor: "#c2c8cc"
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
        this.form = res.data.data.questions.reverse();
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
          query: this.$route.query
        });
        this.tab1 = true;
        this.tabActive = 1;
      } else if (this.tabActive === 1) {
        this.$router.push({
          name: "PersonalQuestion",
          params: { id: 2 },
          query: this.$route.query
        });
        this.tab1 = this.tab2 = true;
        this.tabActive = 2;
      } else {
        if (this.allSkip) {
          this.$store.commit("UnfirstLaunch");
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
        query: this.$route.query
      });
      if (this.tabActive === 2) {
        this.sendAnswer();
      } else {
        this.tabActive += 1;
        this.$router.replace({
          name: "PersonalQuestion",
          params: { id: this.tabActive },
          query: this.$route.query
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
  > div {
    width: 200px;
    height: 140px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -70px;
    margin-left: -100px;
    text-align: center;
    .title {
      height: 70px;
      color: #000000;
      font-size: 24px;
      text-align: center;
    }
    .iconfont.iconsuccess {
      font-size: 70px;
      color: #32a974;
    }
  }
}

.peronal-question {
  background-size: cover;
  height: 100vh;

  .am-progress {
    position: fixed;
    top: 45px;
    left: 16px;
    height: 6px;
    width: 196px;
    z-index: 999;

    @mixin am-position {
      position: absolute;
      width: 65px;
      height: 6px;
    }

    .am-progress-bar1 {
      @include am-position;
      background-color: #fdae44;
    }

    .am-progress-bar2 {
      @include am-position;
      left: 72px;
      background-color: #dde0e2;
    }

    .am-progress-bar3 {
      @include am-position;
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

  .card {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: calc(100vw - 32px);
    line-height: 80px;
    width: calc(100% - 32px);
    color: #000000;
    .iconfont {
      position: absolute;
      right: 16px;
      color: #3d9ac7;
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

    > .iconfont {
      position: absolute;
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

<style lang="scss">
  .peronal-question {
    .van-tabs__line {
      height: 0 !important;
    }
    .van-tabs__wrap {
      height: 0 !important;
    }
    .van-hairline--top-bottom {
      height: 0 !important;
    }
    .van-tabs__wrap {
      height: 56px !important;
      width: 179px !important;
    }
    .van-hairline--top-bottom {
      width: 179px !important;
    }
  }

</style>
