<template>
  <div
    class="app-edit-record"
    id="edit-record"
  >
    <app-common-header :title="$t('Record.editRecord')" />

    <van-tabs
      v-model="tabActive"
      animated
      color="#ffa702"
      title-active-color="#ffa702"
    >
      <van-tab
        :title="$t('Record.Income')"
        :disabled="this.disable.expenseAmount"
      >
        <div class="record-status">
          <span class="name">{{$t("Record.TotalIncome")}}</span>
          <span class="amount">+ {{ dailyIncome }} <i>{{currency}}</i></span>
        </div>

        <div class="label-left">{{$t("Record.IncomeName")}}</div>

        <div class="input_note">
          <van-field
            v-model="form.memo"
            ref="inputText"
            @focus="inputNote"
            @keyup.enter.native="$refs.inputText.blur()"
            maxlength="30"
            @input="checkLength"
            :placeholder="$t('Record.placeHolder')"
          />
        </div>

        <div class="label-left">{{$t("Record.Date")}}</div>

        <div class="pick_date">
          <van-field
            :value="currentDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            maxlength="13"
            readonly
          />
          <van-icon name="arrow-down" />
        </div>

        <div class="label-left">{{$t("Record.Incomes")}}</div>

        <div class="input_income_expense">
          <div class="plus">+</div>
          <van-field
            class="income"
            v-model="form.incomeAmount"
            @focus="showKeyboard('incomeAmount')"
            maxlength="11"
            readonly
          />
          <div class="plus currency">{{currency}}</div>
        </div>

      </van-tab>
      <van-tab
        :title="$t('Record.Expenses')"
        :disabled="this.disable.incomeAmount"
      >

        <div class="record-status expenses">
          <span class="name">{{$t("Record.TotalExpenses")}}</span>
          <span class="amount">- {{ dailyExpense }} <i>{{currency}}</i></span>
        </div>

        <div class="label-left">{{$t("Record.ExpensesName")}}</div>

        <div class="input_note">
          <van-field
            v-model="form.memo"
            @focus="inputNote"
            maxlength="30"
            @input="checkLength"
            :placeholder="$t('Record.placeHolderRent')"
          />
        </div>

        <div class="label-left">{{$t("Record.Date")}}</div>

        <div class="pick_date">
          <van-field
            :value="currentDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            maxlength="13"
            readonly
          />
          <van-icon name="arrow-down" />
        </div>

        <div class="label-left">{{$t("Record.ExpensesS")}}</div>

        <div class="input_income_expense">
          <div class="plus minus">-</div>
          <van-field
            class="income expense"
            v-model="form.expenseAmount"
            @focus="showKeyboard('expenseAmount')"
            maxlength="11"
            readonly
          />
          <div class="plus currency">{{currency}}</div>
        </div>

      </van-tab>
    </van-tabs>

    <van-row>
      <van-col span="12">
        <div
          ref="btn"
          class="delete_btn"
          @click="deleteBtn"
        >{{$t("Record.deleteRecord")}}</div>
      </van-col>
      <van-col span="12">
        <div
          class="update_btn"
          @click="updateBtn"
        >{{$t("Record.updateRecord")}}</div>
      </van-col>
    </van-row>

    <van-number-keyboard
      :show="showNumber"
      extra-key="."
      :close-button-text="$t('Record.done')"
      @blur="showNumber = false"
      @input="onInput"
      @delete="onDelete"
      @hide="onHide"
      @close="onClose"
    />
  </div>
</template>

<script>
import { findIndex } from "lodash";

import { mapState } from "vuex";
import util from "@/util.js";

const today = new Date();
const startDate = new Date("2019/01/01");
export default {
  name: "AppRecords",

  data() {
    return {
      tabActive: 0,
      form: {
        accountDate: "",
        incomeAmount: "",
        expenseAmount: "",
        memo: "",
        id: 0,
        merchantId: 0
      },
      showNumber: false,
      type: "incomeAmount",
      appear: false,
      minDate: startDate,
      maxDate: today,
      currentDate: "",
      dailyIncome: 0,
      dailyExpense: 0,
      disable: {
        incomeAmount: false,
        expenseAmount: false
      },
      today: ""
    };
  },
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter",
      reg: "reg",
      currency: "currency"
    })
  },
  created() {
    this.viewRecord();
  },
  methods: {
    viewRecord() {
      this.$api.viewRecord(this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          this.type =
            res.data.data.type === 0 ? "incomeAmount" : "expenseAmount";
          this.disable[this.type] = true;
          this.tabActive = res.data.data.type;
          const _today = this.$moment().format(this.localDateFormatter);
          const _yesterday = this.$moment()
            .subtract(1, "days")
            .format(this.localDateFormatter);
          var cDate = this.$moment(res.data.data.accountDate).format(this.localDateFormatter);
          // this.$moment(res.data.data.accountDate).format(this.localDateFormatter); //"D MMM YYYY"
          // util.convertUTCTimeToBuddhistTime(res.data.data.accountDate);
          const kv = {
            [_today]: this.$t("Record.today"),
            [_yesterday]: this.$t("Record.yesterday")
          };
          this.currentDate = cDate
            ? (kv[cDate] ? kv[cDate] : "") +
              util.convertUTCTimeToBuddhistTime(res.data.data.accountDate)
            : "";
          // this.$moment(res.data.data.accountDate).format("D MMM YYYY")
          this.form[this.type] = util.fmoney(res.data.data.amount);
          this.dailyIncome = util.fmoney(res.data.data.incomeSum);
          this.dailyExpense = util.fmoney(res.data.data.expensesSum);
          this.form.memo = res.data.data.memo;
          this.form.id = res.data.data.id;
          this.form.merchantId = res.data.data.merchantId;
        }
      });
    },
    updateRecord(form) {
      this.$api.updateRecord(form).then(res => {
        if (res.data.code === 200) {
          this.viewRecord();
          this.$notify({ message: this.$t("Record.updateSucceed"), background: "#04A777" });
        }
      });
    },
    checkLength(value) {
      if (value.length > 30) {
        this.form.memo = value.slice(0, 30);
      }
    },
    showKeyboard(type) {
      this.appear = false;
      this.showNumber = true;
      this.type = type;
      // increase height of app
      document.getElementById(
        "edit-record"
      ).style.height = `${window.innerHeight * 1.3 - 50}px`;
      // scroll to btn
      var element = this.$refs["btn"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    showNumberFalse() {
      console.log("blur");
      this.showNumber = false;
    },
    onHide() {
      document.getElementById(
        "edit-record"
      ).style.height = `${window.innerHeight - 50}px`;
    },
    onClose() {
      this.showNumber = false;
      document.getElementById(
        "edit-record"
      ).style.height = `${window.innerHeight - 50}px`;
    },
    onInput(value) {
      if (this.form[this.type].length === 11) {
        return false;
      }
      var str = this.form[this.type].replace(',','')
      str = str.replace(',','')
      if (this.form[this.type].indexOf(".") !== -1 && value === ".") {
        return false;
      }
      if (this.form[this.type] === "" && value === ".") {
        return false;
      }
      const regex1 = /^(([1-9][0-9]*)|(([0]\.\d{2}|[1-9][0-9]*\.\d{2})))$/;
      if (
        regex1.test(str) &&
        this.form[this.type].indexOf(".") != -1
      ) {
        return false;
      }
      this.form[this.type] += value;
    },
    onDelete() {
      let kbt = this.form[this.type].toString();
      this.form[this.type] = kbt.length
        ? kbt.substring(0, kbt.length - 1)
        : kbt;
    },
    updateBtn() {
      const form = Object.assign({}, this.form);
      form[this.type] = form[this.type].replace(",", "");
      form[this.type] = form[this.type].replace(",", "");
      form.date = this.$moment(this.form.date).format(this.localDateFormatter);
      this.appear = false;
      if (this.reg.financeAmount.with2dec.test(form[this.type])) {
        form[this.type] = parseFloat(form[this.type]);
        // this.$store.commit("UpdateRecord", this.convertForm(form));
        this.updateRecord(form);
        return false;
      }
      this.$toast("Pls input valid amount.");
    },
    deleteBtn() {
      this.$api.deleteRecord(this.form.id).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            message: "Deleted Sucessfully",
            background: "#04A777"
          });
          this.$router.go(-1);
        }
      });
    },
    convertForm(form) {
      const _date = form.date.includes(",")
        ? form.date.split(", ")[1]
        : form.date;
      form.date = this.$moment(_date).format(this.localDateFormatter);
      return form;
    },
    setDate(value) {
      this.appear = false;
    },
    inputNote() {
      this.appear = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-edit-record {
  height: calc(100vh - 50px);
}
.label-left {
  margin: 16px 16px 0 16px;
  height: 24px;
  font-size: 14px;
  color: #2f3941;

  .link_view_history {
    font-size: 14px;
    color: #ffa702;
    text-align: right;
  }
}

.pick_date {
  height: 40px;
  font-size: 16px;
  margin: 4px 16px 0 16px;
  position: relative;
  > .van-field {
    background: #e9ebed;
    //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 0 10px;
  }
}

.van-icon-arrow-down {
  position: absolute;
  top: 13px;
  right: 10px;
}

.input_income_expense {
  position: relative;
  height: 40px;
  font-size: 16px;
  margin: 4px 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;
  color: #04a777;
  font-size: 16px;

  .plus {
    position: absolute;
    bottom: 10px;
    width: 10px;

    &.minus {
      color: #b41800;
    }

    &.currency {
      right: 0;
      color: #2f3941;
    }
  }

  .income {
    position: absolute;
    bottom: 2px;
    left: 25px;
    right: 25px;
    font-size: 24px;

    &.expense {
      color: #b41800;
    }
  }
}

.input_note {
  min-height: 40px;
  font-size: 24px;
  margin: 0 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;
}

.delete_btn {
  border-radius: 4px;
  border: 1px solid #ffa702;
  font-size: 16px;
  margin: 16px 8px 0 16px;
  text-align: center;
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-color: #ffa702;
  background-color: white;
  color: #ffa702;
  width: 90%;
}

.update_btn {
  border-radius: 4px;
  border: 1px solid #ffa702;
  font-size: 16px;
  margin: 16px 16px 0 8px;
  text-align: center;
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-color: #ffa702;
  color: white;
  background-color: #ffa702;
  width: 90%;
}

.van-picker {
  z-index: 2000;
}

.van-field {
  min-height: 40px;
  line-height: 40px;
  padding: 0;
}

.van-col--20 {
  position: relative;
  top: -4px;
}

.van-col--2 {
  position: relative;
  top: 10px;
}

.record-status {
  background: #21ba8d;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  height: 52px;
  line-height: 52px;
  margin: 16px;
  position: relative;

  &.expenses {
    background: #b41800;
  }

  .name {
    font-size: 10px;
    color: #ffffff;
    font-weight: bold;
    position: absolute;
    left: 16px;
  }

  .amount {
    font-weight: bold;
    font-size: 24px;
    color: #ffffff;
    position: absolute;
    right: 16px;
    i {
      font-size: 12px;
      font-style: normal;
      position: relative;
      top: -10px;
    }
  }
}
</style>

<style lang="scss">
.income .van-field__control {
  color: #04a777 !important;
}

.expense .van-field__control {
  color: #b41800 !important;
}
</style>
