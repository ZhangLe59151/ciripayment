<template>
  <div class="preview-info">
    <van-nav-bar
      style="background-color: #ffffff"
      title
      left-text="Back"
      left-arrow
      @click-left="$router.back()"
      right-text="Discard"
      @click-right="handleDiscard"
      :border="false"
    >
      <div
        slot="title"
        class="header-title"
      >
        <span><b>New Application</b></span>
      </div>
    </van-nav-bar>
    <div class="heading">
      <h1>Review Application</h1>
      <div class="tips">Please ensure all information is accurate before submission.</div>
    </div>

    <div class="section-header">
      Application
      <el-button @click="$router.push({name: 'EnterInfo'})">Edit
      </el-button>
    </div>

    <el-card class="box-card">
      <!-- personal information -->
      <div class="title">Applicant Information</div>
      <div class="title-line"></div>

      <van-cell-group class="form">
        <van-panel
          title="* First Name"
          :desc="$store.state.form.applicantFirstName"
        />
        <van-panel
          title="* Last Name"
          :desc="$store.state.form.applicantLastName"
        />
        <van-panel
          title="* Contact Number"
          :desc="$store.state.form.nationalCode +' '+ $store.state.form.phone"
        />
        <van-panel
          title="* National ID"
          :desc="$store.state.form.applicantNationalId"
        />
        <van-panel
          title="Personal Account Number"
          :desc="$store.state.form.bankAccount || '-'"
        />
      </van-cell-group>
    </el-card>

    <el-card class="box-card">
      <!-- business information -->
      <div class="title">Merchant Information</div>
      <div class="title-line"></div>

      <van-cell-group class="form">
        <van-panel
          title="* Business Name (English)"
          :desc="$store.state.form.bizNameEn"
        />
        <van-panel
          title="* Business Name (Thai)"
          :desc="$store.state.form.bizNameTh"
        />
        <van-panel
          title="Business Registration Number"
          :desc="$store.state.form.bizRegNumber || '-'"
        />
        <van-panel
          title="* Business Category"
          :desc="$store.state.form.mccName"
        />
        <van-panel
          title="* Business Address"
          :desc="$store.state.form.bizAddr"
        />
        <van-panel
          title="* Province"
          :desc="$store.state.form.provinceName"
        />
        <van-panel
          title="* Postal Code"
          :desc="$store.state.form.postal + ''"
        />
      </van-cell-group>
    </el-card>

    <el-card class="box-card">
      <div class="title">Supporting Documents</div>
      <div class="title-line"></div>
      <h3 style="text-align: center">Identity Card</h3>
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="document-card"
      >
        <embed
          v-if="isPdfCheck($store.state.form.frontName)"
          class="image"
          :src="$store.state.form.frontUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        >
        <img
          v-else
          :src="$store.state.form.frontUrl"
          alt
          class="image"
        >
        <div style="padding: 14px 0px 14px 5px;">
          <span class="label-title">Front of National ID</span>
          <div class="bottom clearfix">
            <time class="time">{{$store.state.form.frontName}}</time>
            <div class="size">{{ $store.state.form.frontSize }} MB</div>
          </div>
        </div>
      </el-card>

      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="document-card"
      >
        <embed
          v-if="isPdfCheck($store.state.form.backName)"
          class="image"
          :src="$store.state.form.backUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        >
        <img
          v-else
          :src="$store.state.form.backUrl"
          alt
          class="image"
        >
        <div style="padding: 14px 0px 14px 5px;">
          <span class="label-title">Back of National ID</span>
          <div class="bottom clearfix">
            <time class="time">{{ $store.state.form.backName }}</time>
            <div class="size">{{ $store.state.form.backSize }} MB</div>
          </div>
        </div>
      </el-card>

      <el-card
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="document-card"
      >
        <embed
          v-if="isPdfCheck($store.state.form.faceName)"
          class="image"
          :src="$store.state.form.faceUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        >
        <img
          v-else
          :src="$store.state.form.faceUrl"
          alt
          class="image"
        >
        <div style="padding: 14px 0px 14px 5px;">
          <span class="label-title">Photo of Yourself with Front of National ID</span>
          <div class="bottom clearfix">
            <time class="time">{{ $store.state.form.faceName }}</time>
            <div class="size">{{ $store.state.form.faceSize }} MB</div>
          </div>
        </div>
      </el-card>
      <h3
        style="text-align: center"
        v-if="this.$store.state.form.bizRegNumber"
      > Business Registration</h3>
      <el-card
        v-if="this.$store.state.form.bizRegNumber"
        :body-style="{ padding: '0px' }"
        shadow="never"
        class="document-card"
      >
        <embed
          v-if="isPdfCheck($store.state.form.certName)"
          class="image"
          :src="$store.state.form.certUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        >
        <img
          v-else
          :src="$store.state.form.certUrl"
          alt
          class="image"
        >
        <div style="padding: 14px 0px 14px 5px;">
          <span class="label-title">Business Registration Document</span>
          <div class="bottom clearfix">
            <time class="time">{{ $store.state.form.certName }}</time>
            <div class="size">{{ $store.state.form.certSize }} MB</div>
          </div>
        </div>
      </el-card>
    </el-card>

    <div class="section-header">
      Services
      <el-button @click="$router.push({name: 'ServicesInfo'})">Edit</el-button>
    </div>

    <div v-if="serviceType.includes('0')">
      <el-card class="box-card">
        <!-- payment channels -->
        <div class="title">Payment Channels</div>
        <div class="title-line"></div>
        <el-card
          :body-style="{ padding: '0px' }"
          style="border: 0"
          shadow="never"
        >
          <div
            v-for="item in paymentChannelListOutput"
            :key="item.id"
          >
            <div
              class="checkbox-box"
              v-if="selectedPayments.includes(item.id)"
            >
              <img :src="item.img">
              <div class="label">{{item.label}}</div>

            </div>
          </div>
        </el-card>

        <van-cell-group class="form">

        </van-cell-group>
      </el-card>
    </div>

    <div v-if="serviceType.includes('1')">

      <el-card class="box-card">
        <!-- marketing information -->
        <div class="title">Marketing Information</div>
        <div class="title-line"></div>

        <van-cell-group class="form">
          <van-panel
            title="* Expected Revenue per Month"
            :desc="'THB '+$store.state.form.revenuePerMonth"
          />
          <van-panel
            title="Selling URL"
            :desc="$store.state.form.sellingUrl ? 'http://'+ $store.state.form.sellingUrl : '-'"
          />

          <el-card
            :body-style="{ padding: '0px' }"
            shadow="never"
            class="document-card"
            v-show="$store.state.form.shopUrl"
          >
            <embed
              v-if="isPdfCheck($store.state.form.shopName)"
              class="image"
              :src="$store.state.form.shopUrl"
              type="application/pdf"
              width="100%"
              height="100%"
            >
            <img
              v-else
              :src="$store.state.form.shopUrl"
              alt
              class="image"
            >
            <div style="padding: 14px 0px 14px 5px;">
              <span class="label-title">Photo of Shop</span>
              <div class="bottom clearfix">
                <time class="time">{{$store.state.form.shopName}}</time>
              </div>
            </div>
          </el-card>
        </van-cell-group>
      </el-card>
    </div>
    <div
      class="img-list"
      style="margin-top: 15px;"
    >
      <van-checkbox
        v-model="checked"
        id="checkb"
      >
        <div
          style="font-size:13px; color:#606266; float:left; margin-right:20px"
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
    </div>

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

      <div class="sign-btn-list">
        <van-button
          id="clearBtn"
          size="small"
          @click="clear"
        >Clear
        </van-button>
        <van-button
          v-if="!picESignature"
          id="confirmBtn"
          size="small"
          @click="confirmSignature"
        >Confirm
        </van-button>
      </div>
    </el-card>

    <van-button
      size="large"
      class="bottom-btn"
      @click="submitAppliction"
      style="margin-bottom:100px;"
    >
      Submit
    </van-button>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";
import EnterInfoActive from "@/assets/imgs/enter_info_active.png";
import ReviewActive from "@/assets/imgs/review_active.png";
import UploadActive from "@/assets/imgs/upload_active.png";
import { mapState } from "vuex";
import { Idle } from "idlejs/dist";
import util from "@/util.js";

export default {
  name: "preview-info",
  idleTimer: null,
  data() {
    return {
      form: {},
      active: 2,
      checked: false,
      signData: this.$store.state.form.signData || null,
      enterInfoActive: EnterInfoActive,
      uploadActive: UploadActive,
      reviewActive: ReviewActive,
      serviceType: this.$store.state.form.serviceType || ["0", "1"],
      bizRegNumber: this.$store.state.form.bizRegNumber + "",
      picESignature: this.$store.state.form.picESignature || "",
      signaturePad: null,
      signatureLocked: false,
      color: "white"
    };
  },
  computed: {
    ...mapState({
      paymentChannelListOutput: "paymentChannelList"
    }),
    selectedPayments: function() {
      return this.$store.state.form.paymentChannelList || [];
    }
  },
  methods: {
    isPdfCheck(fileName) {
      if (fileName === undefined) {
        return false;
      }
      const i = fileName.lastIndexOf(".");
      return fileName.slice(i + 1) === "pdf";
    },
    stopDefault(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    handleDiscard() {
      this.$dialog
        .confirm({
          title: "Discard application? ",
          message: "All entered and uploaded information will be lost.",
          confirmButtonText: "Discard",
          cancelButtonText: "Cancel"
        })
        .then(() => {
          this.$store.commit("ClearForm");
          util.redirectToHome(this);
        })
        .catch(() => {
          // on cancel
          this.$dialog.close();
        });
    },
    onConfirm(value, index) {
      this.nationalCode = value;
      this.show = false;
    },
    // returns true if every pixel's uint32 representation is 0 (or "blank")
    isCanvasBlank(canvas) {
      const context = canvas.getContext("2d");

      const pixelBuffer = new Uint32Array(
        context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
      );

      return !pixelBuffer.some(color => color !== 0);
    },
    submitAppliction() {
      if (!this.checked) {
        this.$notify(
          "You must agree to the terms and conditions before submitting the application."
        );
        return false;
      }

      if (!this.picESignature) {
        this.$notify(
          "E-Signature required. Please provide your e-Signature before submitting your application."
        );
        return false;
      }

      // const form = this.$store.state.form;

      let form = {};

      const storedForm = Object.assign({}, this.$store.state.form);
      form.applicantPhoneNumber = storedForm.applicantPhoneNumber;
      form.applicantFirstName = storedForm.applicantFirstName;
      form.applicantLastName = storedForm.applicantLastName;
      form.applicantNationalId = storedForm.applicantNationalId;
      form.applicantEmail = storedForm.applicantEmail;
      form.bankAccount = storedForm.bankAccount ? storedForm.bankAccount : null; // convert "" to null
      form.mcc = storedForm.mccID;
      form.bizNameEn = storedForm.bizNameEn;
      form.bizNameTh = storedForm.bizNameTh;
      form.bizAddr = storedForm.bizAddr;
      form.bizRegNumber = storedForm.bizRegNumber
        ? storedForm.bizRegNumber
        : null; // convert "" to null
      form.province = storedForm.provinceName;
      form.postalCode = storedForm.postal;
      form.contactPersonFirstName = storedForm.contactPersonFirstName;
      form.contactPersonLastName = storedForm.contactPersonLastName;
      form.contactPersonPhoneNumber = storedForm.applicantPhoneNumber;
      form.picBizRegCert = storedForm.certUrl;
      form.picNationalIdFront = storedForm.frontUrl;
      form.picNationalIdBack = storedForm.backUrl;
      form.picNationalIdFrontWithFace = storedForm.faceUrl;
      form.picESignature = this.picESignature;
      form.haveBankAccount = storedForm.haveBankAccount;
      form.haveBizReg = storedForm.haveBizReg;
      form.agreeTc = "1";
      form.serviceType = storedForm.serviceType;
      form.paymentChannelList = storedForm.paymentChannelList;
      form.revenuePerMonth = storedForm.revenuePerMonth;
      form.sellingUrl =
        form.serviceType.includes(1) && storedForm.sellingUrl
          ? "http://".concat(storedForm.sellingUrl)
          : "";

      form.shopName = storedForm.shopName;
      form.shopUrl = storedForm.shopUrl;
      form.shopSize = storedForm.shopSize;
      form.shopStatus = storedForm.shopStatus;
      form.settlementType = storedForm.settlementType;

      console.log(form);
      this.$api.submitAppliction(form).then(res => {
        if (res.data.code === 200) {
          this.$toast("finished!");
          this.$store.state.lineCode = res.data.data.bindSecret;
          this.$store.state.lineUrl = res.data.data.lineAccountUrl;
          this.$router.push({ name: "Success" });
        } else {
          this.$notify("failed: " + res.data.msg);
        }
      });
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
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
    uploadSign(fileObj) {
      var vm = this;
      var UploadApi = "/api/self-onboarding/image/upload";
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
    },
    tandc(event) {
      event.preventDefault();
      this.$store.commit("UpdateForm", {
        signData: this.signData,
        picESignature: this.picESignature
      });
      this.$router.push({ name: "TermsAndConditions" });
    },

    initSignPad() {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      var width = window.innerWidth * 0.8 * 0.9;
      var height = 200;

      // This part causes the canvas to be cleared
      var pad = this.$refs.signaturePad;
      pad.width = width * ratio;
      pad.height = height * ratio;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.sign();

    // initialize sign pad
    // this.initSignPad();

    if (!this.idleTimer) {
      this.idleTimer = new Idle()
        .whenNotInteractive()
        .within(this.$store.state.idleTime, 1000) // minute
        .do(() => {
          console.log("EnterInfo page idle");
          util.redirectToHome(this, this.$store.state.messages.idleTimeout);
        });
    }
    this.idleTimer.start();
    var icon = document.querySelector("#checkb > div > i");
    icon.style.borderColor = "#222222";
  },
  beforeDestroy() {
    if (this.idleTimer) {
      this.idleTimer.stop();
    }
  },
  created() {
    this.$store.commit("InitForm");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.preview-info {
  background-color: #f2f2f2;

  .van-nav-bar {
    background-color: #f2f2f2;
  }

  .title {
    font-size: 17px;
    padding: 20px 10%;
    text-align: center;
    color: #053c5e;
    text-transform: uppercase;
    font-weight: bold;
  }

  .title-line {
    width: 50px;
    height: 4px;
    background-color: #d7d7d7;
    margin-left: calc(50% - 25px);
    position: relative;
    top: -8px;
  }

  .steps {
    width: 80%;
    margin-left: 10%;
  }

  .heading {
    text-align: center;

    .description {
      margin: 0 10px 0 10px;
    }
  }

  .section-header {
    text-align: center;
    font-size: 20px;
    text-align: center;
    margin: 20px 20px 0 20px;
    font-weight: bolder;
    position: relative;
    > button {
      position: absolute;
      padding: 8px 16px;
      top: -4px;
      right: 12px;
    }
  }

  .box-card {
    margin: 30px 30px;
    > h3 {
      alignment: center;
    }
  }

  .tips {
    font-size: 16px;
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
  }

  .inner-tips {
    font-size: 16px;
    width: 100%;
  }

  .subtitle {
    font-size: 16px;
    width: 80%;
    margin-left: 10%;
  }

  .sign-canvas {
    width: 100%;
    height: 100%;
    margin: auto;
    border: 1px solid #d7d7d7;
  }

  .canvas-image-wrapper {
    width: 90%;
    height: 200px;
    margin-left: 5%;
    border: 1px solid #d7d7d7;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .canvas-image {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    margin: auto auto;
  }

  .sign-btn-list {
    margin-top: 20px;
    display: flex;
    margin-top: 10px;
    justify-content: center;

    button {
      margin-right: 20px;
    }
  }

  .checkbox-box {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    position: relative;
    background: #ffffff;
    padding-bottom: 10px;
    border-bottom: 1px solid #d8dee6;

    .label {
      font-size: 16px;
      line-height: 22px;
      display: inline-block;
      margin-left: 10px;
    }

    img {
      width: 70px;
      vertical-align: middle;
      top: 16px;
      margin-left: 5px;
    }
  }
  // document section start

  .document-card {
    font-size: 14px;
    line-height: 24px;

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }

    .bottom {
      display: flex;
      flex-direction: row;
      // margin: 10px 0;
    }

    .time {
      flex: 3;
      color: #0059ff;
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .size {
      flex: 1;
      text-align: right;
      margin-right: 5px;
    }

    .label-title {
      font-size: 14px;
      line-height: 24px;
      color: #323233;
    }
  }

  // document section end

  .img-list {
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;

    .img-item {
      text-align: center;
      position: relative;

      img {
        width: 60%;
        height: auto;
      }

      .img-title {
        text-align: left;
        font-size: 12px;
      }
    }

    .tc {
      color: #606266;
      text-decoration: underline;
      font-size: 12px;
    }
  }
}
</style>
