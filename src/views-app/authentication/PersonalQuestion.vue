<template>
  <div class="peronal-question">
    <div class="personalPageContent">
      <van-tabs 
        v-model="tabActive"
        animated
        color="#ff8600"
        title-active-color="#ff8600">
          <van-tab 
            :disabled="this.tab1disable">
            <div class="questionTitle">{{ form1.question }}</div>
            <div class="card1">
              <div class="cardTitle">{{ form1.options[0] }}</div>
            </div>
            <div class="card2">
              <div class="cardTitle">{{ form1.options[1] }}</div>
            </div>
            <div class="card3">
              <div class="cardTitle">{{ form1.options[2] }}</div>
            </div>
            <div class="card4">
              <div class="cardTitle">{{ form1.options[3] }}</div>
            </div>
          
            
          
          
          
          </van-tab>
          <van-tab 
            :disabled="this.tab2disable">
            <div class="questionTitle">{{ form2.question }}</div>
            <div class="card1">
              <div class="cardTitle">New <span class="cardSmailTitle">(Less than 3 Months)</span></div>
            </div>
            <div class="card5">
              <div class="cardTitle">{{ form2.options[1] }}</div>
            </div>
            <div class="card3">
              <div class="cardTitle">{{ form2.options[2] }}</div>
            </div>


          </van-tab>

          <van-tab title="">
            <div class="questionTitle">{{ form3.question }}</div>
            <div class="card2">
              <div class="cardTitle">{{ form3.options[0] }}</div>
            </div>
            <div class="card5">
              <div class="cardTitle">{{ form3.options[1] }}</div>
            </div>
            <div class="card4">
              <div class="cardTitle">{{ form3.options[2] }}</div>
            </div>



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
      form1: { },
      form2: { },
      form3: { }, 
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true,
      tab1disable: false,
      tab2disable: false
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
        tab1disable = true;
        this.tabActive = this.tabActive+1;
      }else if (this.tabActive === 1){
        tab2disable = true;
        this.tabActive = this.tabActive+1;
        this.$router.push({ name: "Home" });
      }
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
    position: relative;
    margin: 16px 0 16px 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #5BCFF2;
    .cardTitle{
      position: absolute;
      left: 16px;
    }
  }

  .card2 {
    font-size: 20px;
    position: relative;
    margin: 16px 0 16px 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #FDAE44;
    .cardTitle{
      position: absolute;
      left: 16px;
    }
  }

  .card3 {
    font-size: 20px;
    position: relative;
    margin: 16px 0 16px 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #70CB9D;
    .cardTitle{
      position: absolute;
      left: 16px;
    }
  }

  .card4 {
    font-size: 20px;
    position: relative;
    margin: 16px 0 16px 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #DDE0E2;
    .cardTitle{
      position: absolute;
      left: 16px;
    }
  }

  .card5 {
    position: relative;
    margin: 16px 0 16px 0;
    height: 80px;
    width: 328px;
    line-height: 80px;
    color: black;
    background-color: #76D69C;
    
    .cardTitle{
      position: absolute;
      left: 16px;
      font-size: 20px;
    }

    .cardSmailTitle{
      font-size: 16px;
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
