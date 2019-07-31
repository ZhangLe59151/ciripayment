<template>
  <div class="app-profile-cnt">
    <div class="block">
      <div class="title">{{info.title}}</div>
      <div class="label">
        <span>Mobile Number</span>
        <span>{{info.title}}</span>
      </div>
      <div class="label">
        <span>National ID</span>
        <span>{{nationalId}}
          <i
            class="iconfont"
            :class="iconName"
            @click="handleEyeClick"
          />
        </span>
      </div>
    </div>

    <div
      class="block"
      style="margin-top: 20px;"
    >
      <div class="title">Business Information</div>
      <div
        class="label"
        v-for="item in bizInfo"
        :key="item.label"
      >
        <span>{{item.label}}</span>
        <span>{{item.value}}</span>
      </div>
    </div>

    <div
      class="block"
      style="margin-top: 20px;"
    >
      <div class="title">Bank Account</div>
      <app-profile-account />
    </div>
  </div>
</template>

<script>
import AppProfileAccount from "@/components/AppProfileAccount";
const nationalIdStar = "**************";
export default {
  components: {
    AppProfileAccount
  },
  data() {
    return {
      iconName: "iconhide",
      info: {
        title: "Brandon Tam",
        nationalId: "123333"
      },
      bizInfo: [
        {
          label: "Business Category",
          value: "Retail Services  - Eating and Drinking Places"
        },
        {
          label: "Business Address",
          value: "2 Venture Drive #08-08, Vision Exchange"
        },
        {
          label: "Province",
          value: "Bangkok"
        },
        {
          label: "Postal Code",
          value: "12333"
        }
      ]
    };
  },

  computed: {
    nationalId() {
      return this.iconName === "iconhide"
        ? nationalIdStar
        : this.info.nationalId;
    }
  },

  methods: {
    handleEyeClick() {
      this.iconName = this.iconName === "iconhide" ? "iconreveal" : "iconhide";
    }
  }
};
</script>

 <style lang="scss" scoped>
.app-profile-cnt {
  background: #f0f7fb;
  padding: 16px;
  min-height: calc(100vh - 190px);

  .block {
    .title {
      font-size: 16px;
      color: #2f3941;
      letter-spacing: 0;
      font-weight: bold;
    }

    .label {
      padding: 16px 0;
      min-height: 16px;
      display: flex;
      border-bottom: 1px solid #e9ebed;
      > span {
        display: inline-block;
        width: 50%;
        > i {
          margin-left: 8px;
        }
        &:first-child {
          font-size: 12px;
          color: #87929d;
          letter-spacing: 0;
        }
        &:last-child {
          font-size: 14px;
          color: #2f3941;
          letter-spacing: 0;
          text-align: right;
        }
      }
    }

    .bank-box {
      background: #ffffff;
      box-shadow: 0 2px 8px -4px rgba(4, 43, 68, 0.2);
      border-radius: 4px;
      padding: 20px;
      margin-top: 20px;

      .des {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
      }

      .link-btn {
        width: 100%;
        margin-top: 10px;
        border: 1px solid #053c5e;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        font-size: 14px;
        color: #053c5e;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
