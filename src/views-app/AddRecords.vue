<template>
  <div>
    <app-common-header title="Records" />

    <div class="app-pick-date">
      <van-row class="select_date">
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
          <input
            class="input"
            type="text"
            v-model="form.date"
            readonly
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            @focus="appear = true"
          />
        </van-col>
      </van-row>
    </div>

    <div class="app-pick-date">
      <van-row class="select_date">Income</van-row>

      <van-row class="input_number">
        <van-col span="2">
          <label class="plus">+</label>
        </van-col>
        <van-col span="20">
          <input
            class="income"
            v-model="form.income"
            @touchstart.stop="showKeyboard('income')"
            maxlength="“13”"
            placeholder
          >
        </van-col>
        <van-col span="2">
          <label class="currency">{{$store.state.currency}}</label>
        </van-col>
      </van-row>
    </div>

    <div class="app-pick-date">
      <van-row class="select_date">Expense</van-row>

      <van-row class="input_number">
        <van-col span="2">
          <label class="minus">-</label>
        </van-col>
        <van-col span="20">
          <input
            class="expense"
            @touchstart.stop="showKeyboard('expense')"
            v-model="form.expense"
            maxlength="13"
            placeholder
          >
        </van-col>
        <van-col span="2">
          <label class="currency">{{$store.state.currency}}</label>
        </van-col>
      </van-row>
    </div>

    <div class="app-pick-date">
      <van-row class="select_date">Note (Optional)</van-row>

      <van-row class="input_note">
        <van-col span="24">
          <input
            v-model="form.note"
            maxlength="“100”"
            placeholder="Add Note"
          >
        </van-col>
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <button
            class="update_btn"
            v-on:click="update_btn"
          >Update Records</button>
        </van-col>
      </van-row>
    </div>

    <div>
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
    </div>

    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="Done"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
    <van-datetime-picker
      :show="appear"
      v-model="currentDate"
      type="date"
      :min-date="minDate"
    />
    <app-tab-bar :active="1" />
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppCommonHeader from "@/components/AppCommonHeader";

import { mapState } from "vuex";

const today = new Date();

export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppCommonHeader
  },

  computed: {
    ...mapState({
      dateInMonth: state => state.dateInMonth
    })
  },

  data() {
    return {
      currentTab: this.$route.query.currentTab || "0",
      form: {
        date: today.toDateString(),
        income: "",
        expense: "",
        note: ""
      },
      show: false,
      type: "income",
      appear: false,
      minDate: new Date("Jan 01,2018"),
      maxDate: today,
      currentDate: today
    };
  },
  watch: {
    currentDate: {
      handler(val, oldVal) {
        this.$set(
          this.form,
          "date",
          val ? this.$moment(val).format("dd MM YYYY") : ""
        );
        //this.$set(this.form,"date", val ? val.toDateString() : "")
        //this.form.date = "Today ," + val
        if (
          this.$moment(val).format("YYYYMMDD") ==
          this.$moment(new Date()).format("YYYYMMDD")
        ) {
          this.form.date = "Today ," + val;
        } else if (
          this.$moment(val).format("YYYYMMDD") ==
          this.$moment(today.setDate(today.getDate() - 1)).format("YYYYMMDD")
        ) {
          this.form.date = "Yesterday ," + val;
        } else {
          this.form.date = this.form.date
            .replace("Today ,", "")
            .replace("Yesterday ,", "");
        }
      }
    }
  },
  methods: {
    showKeyboard(type) {
      this.appear = false;
      this.show = true;
      this.type = type;
    },
    onInput(value) {
      this.form[this.type] += value;
    },
    onDelete() {
      let kbt = this.form[this.type].toString();
      this.form[this.type] = kbt.length
        ? kbt.substring(0, kbt.length - 1)
        : kbt;
    },
    update_btn() {
      this.form.date = this.$moment(this.form.date).format("YYYYMMDD");
      this.$store.commit("UpdateRecord", this.form);
      this.form.date = new Date().toDateString();
      this.form.income = "";
      this.form.expense = "";
      this.form.note = "";
      this.appear = false;
    },
    view_history() {
      this.$router.push({ name: "RecordList" });
    },
    onChange(picker, values) {
      picker.setColumnValues(1, dateInMonth[values[0]]);
      this.form.date = values;
    },
    setDate(value) {
      this.appear = false;

      // this.currentDate = this.$moment(value).format("YYYYMMDD");

      // console.log( this.currentDate );
    }
  }
};
</script>

<style lang="scss" scoped>
.app-pick-date {
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
  height: 64px;

  .select_date {
    height: 40px;
    font-size: 14px;

    .link_view_history {
      font-size: 14px;
      color: #ff8600;
      text-align: right;
      height: auto;
    }
  }

  .pick_date {
    top: 4px;
    height: 40px;
    font-size: 16px;
    width: 100%;

    .input {
      width: 100%;
    }
  }

  .income {
    top: 4px;
    color: #04a777;
  }

  .input_number {
    height: 40px;
    font-size: 40px;

    .plus {
      bottom: 0px;
      font-size: 16px;
      color: #04a777;
    }

    .income {
      top: 4px;
      color: #04a777;
    }

    .minus {
      bottom: 0px;
      font-size: 16px;
      color: #b41800;
    }

    .expense {
      top: 4px;
      color: #b41800;
    }

    .currency {
      bottom: 0px;
      font-size: 16px;
      color: #2f3941;
    }
  }

  .input_note {
    height: 40px;
    font-size: 24px;
  }

  .update_btn {
    border-radius: 4;
    background-color: #ff8600;
    border: none;
    color: white;
    font-size: 16px;
    width: 100%;
    height: 40px;
    margin-top: 16px;
  }
}
</style>
