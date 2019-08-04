<template>
  <div class="apply-more-channel-content">
    <div v-if="step === '1'">
      <el-form
        label-width="0px"
        status-icon
        ref="elFormPayment"
        label-position="top"
        v-model="form"
      >
        <el-card class="box-card">
          <!-- applicant information -->
          <div class="title">ADD PAYMENT CHANNELS</div>
          <div class="title-line"></div>
          <el-checkbox-group
            v-model="checkList"
            text-color="#000000"
            class="payment-channel-box"

          >
            <div
              v-for="item in recommendChannelsStore"
              :key="item.channelId"
              class="checkbox-box"
            >
              <img :src="item.img">
              <div>{{item.label}}</div>

              <el-checkbox
                :label="item.channelId"
                :key="item.channelId"
                style="padding: 10px 0 10px 10px;"
                class="channel-checkbox"
              >
                  <div style="display:none"></div>
              </el-checkbox>
            </div>

          </el-checkbox-group>
          <div class="payment-dialog-link" @click="openViewChannelsDetailDialog">
            View payment channel details.
          </div>
        </el-card>
      </el-form>
      <van-button
        size="small"
        :class="(checkList.length >0 )?'bottom-btn':'bottom-btn disabled'"
        :disabled="checkList.length <=0"
        @click="handleNext"
      >
        Next
      </van-button>
      <payment-channel-list :recommendChannelsStore="totalPaymentChannelList" v-bind:dialog.sync="dialog" />
    </div>
    <div v-else>
      <el-form
        label-width="0px"
        status-icon
        ref="elFormPayment"
        label-position="top"
        v-model="form"
      >
        <el-card class="box-card">
          <div class="title">REVIEW ADDED CHANNELS</div>
          <div class="title-line"></div>
          <el-checkbox-group
            v-model="checkList"
            text-color="#000000"
            class="payment-channel-box"

          >
            <div
              v-for="item in choosingChannels"
              :key="item.id"
              class="checkbox-box"
            >
              <img :src="item.img">
              <div>{{item.label}}</div>
            </div>
          </el-checkbox-group>
        </el-card>
      </el-form>

      <van-checkbox
        v-model="checked"
        id="checkb"
        style="margin-top:40px"
      >
        <div
          @click="stopDefault"
        >
          I certify that the above information are true and correct at the time of submission, and have read and agree
          to the
          <span
            @click="tandc"
            class="tc"
          >Terms and Conditions</span>.
        </div>
      </van-checkbox>

      <el-card class="box-card">
        <!-- business information -->
        <div class="title">Signature</div>
        <div class="title-line"></div>
        <div class="canvas-image-wrapper">
          <img
            v-if="picESignature"
            :src="picESignature"
            alt
            class="canvas-image"
          >
          <canvas
            id="canvas"
            v-show="false"
            class="sign-canvas"
            ref="sign"
          ></canvas>
          <VueSignaturePad
            id="pad"
            v-show="!picESignature"
            width="100%"
            height="200px"
            class="sign-canvas"
            ref="signaturePad"
          />
        </div>

        <van-row type="flex" justify="center">
          <van-col span="7"><van-button
            id="clearBtn"
            size="small"
            @click="clear"
            type="primary"
            class="clear-btn plain bottom-btn"
          >
            Clear
          </van-button>
          </van-col>
          <van-col span="7" >
            <van-button
              v-if="!picESignature"
              size="small"
              @click="confirmSignature"
              class="confirm-btn bottom-btn"
            >
              Confirm
            </van-button>
          </van-col>
        </van-row>
      </el-card>

      <van-button
        size="small"
        class="bottom-btn"
        @click="handleSubmit"
      >
        Next
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SignaturePad from "signature_pad";
import PaymentChannelList from "@/components/PaymentChannelList";
export default {
  name: "ApplyMoreChannelContent",
  props: {
    step: String
  },
  components: {
    PaymentChannelList
  },
  computed: {
    ...mapState({
      totalPaymentChannelList: "paymentChannelList",
      recommendChannelsStore: "recommendChannelsStore",
      merchantId: state => state.merchantProfile.id
    })
  },
  data() {
    return {
      form: {},
      dialog: false,
      checkList: [],
      choosingChannels: [],
      checked: false,
      signData: this.$store.state.form.signData || null,
      picESignature: this.$store.state.form.picESignature || "",
      signaturePad: null,
      signatureLocked: false
    }
  },
  watch: {
    checkList(val) {
      if (val.length > 0) {
        this.choosingChannels = this.totalPaymentChannelList.filter(channel => val.includes(String(channel.id)));
      }
      if (val.length === 0) {
        this.choosingChannels = [];
      }
    }
  },
  methods: {
    handleNext() {
      this.$emit("update:step", "2")
    },
    handleSubmit() {
      let submitRequest = this.choosingChannels.map(channel => ({
        applicationStatus: 0,
        mdr: 12,
        merchantId: this.merchantId,
        channelId: channel.id,
        channelStatus: 1
      }));
      this.$api.submitMerchantChannels(submitRequest).then(res => {
        if (res.data.code === 200) {
          // update channel list
          this.$store.commit("updateChannels", res.data.data.merchantChannelConfigVoList);
          this.$router.push({ name: "Services" });
        }
      });
    },

    openViewChannelsDetailDialog() {
      this.dialog = true;
    },
    stopDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    tandc(event) {
      event.preventDefault();
      this.$store.commit("UpdateForm", {
        signData: this.signData,
        picESignature: this.picESignature
      });
      this.$router.push({ name: "TermsAndConditions" });
    },
    sign() {
      var canvas = this.$refs.sign;

      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      var width = window.innerWidth * 0.8 * 0.9;
      var height = 200;

      // This part causes the canvas to be cleared
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      // canvas.width = canvas.offsetWidth * ratio;
      // canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);

      this.signaturePad = new SignaturePad(canvas, {
        minWidth: 1,
        maxWidth: 2,
        penColor: "rgb(0,0,0)"
      });

      if (this.$store.state.form.signData) {
        this.signaturePad.fromDataURL(this.$store.state.form.signData);
      }
    },
    confirmSignature() {
      var signaturePad = this.$refs.signaturePad;
      if (signaturePad.isEmpty()) {
        // display error message
        this.$notify("Signature is empty");
      } else {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        if (!isEmpty) {
          this.uploadSign(this.dataURItoBlob(data));
        }
      }
    },
    clear() {
      var signaturePad = this.$refs.signaturePad;
      this.picESignature = "";
      signaturePad.clearSignature();
      signaturePad.openSignaturePad();
      this.signatureLocked = false;

      var canvas = document.querySelector("#pad > canvas");
      // var ratio = Math.max(window.devicePixelRatio || 1, 1);
      var width = window.innerWidth * 0.8 * 0.9;
      var height = 200;

      // This part causes the canvas to be cleared
      canvas.width = width;
      canvas.height = height;
    },
    uploadSign(fileObj) {
      var vm = this;
      var UploadApi = this.$store.state.uploadImgUrl;
      var form = new FormData();
      form.append("file", fileObj);
      form.append("type", "signature");

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", UploadApi, true);
      xhr.onload = function() {
        var res = JSON.parse(xhr.response);
        console.log(res);

        if (res.code === 200) {
          vm.picESignature = res.data.url;
          vm.$toast("success");
          vm.$refs.signaturePad.lockSignaturePad();
          vm.signatureLocked = true;
        } else {
          vm.$notify({
            message: "Upload failed",
            duration: 5000
          });
          vm.$refs.signaturePad.openSignaturePad();
          vm.signatureLocked = false;
          return false;
        }
      };
      xhr.send(form);
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-more-channel-content{
    min-height: calc(100vh - 80px);
    background-color: #F8F9F9;
    padding: 24px 15px 0 15px;
    .title {
      font-size: 17px;
      padding: 20px 10%;
      text-align: center;
      color: #2F3941;
      text-transform: uppercase;
      font-weight: bold;
    }

    .title-line {
      width: 80px;
      height: 4px;
      background-color: #d7d7d7;
      margin-left: calc(50% - 40px);
      position: relative;
      top: -8px;
    }

    .box-card {
      padding-bottom: 10px;
      // margin: 30px 0;
      .query-item {
        padding-left: 10px;
      }
    }

    .label-title {
      font-size: 14px;
      line-height: 24px;
      color: #053c5e;
      &.required:before {
        color: #f56c6c;
        content: "*";
        //display:inline;
        margin-right: 0.25rem;
      }
    }
    .payment-channel-box {
      text-align: left;

      .checkbox-box {
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        position: relative;
        background: #ffffff;
        padding-bottom: 10px;
        border-bottom: 1px solid #d8dee6;
        //box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
        //border-radius: 8px;

        > div {
          font-size: 16px;
          line-height: 22px;
          display: inline-block;
          margin-left: 90px;
          position: relative;
          top: 8px;
        }

        .channel-checkbox {
          position: absolute;
          right: 10px;
          top: -8px;
        }

        img {
          width: 70px;
          vertical-align: middle;
          top: 10px;
          // margin-left: 5px;
          position: absolute;
          left: 0;
        }
      }
    }

    .payment-dialog-link {
      position: relative;
      top: 12px;
      text-decoration: underline;
      font-size: 14px;
      color: #1f73b7;
      letter-spacing: 0;
      text-align: center;
      line-height: 20px;
    }

    .bottom-btn{
      width:100%;
      margin-top: 40px;
      margin-bottom: 80px;
      font-size:14px;
    }

    .disabled {
      background-color: #DCDCDC;
      color: #929292;
    }

    .plain{
      color: #053C5E;
      background-color: #ffffff ;
      border-color: #053C5E;
    }
  }

</style>

<style lang="scss">
  .apply-more-channel-content{
    .van-checkbox__label {
      color: #2F3941;
      margin-left: 0;
      position: relative;
      top: -22px;
      left: 22px;
      font-size: 16px;
      margin-right: 25px;
    }
    .el-checkbox__inner {
      width: 24px;
      height: 24px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #04a777;
      border-color: #04a777;
    }
    .el-checkbox__inner::after {
      height: 12px;
      left: 8px;
      width: 5px;
    }

  }
</style>
