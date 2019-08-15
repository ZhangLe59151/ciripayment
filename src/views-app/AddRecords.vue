<template>
  <div >

    <app-records-header />

    <div class="app-pick-date">
      <!-- <div class="pick_date">Today, 13 Aug 2019</div> -->
      <van-row class="select_date">
        <van-col span="12">Date</van-col>
        <van-col span="12" class="link_view_history">
          <button v-on:click="view_history">View Record History</button>
        </van-col>
      </van-row>
      <van-row class="pick_date">
        <van-col span="22"> 
          <div class="pick_date">Today, 13 Aug 2019</div>
        </van-col>
        <van-col span="2"><van-icon name="arrow-down" /></van-col>
      </van-row>
    </div>

    <div class="app-pick-date">
      <van-row class="select_date">
        Income
      </van-row>

      <van-row class="input_number">
        <van-col span="2">
          <label class="plus">+</label>
        </van-col>
        <van-col span="20">
          <input
            class="income"
            v-model="form.income"
            @touchstart.stop="showKeyboard('income')"
            maxlength=“13”
            placeholder="" />
        </van-col>
        <van-col span="2">
          <label class="currency">฿</label>
        </van-col>
      </van-row>

    </div>

    <div class="app-pick-date">
      <van-row class="select_date">
        Expense
      </van-row>

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
            placeholder="" />
        </van-col>
        <van-col span="2">
          <label class="currency">฿</label>
        </van-col>
      </van-row>

    </div>

    <div class="app-pick-date">
      <van-row class="select_date">
        Note (Optional)
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <input
            v-model="form.note"
            maxlength=“100”
            placeholder="Add Note" />
        </van-col>
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <button
            class="update_btn"
            v-on:click="update_btn" >Update Records</button>
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



    <app-tab-bar :active="1" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppRecordsHeader from "@/components/AppRecordsHeader";
import {mapState} from "vuex"


export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppRecordsHeader
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
        dateselected: "20190813",
        income: "",
        expense: "",
        note: "",
      },
      show: false,
      type: "income"
    };
  },

  methods: {
    showKeyboard(type) {
      this.show = true;
      this.type = type
    },
    onInput(value) {
      this.form[this.type] += value 
    },
    onDelete() {
      let kbt = this.form[this.type].toString();
      this.form[this.type] = kbt.length ? kbt.substring(0, kbt.length -1) : kbt;
    },
    update_btn() {
      this.$store.commit("UpdateRecord", this.form);
      this.form.dateselected = "Today, 13 Aug 2019";
      this.form.income = "";
      this.form.expense = "";
      this.form.note = "";
    },
    view_history() {
      this.$router.push({ name: "RecordList" });
    },
    onChange(picker, values) {
      picker.setColumnValues(1, dateInMonth[values[0]]);
      this.form.dateselected = values;
    }
  }

};
</script>

<style lang="scss" scoped>
.app-pick-date {
  margin-top:16px;
    margin-right:16px;
    margin-left:16px;
    height: 64px;

    .select_date {
        height: 20px;
        font-size: 14px;

        .link_view_history{
            font-size: 14px;
            color: #FF8600;
            text-align: right;
            height: auto;
        }
    }

    .pick_date {
        top: 4px;
        height: 40px;
        font-size: 16px;
    }

    .input_number {
        height: 40px;
        font-size: 40px;

        .plus {
          bottom: 0px;
          font-size: 16px;
          color: #04A777;
        }

        .income {
          top: 4px;
          color: #04A777;
        }

        .minus {
          bottom: 0px;
          font-size: 16px;
          color: #B41800;
        }

        .expense {
          top: 4px;
          color: #B41800;
        }

        .currency {
          bottom: 0px;
          font-size: 16px;
          color: #2F3941;
        }

    }

    .input_note {
        height: 40px;
        font-size: 24px;
    }

    .update_btn {
        border-radius: 4;
        background-color: #FF8600;
        border: none;
        color: white;
        font-size: 16px;
        width: 100%;
        height: 40px;
        margin-top:16px;
    }

}
</style>
