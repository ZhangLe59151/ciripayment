<template>
  <div
    class="app-add-record"
    id="add-record"
  >
    <app-common-header :title="$t('Record.addRecord')" />
    <van-tabs
      v-model="tabActive"
      animated
      color="#ffa702"
      title-active-color="#ffa702"
    >
      <van-tab 
      :title="$t('Record.Income')"
      :disabled="this.disable.expenseAmount">
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

        <div class="label-left"> {{$t("Record.Date")}}</div>

        <div :class="disableDatePicker ? 'pick_date' : 'pick_date_grey'">
          <van-field
            :value="form.accountDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @focus="onBeginInputDate"
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
      :disabled="this.disable.incomeAmount">

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
            :value="form.accountDate"
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @focus="onBeginInputDate"
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

    <button
      id="btn"
      ref="btn"
      class="update_btn"
      @click="updateBtn"
    >{{$t("Record.add")}}</button>

    <van-row>
      <van-col span="24">
        <van-datetime-picker
          ref="dateTimePicker"
          v-show="appear"
          v-model="choosingDate"
          type="date"
          :confirm-button-text="$t('Record.confirm')"
          :cancel-button-text="$t('Record.cancel')"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="cancelSetDate"
          @confirm="setDate"
        />
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
        expenseAmount: "",
        incomeAmount: "",
        memo: ""
      },
      showNumber: false,
      type: "incomeAmount",
      appear: false,
      minDate: startDate,
      maxDate: today,
      choosingDate: this.$route.query.date ? this.$route.query.date : today,
      currentDate: this.$route.query.date ? this.$route.query.date : today,
      dailyIncome: 0,
      dailyExpense: 0,
      disableDatePicker: true,
      disable: {
        incomeAmount: false,
        expenseAmount: false
      },
    };
  },
  computed: {
    ...mapState({
      localDateFormatter: "localDateFormatter",
      isLogin: "OTPVerified",
      reg: "reg",
      currency: "currency"
    }),
    routeQuery() {
      return this.$route.query;
    }
  },
  created() {
    this.fetchDataUpdate(
      this.$moment(
        this.$route.query.date ? this.$route.query.date : today
      ).format(this.localDateFormatter)
    );
    if (
      this.$route.query.date ===
      this.$moment()
        .subtract(1, "days")
        .format(this.localDateFormatter)
    ) {
      this.disableDatePicker = false;
      this.tabActive = 0;
      this.incomeAmount = true;
    }
  },
  watch: {
    tabActive: {
      handler(val, oldVal) {
        this.form.memo = "";
        this.form.incomeAmount = "";
        this.form.expenseAmount = "";
      }
    },
    currentDate: {
      immediate: true,
      handler(val, oldVal) {
        if (this.$moment(val).format(this.localDateFormatter) !== this.$moment(oldVal).format(this.localDateFormatter)) { 
          Object.entries(this.form).forEach(
          ([key, value]) => (this.form[`${key}`] = "")
          );
        }
        let formDate = util.convertUTCTimeToBuddhistTime(val);
        // formDate = this.$moment(val).format("D MMM YYYY");
        const _today = this.$moment().format(this.localDateFormatter);
        const _yesterday = this.$moment()
          .subtract(1, "days")
          .format(this.localDateFormatter);
        const _selected = this.$moment(val).format(this.localDateFormatter);
        const kv = {
          [_today]: this.$t("Record.today"),
          [_yesterday]: this.$t("Record.yesterday")
        };

        this.$set(
          this.form,
          "accountDate",
          val ? (kv[_selected] ? kv[_selected] : "") + formDate : ""
        );

        this.fetchDataUpdate(this.$moment(val).format(this.localDateFormatter));
      }
    }
  },
  methods: {
    fetchData(form) {
      this.$api.addRecord(form).then(res => {
        console.log(form.accountDate);
        if (res.data.code === 200) {
          this.fetchDataUpdate(form.accountDate);
          this.form.incomeAmount = "";
          this.form.expenseAmount = "";
          this.form.memo = "";

          if (this.routeQuery.to === "DailyFortuneLoading") {
            this.continueFortuneTelling();
          }
        }
      });
    },
    formatDate(date) {
      return util.convertUTCTimeToBuddhistTime(date);
    },
    continueFortuneTelling() {
      this.$router.replace({ name: "DailyFortuneLoading" });
    },
    fetchDataUpdate(currentDate) {
      this.$api.viewRecordSum(currentDate).then(res => {
        if (res.data.code === 200) {
          this.dailyIncome = util.fmoney(res.data.data.incomeSum);
          this.dailyExpense = util.fmoney(res.data.data.expensesSum);
        }
      });
    },
    checkLength(value) {
      if (value.length > 30) {
        this.form.memo = value.slice(0, 30);
      }
    },
    onBeginInputDate() {
      if (!this.disableDatePicker) {
        return;
      }
      this.appear = true;
    },
    showKeyboard(type) {
      this.appear = false;
      this.showNumber = true;
      this.type = type;
      // increase height of app if too small
      if (window.innerHeight >= 700) {
        return false;
      }
      document.getElementById(
        "add-record"
      ).style.height = `${window.innerHeight + 250 - 50}px`;
      // scroll to btn
      var element = this.$refs["btn"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    onInput(value) {
      if (this.form[this.type].length === 11) {
        return false;
      }
      if (this.form[this.type].indexOf(".") != -1 && value == ".") {
        return false;
      }
      if (this.form[this.type] === "" && value === ".") {
        return false;
      }
      const regex = /^[0-9]*\.\d{1}$/;
      if (regex.test(this.form[this.type])) {
        this.form[this.type] += value;
        this.showNumber = false;
        return false;
      }
      const regex1 = /^(([1-9][0-9]*)|(([0]\.\d{2}|[1-9][0-9]*\.\d{2})))$/;
      if (
        regex1.test(this.form[this.type]) &&
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
    onHide() {
      document.getElementById(
        "add-record"
      ).style.height = `${window.innerHeight - 50}px`;
    },
    onClose() {
      this.showNumber = false;
      document.getElementById(
        "add-record"
      ).style.height = `${window.innerHeight - 50}px`;
    },
    updateBtn() {
      const form = Object.assign({}, this.form);
      form.accountDate = this.$moment(this.currentDate).format(
        this.localDateFormatter
      );
      this.appear = false;
      if (this.reg.financeAmount.with2dec.test(form[this.type])) {
        // this.$store.commit("UpdateRecord", this.convertForm(form));
        form[this.type] = parseFloat(form[this.type]);
        this.fetchData(form);
        this.$notify({
          message: this.$t("Record.added"),
          background: "#04A777"
        });
        return false;
      }
      this.$notify({
        message: this.$t("Record.addedwrong"),
        background: "#b41800"
      });
    },
    convertForm(form) {
      const _date = form.accountDate.includes(",")
        ? form.accountDate.split(", ")[1]
        : form.accountDate;
      form.accountDate = this.$moment(_date).format(this.localDateFormatter);
      return form;
    },
    setDate(value) {
      this.appear = false;
      this.currentDate = value;
      this.onHide();
    },
    cancelSetDate(value) {
      this.appear = false;
      this.onHide();
    },
    inputNote() {
      this.appear = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-add-record {
  height: calc(100vh - 50px);
}

.label-left {
  margin: 16px 16px 0 16px;
  height: 24px;
  font-size: 14px;
  color: #2f3941;
}

.pick_date {
  height: 40px;
  font-size: 16px;
  margin: 4px 16px 0 16px;
  position: relative;
}

.pick_date_grey {
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
  top: 10px;
  right: 0;
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
    bottom: 0;
    left: 25px;
    width: calc(100% - 50px);
    border-style: none;
    border-color: white;
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

.update_btn {
  border-radius: 4px;
  background-color: #ffa702;
  border: none;
  color: white;
  font-size: 16px;
  height: 40px;
  width: 90%;
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
}

.van-picker {
  position: absolute;
  width: 100%;
  bottom: 0px;
  height: 200px;
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
  font-size: 24px;
  color: #ffffff;
  position: relative;

  &.expenses {
    background: #b41800;
  }

  .name {
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    left: 16px;
  }

  .amount {
    font-weight: bold;
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
