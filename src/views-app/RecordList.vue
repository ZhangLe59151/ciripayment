<template>
    <div>
        <app-records-header />
        <ul>
            <li 
                v-for="item in itemlist"
                :key="item.dateSelected" >
                {{ item.dateSelected }} - {{ item.income }} - {{ item.expense }} - {{ item.note }}
            </li>
        </ul>
        <app-tab-bar :active="1" />
    </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppRecordsHeader from "@/components/AppRecordsHeader";
import {mapState} from "vuex"

export default {
  name: "RecordList",

  components: {
    AppTabBar,
    AppRecordsHeader
  },


  computed: {
    ...mapState({
      recordList: state => state.recordList
    })
  },

  data() {
    return {
      currentTab: this.$route.query.currentTab || "0",
      itemlist: recordList
    };
  },

  methods: {
    
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
