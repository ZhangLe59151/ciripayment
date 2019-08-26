<template>
  <div class="peronal-question">
    <div class="personalPageContent">
      <van-tabs 
        v-model="tabActive"
        animated
        color="#ff8600"
        title-active-color="#ff8600">
          <van-tab title="">
            <div class="questionTitle">I Own A...</div>
            <div class="card1">
              <div class="cardTitle">Retail Store</div>
            </div>
            <div class="card2">
              <div class="cardTitle">Restaurant</div>
            </div>
            <div class="card3">
              <div class="cardTitle">Service Business</div>
            </div>
            <div class="card4">
              <div class="cardTitle">Others</div>
            </div>
          
            
          
          
          
          </van-tab>
          <van-tab title="">
            <div class="questionTitle">My Business Is...</div>
            <div class="card1">
              <div class="cardTitle">New <span class="cardSmailTitle">(Less than 3 Months)</span></div>
            </div>
            <div class="card5">
              <div class="cardTitle">Growing (3 Months - 2 Years</div>
            </div>
            <div class="card3">
              <div class="cardTitle">Established (2+ Years)</div>
            </div>


          </van-tab>

          <van-tab title="">
            <div class="questionTitle">I Most Want To...</div>
            <div class="card2">
              <div class="cardTitle">Increase Sales</div>
            </div>
            <div class="card5">
              <div class="cardTitle">Expand My Business</div>
            </div>
            <div class="card4">
              <div class="cardTitle">Just Exploring The App</div>
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
      nationCode: "nationalCode"
    }),
    sloganTitle() {
      const ob = {
        EnterLoanInfo: "Sign In Now To Get An Instant Loan! ",
        Credit: "Sign In Now To See Your Credit Limit! ",
        fortuneTelling: "Sign In Now To Get Your Daily Fortune!"
      };

      return ob[this.$route.query.to];
    }
  },
  data() {
    return {
      tabActive: 0,
      form: {
        questionid: 0,
        answer: ""
      },
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true
    };
  },
  methods: {
    skipQuestion(){
      if (this.tabActive < 2) {
        this.tabActive = this.tabActive+1;
      }else {
        this.$router.push({ name: "Home" });
      }
    }
  },
  created() {
    this.form.nationalCode = this.columns[0];
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
