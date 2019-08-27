<template>
  <div class="peronal-question">
    <div class="personalPageContent">
      <van-tabs 
        v-model="tabActive"
        animated
        color="#ff8600"
        title-active-color="#ff8600">
          <van-tab 
            :disabled="this.tab1">
            <div class="questionTitle">{{ form1.question }}</div>
            <van-button class="card1" @click="answer(form1.id, form1.options[0])">{{ form1.options[0] }}<img class="icon" :src="icon11" /></van-button>
            <van-button class="card2" @click="answer(form1.id, form1.options[1])">{{ form1.options[1] }}<img class="icon" :src="icon12" /></van-button>
            <van-button class="card3" @click="answer(form1.id, form1.options[2])" >{{ form1.options[2] }}<img class="icon" :src="icon13" /></van-button>
            <van-button class="card4" @click="answer(form1.id, form1.options[3])">{{ form1.options[3] }}<img class="icon" :src="icon14" /></van-button>
          
            
          
          
          
          </van-tab>
          <van-tab 
            :disabled="this.tab2">
            <div class="questionTitle">{{ form2.question }}</div>
            <van-button class="card1" @click="answer(form2.id, form2.options[0])">{{ form2.options[0] }}</van-button>
            <van-button class="card5" @click="answer(form2.id, form2.options[1])">{{ form2.options[1] }}</van-button>
            <van-button class="card3" @click="answer(form2.id, form2.options[2])" >{{ form2.options[2] }}</van-button>



          </van-tab>

          <van-tab title="">
            <div class="questionTitle">{{ form3.question }}</div>
            <van-button class="card2" @click="answer(form3.id, form3.options[0])">{{ form3.options[0] }}</van-button>
            <van-button class="card5" @click="answer(form3.id, form3.options[1])">{{ form3.options[1] }}</van-button>
            <van-button class="card4" @click="answer(form3.id, form3.options[2])" >{{ form3.options[2] }}</van-button>



          </van-tab>
      </van-tabs>



      <div 
        class="skipword"
        @click="skipQuestion">Skip Question</div>
    </div>
   
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "personal-question",
  computed: {
    ...mapState({
      columns: "nationalCodeList",
    }),
  },
  data() {
    return {
      tabActive: 0,
      tab1: false,
      tab2: false,
      icon11: require("@/assets/imgs/personal/retailstoresignin.svg"),
      icon12: require("@/assets/imgs/personal/restaurantsignin.svg"),
      icon13: require("@/assets/imgs/personal/servicesignin.svg"),
      icon14: require("@/assets/imgs/personal/servicesignin.svg"),
      pathIcon: require("@/assets/imgs/personal/retailstoresignin.png"),
      pathIcon: require("@/assets/imgs/personal/retailstoresignin.png"),
      pathIcon: require("@/assets/imgs/personal/retailstoresignin.png"),
      form1: { },
      form2: { },
      form3: { }, 
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true
    };
  },
  created() {
    this.$api.getQuestion(1).then(res => {
      if (res.data.code === 200) {
        //debugger
        this.form1 = res.data.data.questions[0];
        this.form2 = res.data.data.questions[1];
        this.form3 = res.data.data.questions[2];
      }
    });
  },
  methods: {
    skipQuestion(){
      if (this.tabActive === 0) {
        this.tab1= true;
        this.tabActive = this.tabActive+1;
      }else if (this.tabActive === 1){
        this.tab2 = true;
        this.tabActive = this.tabActive+1;
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    answer(id, answer) {
      const form = Object.assign({}, { id: id, value: answer });
      this.$api.postAnswer(form).then(res => {
        if (res.data.code === 200) {
          if (this.tabActive===0) { this.tabActive = this.tabActive + 1; this.tab1 = true; }
          else if (this.tabActive===1) { this.tabActive = this.tabActive + 1; this.tab2 = true; }
          else { this.$router.push({ name: "Home" }); }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #5BCFF2;
    .icon {
      position: absolute;
      height:40px;
      width: 40px;
      right: 16px;
      top: 16px;
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
    background-color: #FDAE44;
    .icon {
      position: absolute;
      height:40px;
      width: 40px;
      right: 16px;
      top: 16px;
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
    background-color: #70CB9D;
    .icon {
      position: absolute;
      height:40px;
      width: 40px;
      right: 16px;
      top: 16px;
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
    background-color: #DDE0E2;
    .icon {
      position: absolute;
      height:40px;
      width: 40px;
      right: 16px;
      top: 16px;
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
    background-color: #76D69C;
    .cardSmailTitle{
      font-size: 16px;
    }
    .icon {
      position: absolute;
      height:40px;
      width: 40px;
      right: 16px;
      top: 16px;
    }
  }
}

.skipword {
  position: fixed;
  color: #87929D;
  text-align: center;
  font-size: 14px;
  left: 0;
  width: 100%;
  bottom: 40px;
}
</style>

<style lang="scss">
.loginWrapper {
  .el-form-item__error {
    position: relative;
    left: 15px;
  }
}
</style>
