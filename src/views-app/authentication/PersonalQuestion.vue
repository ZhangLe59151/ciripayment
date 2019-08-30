<template>
  <div class="peronal-question">
    <div
      class="personalPageContent"
      v-show="questionPage">
      <van-tabs
        v-model="tabActive"
        animated
        color="#ff8600"
        title-active-color="#ff8600"
      >
        <van-tab title="" :disabled="this.tab1" >
          <div class="questionTitle">{{ form[2].question }}</div>
          <div
            v-for="(item,index) in form[2].options"
            :key="index">
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
            :key="index">
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
            :key="index">
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
      >Skip Question</div>
    </div>
    <div
      class="splashPage"
      v-show="splash"
    >
      <img
        class="icon"
        :src="iconSucceed"
      />
      <div class="title">Profile saved.<br /> Let's get started</div>
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
           { iconName: "iconfont iconretail", btnBackgroundColor: "#5bcff2", iconColor: "#3D9AC7", className:"card1" },
           { iconName: "iconfont iconrestaurant", btnBackgroundColor: "#fdae44", iconColor: "#E2761E", className:"card2" },
           { iconName: "iconfont iconservice", btnBackgroundColor: "#70cb9d", iconColor: "#32A974", className:"card3" },
           { iconName: "iconfont iconlike", btnBackgroundColor: "#fdae44", iconColor: "#E2761E", className:"card4" } 
           ],
        classId2: [
           { iconName: "iconfont iconphasesignin1", btnBackgroundColor: "#5bcff2", iconColor: "#3D9AC7", className:"card1" },
           { iconName: "iconfont iconphasesignin", btnBackgroundColor: "#fdae44", iconColor: "#E2761E", className:"card5" },
           { iconName: "iconfont iconmaturedbusiness", btnBackgroundColor: "#70cb9d", iconColor: "#32A974", className:"card3" }
           ],
        classId3: [
           { iconName: "iconfont iconincrease-sales", btnBackgroundColor: "#5bcff2", iconColor: "#3D9AC7", className:"card1" },
           { iconName: "iconfont iconexpandsignin", btnBackgroundColor: "#fdae44", iconColor: "#E2761E", className:"card5" },
           { iconName: "iconfont iconexploresignin", btnBackgroundColor: "#70cb9d", iconColor: "#32A974", className:"card4" }
           ]
      },
      form: [{ options: [] }, { options: [] }, { options: [] }],
      answerList: [
        { id: 0, value: " " },
        { id: 1, value: " " },
        { id: 2, value: " " }
      ],
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true
    };
  },
  computed: {
    ...mapState({
      columns: "nationalCodeList"
    })
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
      if (this.tabActive === 0) {
        this.$router.push({ name: "PersonalQuestion", params: { id: 1 } });
        this.tab1 = true;
        this.tabActive = 1;
      } else if (this.tabActive === 1) {
        this.$router.push({ name: "PersonalQuestion", params: { id: 2 } });
        this.tab1 = this.tab2 = true;
        this.tabActive = 2;
      } else {
        if (this.allSkip) {
          this.$router.push({ name: "Home" });
        } else {
          this.sendAnswer();
        }
      }
    },
    sendAnswer() {
      this.$api.postAnswerPersonal(this.answerList).then(res => {
        if (res.data.code === 200) {
          this.splash = true;
          this.questionPage = false;
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1500);
        }
      });
    },
    answer(answerid, id, answer) {
      this.allSkip = false;
      this.answerList[answerid].id = id;
      this.answerList[answerid].value = answer;
      this.$router.push({ name: "PersonalQuestion", params: { id: answerid } });
      if (this.tabActive === 2) {
        this.sendAnswer();
        this.$store.commit("UnfirstLaunch");
      } else {
        this.tabActive += 1;
        this.$router.push({
          name: "PersonalQuestion",
          params: { id: this.tabActive }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.splashPage {
  background: url("../../assets/imgs/personal/confetti.png") no-repeat;
  //background: "iconBk" no-repeat;
  background-size: cover;
  height: 100vh;

  .title {
    position: fixed;
    margin: 406px 87px 0 87px;
    color: black;
    font-size: 24px;
    text-align: center;
  }

  .icon {
    position: fixed;
    margin: 286px 130px 0 130px;
    height: 100px;
    weight: 100px;
  }
}

.peronal-question {
  //background: url("../../assets/imgs/landing_bg.png") no-repeat;
  background-size: cover;
  height: 100vh;

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
    line-height: 80px;
    width: calc(100% - 32px);
    color: black;
    background-color: #5bcff2;
    
    .iconretail {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3D9AC7;
    }

    .iconphasesignin1 {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3D9AC7;
    }

    .iconincrease-sales {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #3D9AC7;
    }
  }

  .card2 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #fdae44;

    .iconrestaurant {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #E2761E;
    }

    
  }

  .card3 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #70cb9d;

    .iconservice {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32A974;
    }

    .iconmaturedbusiness {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32A974;
    }

    .iconexploresignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32A974;
    }
  }

  .card4 {
    font-size: 20px;
    text-align: left;
    position: relative;
    margin: 16px 0 0 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #dde0e2;
    
    .iconlike {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #BAC1C5;
    }

    .iconexploresignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #BAC1C5;
    }
  }

  .card5 {
    position: relative;
    font-size: 20px;
    text-align: left;
    margin: 16px 0 0 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #76d69c;

    .cardSmailTitle {
      font-size: 16px;
    }

    .iconphasesignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32A974;
    } 

    .iconexpandsignin {
      position: absolute;
      height: 40px;
      width: 40px;
      right: 16px;
      color: #32A974;
    } 

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
