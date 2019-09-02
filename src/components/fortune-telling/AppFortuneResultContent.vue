<template>
  <div class="app-fortune-result-content">
    <div class="background-card">
      <div class="date">
        {{today}}
      </div>
      <div class="result-box">

        <div class="cnt">
          {{fortuneResult.fortuneResult}}
        </div>
        <section class="fortune">
          <div class="fortune-desc">
            {{$t("FortuneTelling.luckyDes")}}
          </div>
          <div class="fortune-result">
            {{fortuneResult.salesTarget.generalResult}}
          </div>
        </section>

        <section v-if="hasRecord === '1'">
          <div class="sales-desc">
            {{$t("FortuneTelling.luckyAmountDes")}}
          </div>
          <div class="sales-result">
            <span>{{ fortuneResult.salesTarget.incomeResult.min}}</span>
            <span class="currency">{{currency}}</span>
            <span> ~ </span>
            <span>{{fortuneResult.salesTarget.incomeResult.max}}</span>
            <span class="currency">{{currency}}</span>
          </div>
        </section>

        <section v-else-if="hasRecord === '2'">
          <div class="sales-desc">
            {{$t("FortuneTelling.luckyAmountDes")}}
          </div>
          <img :src="require('@/assets/imgs/fortune-telling/censored.png')">
        </section>

        <section v-else>
          <div class="record-res">{{$t("FortuneTelling.recordDes")}}</div>
          <div
            class="record-btn"
            @click="$router.push({name: 'AddRecord',query: {date: yesterday}})"
            v-analytics="{event: 'FortuneTellingResult_AddRecordBtn'}"
          >{{$t("FortuneTelling.recordBtn")}}</div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util";
export default {
  name: "AppFortuneResultContent",
  props: {
    currency: {
      default: "",
      type: String
    },
    fortuneInfo: {
      default() {
        return {};
      },
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      yesterday(state) {
        return this.$moment()
          .subtract(1, "days")
          .format(state.localDateFormatter);
      }
    }),
    fortuneResult() {
      return this.fortuneInfo.fortuneResult;
    },
    today() {
      return util.convertUTCTimeToBuddhistTime(new Date());
    },
    hasRecord() {
      if (this.$route.query.shareKey) {
        return "2";
      }
      const result = this.fortuneInfo.fortuneResult;
      return result.salesTarget.incomeResult === null ? "0" : "1";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-result-content {
  position: relative;
  top: 50px;
  height: 65vh;
  width: 100%;
  text-align: center;
  .background-card {
    position: relative;
    background: no-repeat center
      url("../../assets/imgs/fortune-telling/fortune_telling_result_card.png");
    background-size: contain;

    width: 100%;
    height: 400px;

    img {
      height: 28px;
      width: 156px;
      position: relative;
      top: 50px;
    }

    .date {
      height: 26px;
      line-height: 26px;
      background: #d44832;
      padding: 0 8px;
      position: absolute;
      width: 140px;
      left: calc(50% - 70px);
      top: 12px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
    }

    .result-box {
      position: absolute;
      left: 70px;
      right: 60px;
      top: 50%;
      height: 100%;
      transform: translateY(-50%);

      .cnt {
        font-size: 16px;
        color: #2f3941;
        letter-spacing: 0;
        text-align: center;
        margin-top: 60px;
        height: 140px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
      }

      .fortune {
        position: relative;
        .fortune-desc {
          font-size: 14px;
          color: #68737d;
          letter-spacing: 0;
          text-align: center;
        }
        .fortune-result {
          color: #2f3941;
          font-size: 20px;
          width: 100%;
          text-align: center;
          font-size: 24px;
          margin-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .sales-desc {
        position: absolute;
        color: #68737d;
        font-size: 14px;
        bottom: 107px;
        width: 100%;
        height: 16px;
        text-align: center;
      }

      .sales-result {
        position: absolute;
        color: #000000;
        font-size: 24px;
        bottom: 72px;
        width: 100%;
        height: 28px;
        text-align: center;
        .currency {
          font-size: 12px;
          font-weight: bold;
          color: #2f3941;
          vertical-align: text-top;
        }
      }

      .record-res {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
        margin-top: 12px;
      }

      .record-btn {
        margin-top: 12px;
        background: #ffa702;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
