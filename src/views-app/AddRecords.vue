<template>
  <div class="app-add-record">
    <app-common-header title="Add Record" />

    <van-tabs
      v-model="tabActive"
      animated
      color="#ff8600"
      title-active-color="#ff8600"
    >
      <van-tab
        title="Income"
        name="INCOME"
      >
        <div class="record-status">
          <span class="name">{{$t("TOTAL INCOME")}}</span>
          <span class="amount">+{{ dailyIncome }} <i>{{$store.state.currency}}</i></span>
        </div>

        <van-row class="label-left">{{$t("Income Name")}}</van-row>

        <van-row class="input_note">
          <van-col span="24">
            <van-field
              v-model="form.memo"
              @focus="inputNote"
              maxlength="50"
              placeholder="E.g. Sales Item"
            />
          </van-col>
        </van-row>

        <van-row class="label-left">
          <van-col span="12">{{$t("Date")}}</van-col>
          <van-col
            span="12"
            class="link_view_history"
          >
          </van-col>
        </van-row>

        <van-row class="pick_date">
          <van-col span="21">
            <van-field
              class="input"
              :value="form.accountDate"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
              @focus="appear = true"
              maxlength="13"
              readonly
            />
          </van-col>
          <van-col span="1">
            <van-icon name="arrow-down" />
          </van-col>
        </van-row>

        <van-row class="label-left">{{$t("Income")}}</van-row>
        <van-row
          class="input_income_expense"
          id="income"
        >
          <van-col span="2">
            <label class="plus">+</label>
          </van-col>
          <van-col span="20">

            <van-field
              class="income"
              v-model="form.incodeAmount"
              @focus="showKeyboard('incodeAmount')"
              maxlength="13"
              readonly
            />

          </van-col>
          <van-col span="2">
            <label class="currency">{{$store.state.currency}}</label>
          </van-col>
        </van-row>

      </van-tab>
      <van-tab
        title="Expenses"
        name="EXPENSES"
      >

        <div class="record-status expenses">
          <span class="name">{{$t("TOTAL EXPENSES")}}</span>
          <span class="amount">-{{ dailyExpense }} <i>{{$store.state.currency}}</i></span>
        </div>
        <van-row class="label-left">{{$t("Expenses Name")}}</van-row>

        <van-row class="input_note">
          <van-col span="24">

            <van-field
              v-model="form.memo"
              @focus="inputNote"
              maxlength="50"
              placeholder="E.g. Sales Item"
            />
          </van-col>
        </van-row>

        <van-row class="label-left">
          <van-col span="12">{{$t("Date")}}</van-col>
          <van-col
            span="12"
            class="link_view_history"
          >
          </van-col>
        </van-row>

        <van-row class="pick_date">
          <van-col span="21">
            <van-field
              class="input"
              :value="form.accountDate"
              confirm-button-text="confirm"
              cancel-button-text="cancel"
              @focus="appear = true"
              maxlength="13"
              readonly
            />
          </van-col>
          <van-col span="1">
            <van-icon name="arrow-down" />
          </van-col>
        </van-row>

        <van-row class="label-left">{{$t("Expense")}}</van-row>

        <van-row
          class="input_income_expense"
          id="expense"
        >
          <van-col span="2">
            <label class="minus">-</label>
          </van-col>
          <van-col span="20">

            <van-field
              class="expense"
              v-model="form.expenseAmount"
              @focus="showKeyboard('expenseAmount')"
              maxlength="13"
              readonly
            />
          </van-col>
          <van-col span="2">
            <label class="currency">{{$store.state.currency}}</label>
          </van-col>
        </van-row>

      </van-tab>
    </van-tabs>

    <button
      class="update_btn"
      @click="updateBtn"
    >{{$t("Update Records")}}</button>

    <van-row>
      <van-col span="24">
        <van-datetime-picker
          v-show="appear"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="appear = false"
          @confirm="setDate"
        />
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
    <app-tab-bar :active="1" />
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppCommonHeader from "@/components/AppCommonHeader";
import { findIndex } from "lodash";

import { mapState } from "vuex";

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
      //recordList: state => state.recordList,
      localDateFormatter: state => state.localDateFormatter
    })
  },

  data() {
    return {
      tabActive: "INCOME",
      form: {
        accountDate: "",
        expenseAmount: "",
        incodeAmount: "",
        memo: ""
      },
      showNumber: false,
      type: "incodeAmount",
      appear: false,
      minDate: startDate,
      maxDate: today,
      currentDate: this.$route.query.date ? this.$route.query.date : today,
      recordList: [],
      test: '',
      dailyIncome: 0,
      dailyExpense: 0
    };
  },
  created() {
    this.test = this.$moment(this.currentDate).format(this.localDateFormatter);
    debugger
    this.$api.viewRecordSum({ accountDate: this.$moment(this.currentDate).format(this.localDateFormatter) }).then(res => { 
      debugger
      if (res.data.code === 200) { 
        console.log(res.data.data);
        
        //this.dailyIncome = res.data.data.total1;
        //this.dailyExpense = res.data.data.total2;
      } 
    });
  },
  watch: {
    currentDate: {
      immediate: true,
      handler(val, oldVal) {
        let formDate = this.$moment(val).format("D MMM YYYY");
        const _today = this.$moment().format(this.localDateFormatter);
        const _yesterday = this.$moment()
          .subtract(1, "days")
          .format(this.localDateFormatter);
        const _selected = this.$moment(val).format(this.localDateFormatter);
        const kv = { [_today]: "Today, ", [_yesterday]: "Yesterday, " };

        this.form[Object.keys(this.form)]="";

        this.$set(
          this.form,
          "accountDate",
          val ? (kv[_selected] ? kv[_selected] : "") + formDate : ""
        );

      }
    }
  },
  methods: {
    fetchData(form) {
      console.log(form);
      this.$api
        .addRecord({
         merchantRecordDtor: this.form
        })
        .then(res => {
          if (res.data.code === 200) {
            console.log(res.data.data)
            //this.$router.push({name: 'AddRecord'});
          }
        })
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
      if (this.form[this.type].indexOf(".") != -1 && value == ".") {
        return false;
      }
      if (this.form[this.type] == "" && value == ".") {
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
      form.accountDate = this.$moment(this.form.accountDate).format(this.localDateFormatter);
      this.appear = false;
      const regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (regex.test(form[this.type])) {
        //this.$store.commit("UpdateRecord", this.convertForm(form));
        this.fetchData(form);
        this.$toast("Update succeed!");
        return false;
      }
      this.$toast("Pls input valid amount.");
    },
    convertForm(form) {
      const _date = form.accountDate.includes(",")
        ? form.accountDate.split(", ")[1]
        : form.accountDate;
      form.accountDate = this.$moment(_date).format(this.localDateFormatter);
      return form;
    },
    viewHistory() {
      const date = this.$moment(this.form.accountDate).format(this.localDateFormatter);
      this.$router.push({ name: "RecordList", query: { accountDate: date } });
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
  .van-icon-arrow-down {
    position: relative;
    top: 10px;
  }
}

.input_income_expense {
  height: 40px;
  font-size: 16px;
  margin: 4px 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;

  .plus {
    bottom: 0px;
    font-size: 16px;
    color: #04a777;
  }

  .income {
    top: 4px;
    color: #04a777;
    font-size: 24px;

    width: 90%;
  }

  .minus {
    font-size: 16px;
    color: #b41800;
  }

  .expense {
    top: 4px;
    color: #b41800;
    font-size: 24px;

    width: 90%;
  }

  .currency {
    bottom: 0px;
    font-size: 16px;
    color: #2f3941;
    padding-bottom: 10px;
  }
}

.input_note {
  height: 40px;
  font-size: 24px;
  margin: 0 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;
}

.update_btn {
  border-radius: 4px;
  background-color: #ff8600;
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

     