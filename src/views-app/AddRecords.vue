<template>
  <div>
    <app-common-header title="Records" />

    <van-row class="label-left">
      <van-col span="12">Date</van-col>
      <van-col
        span="12"
        class="link_view_history"
      >
        <button v-on:click="view_history">View Record History</button>
      </van-col>
    </van-row>

    <van-row class="pick_date">
      <van-col span="22">
        <van-field
          class="input"
          :value="form.date"
          confirm-button-text="confirm"
          cancel-button-text="cancel"
          @focus="appear = true"
          maxlength="13"
          readonly
        />
      </van-col>
    </van-row>

    <van-row class="label-left">Income</van-row>

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
          v-model="form.income"
          @focus="showKeyboard('income')"
          maxlength="13"
        />

      </van-col>
      <van-col span="2">
        <label class="currency">{{$store.state.currency}}</label>
      </van-col>
    </van-row>

    <van-row class="label-left">Expense</van-row>

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
          v-model="form.expense"
          @focus="showKeyboard('expense')"
          maxlength="13"
        />
      </van-col>
      <van-col span="2">
        <label class="currency">{{$store.state.currency}}</label>
      </van-col>
    </van-row>

    <van-row class="label-left">Note (Optional)</van-row>

    <van-row class="input_note">
      <van-col span="24">

        <van-field
          class="expense"
          v-model="form.note"
          @focus="inputNote"
          maxlength="100"
          placeholder="Add Note"
        />
      </van-col>
    </van-row>

    <button
      class="update_btn"
      @click="updateBtn"
    >Update Records</button>

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
      recordList: state => state.recordList,
      localDateFormatter: state => state.localDateFormatter
    })
  },

  data() {
    return {
      currentTab: this.$route.query.currentTab || "0",
      form: {
        date: "",
        income: "",
        expense: "",
        note: ""
      },
      showNumber: false,
      type: "income",
      appear: false,
      minDate: startDate,
      maxDate: today,
      currentDate: this.$route.query.date ? this.$route.query.date : today
    };
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

        this.$set(
          this.form,
          "date",
          val ? (kv[_selected] ? kv[_selected] : "") + formDate : ""
        );

        const itemIndex = findIndex(this.recordList, {
          date: this.$moment(val).format(this.localDateFormatter)
        });
        console.log();
        if (itemIndex > -1) {
          this.form = Object.assign({}, this.recordList[itemIndex]);
        } else {
          this.form.note = "";
          this.form.income = "";
          this.form.expense = "";
        }
      }
    }
  },
  methods: {
    showKeyboard(type) {
      this.appear = false;
      this.showNumber = true;
      this.type = type;
    },
    showNumberFalse() {
      this.showNumber = false;
      document.getElementById("income").className = "input_income_expense";
      document.getElementById("expense").className = "input_income_expense";
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
      form.date = this.$moment(this.form.date).format(this.localDateFormatter);
      this.appear = false;
      const regex = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (regex.test(form[this.type])) {
        this.$store.commit("UpdateRecord", this.convertForm(form));
        this.$toast("Update succeed!");
        return false;
      }
      this.$toast("Pls input valid amount.");
    },
    convertForm(form) {
      const _date = form.date.includes(",")
        ? form.date.split(", ")[1]
        : form.date;
      form.date = this.$moment(_date).format(this.localDateFormatter);
      return form;
    },
    view_history() {
      this.$router.push({ name: "RecordList" });
    },
    setDate(value) {
      this.appear = false;

      // this.currentDate = this.$moment(value).format(this.localDateFormatter);

      // console.log( this.currentDate );
    },
    inputNote() {
      this.appear = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  margin: 16px 16px 0 16px;
  border-bottom: 1px solid #c2c8cc;
}

.update_btn {
  border-radius: 4;
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
</style>

<style lang="scss">
.income .van-field__control {
  color: #04a777 !important;
}

.expense .van-field__control {
  color: #b41800 !important;
}

.input_note .van-field__control {
}
</style>

     