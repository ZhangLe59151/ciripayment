<template>
  <div class="app-add-record">
    <app-common-header title="Edit Record" />

    <van-tabs
      v-model="tabActive"
      animated
      color="#ff8600"
      title-active-color="#ff8600"
    >
      <van-tab
        title="Income"
        :disabled="this.disable.expenseAmount"
      >
        <div class="record-status">
          <span class="name">{{$t("Record.TotalIncome")}}</span>
          <span class="amount">+ {{ dailyIncome }} <i>{{$store.state.currency}}</i></span>
        </div>

        <div class="label-left">{{$t("Record.IncomeName")}}</div>

        <div class="input_note">
          <van-field
            v-model="form.memo"
            @focus="inputNote"
            maxlength="50"
            placeholder="E.g. Sales Item"
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

        <div class="label-left">{{$t("Record.IncomeS")}}</div>

        <div class="input_income_expense">
          <div class="plus">+</div>
          <van-field
            class="income"
            v-model="form.incomeAmount"
            @focus="showKeyboard('incomeAmount')"
            maxlength="13"
            readonly
          />
          <div class="plus currency">{{$store.state.currency}}</div>
        </div>

      </van-tab>
      <van-tab
        title="Expenses"
        :disabled="this.disable.incomeAmount"
      >

        <div class="record-status expenses">
          <span class="name">{{$t("Record.TotalExpenses")}}</span>
          <span class="amount">- {{ dailyExpense }} <i>{{$store.state.currency}}</i></span>
        </div>

        <div class="label-left">{{$t("Record.ExpensesName")}}</div>

        <div class="input_note">
          <van-field
            v-model="form.memo"
            @focus="inputNote"
            maxlength="50"
            placeholder="E.g. Sales Item"
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
            maxlength="13"
            readonly
          />
          <div class="plus currency">{{$store.state.currency}}</div>
        </div>

      </van-tab>
    </van-tabs>

    <van-row>
      <van-col span="12">
        <div
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
      close-button-text="Done"
      @blur="showNumberFalse"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppCommonHeader from "@/components/AppCommonHeader";
import { findIndex } from "lodash";

import { mapState } from "vuex";
import util from "@/util.js";
import { debuglog } from "util";

const today = new Date();
const startDate = new Date("2019/01/01");
export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppCommonHeader
  },

  computed: {
    ...mapState({
      localDateFormatter: state => state.localDateFormatter
    })
  },

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
      }
    };
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
          this.currentDate = this.$moment(res.data.data.accountDate).format(
            "D MMM YYYYY"
          );
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
          this.$notify({ message: "Update succeed!", background: "#04A777" });
        }
      });
    },
    showKeyboard(type) {
      this.appear = false;
      this.showNumber = true;
      this.type = type;
    },
    showNumberFalse() {
      this.showNumber = false;
    },
    onInput(value) {
      if (this.form[this.type].indexOf(".") !== -1 && value === ".") {
        return false;
      }
      if (this.form[this.type] === "" && value === ".") {
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
      form.date = this.$moment(this.form.date).format(this.localDateFormatter);
      this.appear = false;
      const regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (regex.test(form[this.type])) {
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
.app-add-record {
  height: calc(100vh - 50px);
}
.label-left {
  margin: 16px 16px 0 16px;
  height: 24px;

  .link_view_history {
    font-size: 14px;
    color: #ff8600;
    text-align: right;
  }
}

.pick_date {
  height: 40px;
  font-size: 16px;
  margin: 4px 16px 0 16px;
  position: relative;
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
  height: 40px;
  font-size: 24px;
  margin: 0 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;
}

.delete_btn {
  border-radius: 4px;
  border: 1px solid #ff8600;
  font-size: 16px;
  margin: 16px 8px 0 16px;
  text-align: center;
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-color: #ff8600;
  background-color: white;
  color: #ff8600;
  width: 90%;
}

.update_btn {
  border-radius: 4px;
  border: 1px solid #ff8600;
  font-size: 16px;
  margin: 16px 16px 0 8px;
  text-align: center;
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-color: #ff8600;
  color: white;
  background-color: #ff8600;
  width: 90%;
}

.van-picker {
  z-index: 2000;
}

.van-field {
  height: 40px;
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
