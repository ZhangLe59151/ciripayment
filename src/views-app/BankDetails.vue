<template>
  <div class="bank-details">
    <app-profile-bank-header title="Bank Details" />
    <div class="bank-info">
      <div class="subtitle">Bank</div>
      <div class="bank-box">
        <img :src="imgUrl">
        <div class="bank-name">{{bankName}}</div>
      </div>
    </div>

    <div class="bank-form">
      <el-form
        label-width="0px"
        status-icon
        :model="form"
        ref="elForm"
        size="small"
        label-position="top"
        style="width: 100%; margin-top: 10px;"
      >
        <el-form-item
          label="Name on Bank Account"
          prop="accountName"
          :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },{ validator: checkSpecificKey, message: 'Please enter a valid Account Name', trigger: 'blur'}]"
        >
          <el-input
            v-model="form.accountName"
            placeholder=""
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Bank Account Number"
          prop="accountNo"
          :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },
      { pattern: this.$store.state.validationPatterns.bankAccount, message: 'Please enter a valid Account No.', trigger: 'blur'}]"
        >
          <el-input
            v-model="form.accountNo"
            placeholder="Personal Account No."
            :maxlength="20"
          ></el-input>
        </el-form-item>
      </el-form>

      <van-button
        class="bottom-btn"
        @click="handleNext"
      >
        Save Account
      </van-button>
    </div>
  </div>
</template>

<script>
import AppProfileBankHeader from "@/components/AppProfileBankHeader";
import { mapState } from "vuex";
import { find } from "lodash";
export default {
  name: "BankDetails",
  components: {
    AppProfileBankHeader
  },
  data() {
    return {
      imgUrl: require(`@/assets/imgs/bank0${this.$route.params.id}.png`),
      form: {}
    };
  },
  computed: {
    ...mapState({
      bankName(state) {
        const item = find(state.bankList, { id: this.$route.params.id });
        return item ? item.name : "";
      },
      bankInfo: state => state.merchantProfile.bankAccountVoList[0]
    })
  },
  methods: {
    checkSpecificKey(rule, value, callback) {
      var specialKey = this.$store.state.validationPatterns.invalidCharset;
      for (var i = 0; i < value.length; i++) {
        if (specialKey.indexOf(value.substr(i, 1)) !== -1) {
          callback(new Error(rule.message));
        }
      }
      callback();
    },
    handleNext() {
      const errMsg =
        "There are errors in your form. Please correct them before trying again.";
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          this.submit();
          return false;
        }
        this.$notify({
          message: errMsg,
          duration: 3000
        });
        return false;
      });
    },
    submit() {
      const params = Object.assign({}, this.form, {
        bankCode: this.$route.params.id,
        bankName: this.bankName,
        refId: this.bankInfo.refId,
        refType: this.bankInfo.refType,
        id: this.bankInfo.id
      });
      this.$api.updateBankAcc(params).then(res => {
        if (res.data.code === 200) {
          this.$toast("Update Bank Account Successful!");
          this.$router.push({ name: "Profile" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bank-details {
  height: 100vh;
  overflow: hidden;
  position: relative;
  .bank-info {
    margin: 24px 16px;
    .subtitle {
      font-size: 14px;
      color: #2f3941;
    }

    .bank-box {
      width: 100%;
      margin-top: 8px;
      height: 60px;
      background: #ffffff;
      border: 1px solid #e9ebed;
      box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      position: relative;

      img {
        height: 28px;
        width: 28px;
        position: absolute;
        top: 16px;
        left: 16px;
      }

      .bank-name {
        font-size: 14px;
        color: #2f3941;
        position: absolute;
        top: 22px;
        left: 60px;
      }
    }
  }

  .bank-form {
    margin: 24px 16px;
  }

  .bottom-btn {
    width: calc(100% - 32px);
    position: absolute;
    bottom: 20px;
  }
}
</style>
