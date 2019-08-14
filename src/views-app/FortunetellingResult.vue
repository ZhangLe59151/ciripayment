<template>
  <div class="fortunetelling-result">
    <WapHeader
      :center="true"
      style="top: 34px"
    />
    <div class="fortunetelling-result-content">

    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import WapHeader from "@/components/WapHeader";
export default {
  name: "FortunetellingResult",
  components: {
    WapHeader
  },
  computed: {
    ...mapState({
      columns: "nationalCodeList",
      nationCode: "nationalCode"
    })
  },
  data() {
    return {
      show: false,
      form: {},
      phoneValidationPattern: this.$store.state.phone.thaiExp,
      showComponents: true
    };
  },
  methods: {
    onConfirm(value, index) {
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    handleStart() {
    }
  },
  created() {
    this.form.nationalCode = this.columns[0];
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn";
.landing-page {
  background: url("../assets/imgs/MP-background.png");
  min-height: 100vh;
  .landingPageContent {
    position: fixed;
    bottom: 0;
    width: 100%;
    .loginWrapper {
      padding-top: 30px;
      background-color: white;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding-left: 5%;
      padding-right: 5%;
    }
  }

  .slogan-title {
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 80%;
    margin-left: 10%;
  }
  .slogan-sub {
    text-align: center;
    color: white;
    font-size: 16px;
    margin-bottom: 20px;
    width: 80%;
    margin-left: 8%;
  }
  .title {
    font-size: 20px;
    padding: 20px;
  }
  .tips {
    font-size: 14px;
  }

  .otp {
    text-align: left;
    font-size: 15px;
  }
  .bottom-btn {
    background-color: #FF8600;
    border-radius: 4px;
    margin: 1.25rem 0;
    width: 100%;
  }
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
