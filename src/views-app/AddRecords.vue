<template>
  <div >
    
    <app-records-header />

    <div class="app-pick-date">
      <!-- <div class="pick_date">Today, 13 Aug 2019</div> -->
      <van-row class="select_date">
        <van-col span="12">Date</van-col>
        <van-col span="12" class="link_view_history">View Record History</van-col>
      </van-row>
      <van-row class="pick_date">
        <van-col span="22">Today, 13 Aug 2019</van-col>
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
            :value="form.income"
            v-model="form.income"
            @touchstart.stop="show = true"
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
            @touchstart.stop="show = true"
            :value="form.expense"
            v-model="form.income"
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
        Note (Optional)
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <input 
            :value="note"
            @touchstart.stop="show = true"
            v-model="form.note"
            maxlength=“100”
            placeholder="Add Note" />
        </van-col>
      </van-row>

      <van-row class="input_note">
        <van-col span="24">
          <button 
            class="update_btn" >Update Records</button>
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
import AppRecordsHeader from "@/components/AppRecordsHeader"


export default {
  name: "AppRecords",

  components: {
    AppTabBar,
    AppRecordsHeader
  },

  data() {
    return {
      currentTab: this.$route.query.currentTab || "0",
      form: {
        date_selected = 'Today, 13 Aug 2019',
        income: '',
        expense: '',
        note: ''
      },
      show: false
    };
  },

  methods: {
    onInput(value) {
      this.income = this.income + value;
    },
    onDelete() {
      //this.income = this.income.Substring(0,this.income.Length-1)
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
    }

}
</style>
