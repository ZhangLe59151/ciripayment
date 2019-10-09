<template>
  <div class="app-loan">
    <loan-app-loan-header v-if="!$route.query.origin"
                          title="Citi Payment"/>
    <van-nav-bar
      v-else
      :left-arrow="!!$route.query.origin"
      @click-left="$router.push({name: 'Home'})"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        Citi Payment
      </div>
    </van-nav-bar>
    <loan-app-loan-overview v-if="showLoanOverview"></loan-app-loan-overview>

    <div
      class="landingPageContent"
      id="login-content"
    >
      <div class="input-block">
        <div
          class="nationalCode"
          @click="show = true"
        >{{form.currency}}
          <van-icon
            class="dropdownIcon"
            name="arrow-down"
          />
        </div>
      </div>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-picker
        show-toolbar
        title="Currency"
        :columns="columns"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
        @cancel="show = false;"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>

</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Loan",
  data() {
    return {
      noLoan: true,
      show: false,
      form: {
        phone: "",
        currency: ""
      },
      columns: ["USD","SGD","CNY"]
    }
  },
  computed: {
    showLoanOverview() {
      return this.noLoan || this.reApply || this.$route.query.reApply;
    }
  },
  created() {
    this.form.currency = this.columns[2];
    if (this.$store.state.OTPVerified) {
      // else check if have loan
      this.$api.getLatestLoan().then(res => {
        if (res.data.code === 200) {
          if (res.data.data) {
            this.noLoan = false;
            this.$store.commit("initLoanProfile", res.data.data);
          }
        }
      });
    }
  },
  methods: {
    onConfirm(value, index) {
      this.form.currency = value;
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-loan {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .header-title {
    font-size: 20px;
    color: #2F3941;
    font-weight: bold;
  }

  .landingPageContent {
    position: relative;
    margin: 100px 16px 0 16px;
    background-color: white;
    height: 194px;
    width: calc(100vw - 32px);
    border-radius: 16px;
    box-shadow: 0 2px 4px 2px #a9a9a9;

    .nationalCode {
      position: absolute;
      left: 16px;
      top: 74px;
      font-size: 14px;
      display: flex;
      line-height: 40px;
      width: 60px;
      justify-content: space-between;
      border-bottom: 1px solid #878787;

      .dropdownIcon {
        position: absolute;
        left: 40px;
        bottom: 14px;
      }
    }

  }

}
</style>
