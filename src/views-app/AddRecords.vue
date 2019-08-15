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
            :value="form.date"
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
            @focus="inputNote"
          >
        </van-col>
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <button
            class="update_btn"
            @click="updateBtn"
          >Update Records</button>
        </van-col>
      </van-row>
    </div>

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
      :show="show"
      extra-key="."
      close-button-text="Done"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />

    <app-tab-bar :active="1" />
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppCommonHeader from "@/components/AppCommonHeader";

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
      dateInMonth: state => state.dateInMonth
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
      show: false,
      type: "income",
      appear: false,
      minDate: startDate,
      maxDate: today,
      currentDate: today
    };
  },
  watch: {
    currentDate: {
      immediate: true,
      handler(val, oldVal) {
        let formDate = this.$moment(val).format("D MMM YYYY");
        let prefix = "";

        if (
          this.$moment(val).format("YYYYMMDD") ===
          this.$moment().format("YYYYMMDD")
        ) {
          prefix = "Today ,";
        }

        if (
          this.$moment(val).format("YYYYMMDD") ===
          this.$moment()
            .subtract(1, "days")
            .format("YYYYMMDD")
        ) {
          prefix = "Yesterday ,";
        }

        this.$set(this.form, "date", val ? prefix + formDate : "");
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
      if (true) {
        this.form[this.type] += value;
      }
    },
    onDelete() {
      let kbt = this.form[this.type].toString();
      this.form[this.type] = kbt.length
        ? kbt.substring(0, kbt.length - 1)
        : kbt;
    },
    updateBtn() {
      const form = Object.assign({}, this.form);
      form.date = this.$moment(this.form.date).format("YYYYMMDD");
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
      form.date = this.$moment(_date).format("YYYYMMDD");
      return form;
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
    },
    inputNote() {
      this.appear = false;
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
.van-picker {
  z-index: 2000;
}
</style>
