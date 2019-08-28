<template>
  <div class="app-fortune-result-content">
    <div class="background-card">
      <div class="date">
        30 Sep 2562 BE
      </div>
      <div class="result-box">

        <div class="cnt">
          แจกเงินเที่ยว 1,000 บาท” หลายคนไม่เห็นด้วย หลายคนตั้งหน้าตั้งตาเฝ้าคอย แต่อีกไม่กี่อึดใจ “เงิน 1,000 บาท” จะถูกแจกจ่ายไปถึงมือประชาชน 10 ล้านคนทั่วประ
        </div>
        <section class="fortune">
          <div class="fortune-desc">
            {{$t("FortuneTelling.luckyDes")}}
          </div>
          <div class="fortune-result">
            {{fortuneResult.fortuneResult}}
          </div>
        </section>

        <section v-if="hasRecord">
          <div class="sales-desc">
            {{$t("FortuneTelling.luckyAmountDes")}}
          </div>
          <div class="sales-result">
            <!-- fortuneResult.salesTarget.incomeResult.min -->
            <span>{{ '10,000'}}</span>
            <span class="currency">{{currency}}</span>
            <span> ~ </span>
            <!-- fortuneResult.salesTarget.incomeResult.max  -->
            <span>{{'50,000'}}</span>
            <span class="currency">{{currency}}</span>
          </div>
        </section>

        <section v-else>
          <div class="record-res">{{$t("FortuneTelling.recordDes")}}</div>
          <div class="record-btn">{{$t("FortuneTelling.recordBtn")}}</div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
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
    return {
      today: "",
      hasRecord: false
    };
  },
  computed: {
    fortuneResult() {
      return this.fortuneInfo.fortuneResult;
    }
  },
  mounted() {
    this.today = this.$moment().format("DD MMM YYYY");
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-result-content {
  position: relative;
  height: 65vh;
  width: 100%;
  text-align: center;
  .background-card {
    position: relative;
    background: no-repeat center
      url("../../assets/imgs/fortune-telling/fortune_telling_result_card.png");
    background-size: contain;
    top: 50px;
    width: 100%;
    height: 100%;

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
        margin-top: 70px;
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
        color: black;
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
      }

      .record-btn {
        background: #ff8600;
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
