<template>
  <div class="services-info">
    <van-nav-bar
      title="New Application"
      left-text=""
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

    <el-steps
      :active="active"
      style="width: 80%; margin-left: 10%; margin-top: 20px;"
      align-center
    >
      <el-step title="Merchant Profile">
        <img
          :src="merchantProfileInfoActive"
          alt
          slot="icon"
          width="20px"
        >
      </el-step>
      <el-step title="Payment Service">
        <img
          :src="servicesInfoActive"
          alt
          slot="icon"
          width="20px"
        >
      </el-step>
    </el-steps>
    <div v-if="serviceType.includes('0')">
      <el-form
        label-width="0px"
        status-icon
        :model="form"
        ref="elFormPayment"
        size="small"
        label-position="top"
        style="width: 100%;  margin-top: 10px;"
      >
        <div class="heading">
          <h1>Payment Channel Services</h1>
        </div>
        <el-card class="box-card">
          <!-- applicant information -->
          <div class="title">Payment Channels</div>
          <div class="title-line"></div>
          <el-checkbox-group
            v-model="checkList"
            text-color="#000000"
            fill="#409EFF"
            class="payment-channel-box"
          >
            <div
              v-for="item in paymentChannelList"
              :key="item.id"
              class="checkbox-box"
            >
              <img :src="item.img">
              <div>{{item.label}}</div>

              <el-checkbox
                :label="item.id"
                :key="item.id"
                style="margin-left: 20%;padding: 10px 0;"
                class="channel-checkbox"
              >
              </el-checkbox>
            </div>

          </el-checkbox-group>
          <div
            class="payment-dialog-link"
            @click="activateDialog()"
          >Click here to view payment channel details</div>
        </el-card>
      </el-form>
      <van-dialog
        v-model="dialog"
        scroll=paper
        class="scroll-dialog"
        :showConfirmButton="false"
      >
        <div
          class="heading"
          style="text-align: left"
        >
          <h1>Payment Channel Details</h1>
          <van-icon
            name="cross"
            @click="dialog = false"
          />
        </div>
        <div
          v-for="item in paymentChannelList"
          :key="item.id"
          class="box-popup"
        >
          <div class="popup-title">
            <img :src="item.img">
            <div class="img-label">{{item.label}}</div>
          </div>
          <div class="popup-desc">
            <el-row>
              <el-col :span="12">
                <div class="left-desc">Service Fee </div>
              </el-col>
              <el-col :span="12">
                <div class="right-desc">0.1 - 0.3%</div>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12">
                <div class="left-desc">Settlement Date</div>
              </el-col>
              <el-col
                :span="12"
                v-if="item.id==='2'"
              >
                <div class="right-desc">0 day</div>
              </el-col>
              <el-col
                :span="12"
                v-else
              >
                <div class="right-desc">1 day</div>
              </el-col>
            </el-row> -->
          </div>
        </div>
      </van-dialog>

    </div>
    <div v-if="serviceType.includes('1')">
      <el-form
        label-width="0px"
        status-icon
        :model="form"
        ref="elFormMarketing"
        size="small"
        label-position="top"
        style="width: 100%;  margin-top: 10px;"
      >
        <div class="heading">
          <h1>Marketing Services</h1>
        </div>
        <el-card class="box-card">
          <div class="title">Marketing Info</div>
          <div class="title-line"></div>
          <div class="query-item">
            <span class="label-title">Expected Revenue per Month (THB)</span>
            <el-form-item
              class="spec-mobile"
              prop="revenuePerMonth"
              :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' },{ pattern: this.reg.regEx.revenue.regExp, message: 'Please enter a valid Revenue', trigger: 'blur'}]"
            >
              <span
                class="pre-fill"
                slot="label"
              >
                THB
              </span>
              <el-input
                v-model="form.revenuePerMonth"
                :maxlength="10"
                width="100%"
              ></el-input>
            </el-form-item>
          </div>
          <div class="query-item">
            <span class="label-title">Selling URL</span>
            <el-form-item
              class="spec-mobile"
              prop="sellingUrl"
              :rules="[
      { required: false, message: 'This field is required.', trigger: 'blur' },
      { pattern: this.reg.regEx.url.regExp, message: 'Please enter a valid URL', trigger: 'blur'}
    ]"
            >
              <span
                class="pre-fill"
                slot="label"
              >
                http://
              </span>
              <el-input
                v-model="form.sellingUrl"
                :maxlength="120"
              ></el-input>
            </el-form-item>
          </div>
          <div class="document-cell">
            <div class="document-name-container">
              <div class="label-title">Photo of Shop</div>
              <div class="file-name">{{shopName}}</div>
            </div>
            <div
              class="action-area"
              v-if="shopStatus === 0"
            >
              <el-upload
                action="shop"
                :show-file-list="false"
                :http-request="uploadImg"
                :before-upload="fileCheck"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div
              class="action-area-spinner"
              v-if="shopStatus === 1"
            >
              <van-loading
                style="padding: 14px 8px;width: 100%;"
                type="spinner"
              />
            </div>
            <div
              class="action-area-delete"
              v-if="shopStatus === 2"
            >
              <i
                class="el-icon-delete"
                @click="deleteImage('cert')"
              ></i>
            </div>
          </div>
        </el-card>

      </el-form>
    </div>

    <div class="settlement">
      <el-form
        label-width="0px"
        status-icon
        :model="form"
        ref="elFormSettlement"
        size="small"
        label-position="top"
        style="width: 100%; "
      >
        <el-card class="box-card">
          <div class="title">Settlement</div>
          <div class="title-line"></div>
          <div
            class="settlement-desc"
            style="display: block;"
          >
            Choose how you want to receive your revenue.
          </div>
          <el-radio-group
            v-model="form.settlement"
            size="medium"
            fill="#0AA877"
          >
            <el-radio :label="1">
              <div style="display: inline-block">
                Manual Settlement (Recommended)
              </div>

            </el-radio>
            <div class="settlement-desc">
              Manually transfer all revenue into your balance. Enjoy 10% lower servicing fee on all payment channels.
            </div>
            <el-radio :label="2">
              <div style="display: inline-block; margin-top: 20px;">
                Auto Settlement
              </div>

            </el-radio>
            <div class="settlement-desc">
              Automatically transfer all revenue into your balance at the end of each day.
            </div>
          </el-radio-group>
        </el-card>

      </el-form>
    </div>
    <van-button
      size="large"
      class="bottom-btn"
      @click="handleNext"
      style="margin-bottom:100px;"
    >
      Next
    </van-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Idle } from "idlejs/dist";
import util from "@/util.js";
export default {
  name: "ServicesInfo",
  idleTimer: null,
  data() {
    return {
      merchantProfileInfoActive: require("@/assets/imgs/stepper_active.png"),
      merchantProfileInfoDefault: require("@/assets/imgs/stepper_default.png"),
      servicesInfoActive: require("@/assets/imgs/stepper_active.png"),
      active: 1,
      form: {},
      dialog: false,
      checkList:
        this.$store.state.form.paymentChannelList !== undefined
          ? this.$store.state.form.paymentChannelList.split(",")
          : ["1", "2", "3", "4", "5"],
      shopName: this.$store.state.form.shopName || "",
      shopUrl: this.$store.state.form.shopUrl,
      shopSize: this.$store.state.form.shopSize,
      shopStatus: this.$store.state.form.shopUrl ? 2 : 0,
      ls: window.localStorage
    };
  },
  computed: {
    ...mapState({
      paymentChannelList: "paymentChannelList",
      serviceType: state => state.form.serviceType,
      reg: "reg"
    })
  },
  methods: {
    activateDialog() {
      this.dialog = true;
      event.preventDefault();
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
          util.redirectToHome(this, this.$store.state.messages.idleTimeout);
        })
        .catch(() => {
          // on cancel
          this.$dialog.close();
        });
    },
    handleBack() {
      this.commitForm();
      this.$router.back();
    },
    deleteImage(type) {
      var status = type + "Status";
      var url = type + "Url";
      var name = type + "Name";

      this[`${status}`] = 0;
      this[`${url}`] = "";
      this[`${name}`] = "";
    },
    fileCheck(file) {
      var originalFileSizeMb = util.byteToMb(file.size);

      const fileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf"
      ];

      if (!fileTypes.includes(file.type)) {
        this.$notify(
          "Incorrect file format. Please ensure the documents you upload are in JPG, PNG, JPEG or PDF format."
        );
        return false;
      }

      if (originalFileSizeMb > this.$store.state.maxFileSize) {
        this.$notify({
          message: "File size exceeds limit, please select another file.",
          duration: 5000
        });
        return false;
      }

      return true;
    },
    uploadImg(param) {
      var vm = this;
      var UploadApi = "/api/self-onboarding/image/upload";
      var fileObj = param.file;
      var originalFileName = fileObj.name;
      var originalFileSizeMb = util.byteToMb(fileObj.size);

      console.log("original file size: ", originalFileSizeMb);
      console.log("original file name: ", originalFileName);

      var type = param.action;
      console.log("Type: ", type);
      // show uploading gif
      var nextStausKey = type + "Status";
      this[`${nextStausKey}`] = 1;

      var form = new FormData();
      form.append("file", fileObj);
      form.append("type", type);

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", UploadApi, true);
      xhr.onload = function() {
        var res = JSON.parse(xhr.response);
        if (res.code === 200) {
          vm[`${nextStausKey}`] = 2;
          vm[`${type + "Name"}`] = originalFileName;
          vm[`${type + "Size"}`] = originalFileSizeMb;
          vm[`${type + "Url"}`] = res.data.url;
          vm.commitForm();
        } else {
          vm[`${nextStausKey}`] = 0;
          vm.$notify({
            message:
              "Upload failed. Please check your internet connection is stable before trying again.",
            duration: 3000
          });
          return false;
        }
      };

      xhr.onerror = function() {
        vm[`${nextStausKey}`] = 0;
        vm.$notify({
          message:
            "Upload failed. Please check your internet connection is stable before trying again.",
          duration: 3000
        });
      };

      xhr.send(form);

      // // compress file
      // // eslint-disable-next-line no-new
      // new Compressor(fileObj, {
      //   quality: vm.$store.state.imageCompressRate,
      //   success(result) {
      //     var compressedFile = result;
      //     var compressedFileName = result.name;
      //     var compressedFileSize = util.byteToMb(result.size);

      //     console.log("compressed file name: ", compressedFileName);
      //     console.log("compressed file size: ", compressedFileSize);

      //     var form = new FormData();
      //     form.append("file", compressedFile);
      //     form.append("type", type);

      //     // XMLHttpRequest 对象
      //     var xhr = new XMLHttpRequest();
      //     xhr.open("post", UploadApi, true);
      //     xhr.onload = function() {
      //       var res = JSON.parse(xhr.response);
      //       if (res.code === 200) {
      //         vm[`${nextStausKey}`] = 2;
      //         vm[`${type + "Name"}`] = compressedFileName;
      //         vm[`${type + "Size"}`] = compressedFileSize;
      //         vm[`${type + "Url"}`] = res.data.url;
      //       } else {
      //         vm[`${nextStausKey}`] = 0;
      //         vm.$notify({
      //           message: "Upload failed",
      //           duration: 5000
      //         });
      //         return false;
      //       }
      //     };
      //     xhr.send(form);
      //   },
      //   error(err) {
      //     vm.$notify("Compress image failed. Please try again.");
      //     console.log(err.message);
      //   }
      // });
    },
    commitForm() {
      this.$store.commit("UpdateForm", this.form);
      if (this.serviceType.includes("0")) {
        this.$store.commit("UpdateForm", {
          paymentChannelList: this.checkList.join(",")
        });
      }
      if (this.serviceType.includes("1")) {
        this.$store.commit("UpdateForm", {
          shopName: this.shopName,
          shopUrl: this.shopUrl,
          shopSize: this.shopSize,
          shopStatus: this.shopStatus
        });
      }
      this.$store.commit("UpdateForm", {
        settlementType: String(this.form.settlement)
      });
      this.ls.setItem("form", JSON.stringify(this.$store.state.form));
    },
    handleNext() {
      if (this.serviceType.includes("0") && this.checkList.length === 0) {
        this.$notify(this.$t("noSelectPaymentChannelErrorMsg"));
        return false;
      }
      if (this.form.settlement === "0") {
        this.$notify(this.$t("noSelectSettlementErrorMsg"));
        return false;
      }

      let validationFlag = true;
      if (this.serviceType.includes("1")) {
        this.$refs["elFormMarketing"].validate(valid => {
          if (!valid) {
            this.$notify({
              message:
                "There are errors in your form. Please correct them before trying again."
            });
            validationFlag = false;
            return false;
          }
        });
      }

      if (validationFlag) {
        this.commitForm();
        this.$router.push({
          name: "PreviewInfo"
        });
      }
    }
  },
  created() {
    this.$store.commit("InitUserInfo");
    const form = Object.assign({ settlement: 1 }, this.$store.state.userInfo);
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.form = Object.assign({}, form, this.$store.state.form);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.services-info {
  background-color: #f2f2f2;
  .van-dialog__footer {
    display: none;
  }
  .van-nav-bar {
    background-color: #f2f2f2;
  }
  .title {
    font-size: 17px;
    padding: 20px 10%;
    text-align: center;
    color: #ffa702;
    text-transform: uppercase;
    font-weight: bold;
  }

  .pre-fill {
    color: #929292;
    min-width: 50px;
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
    position: relative;

    .description {
      margin: 0 10px 0 10px;
    }
    > h1 {
      padding: 0 20px;
      font-size: 24px;
      color: #2f3941;
    }
    > i {
      position: absolute;
      top: -14px;
      right: 14px;
    }
  }
  .box-popup {
    padding: 0;
    margin: 20px 20px 10px;
    line-height: 50px;
    position: relative;
    background: #ffffff;
    border: #d8dee6 1px solid;
    box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    .popup-title {
      align-items: flex-start;
      border-bottom: 20px;
      padding: 10px 0;
      img {
        height: 40px;
        vertical-align: middle;
        top: 16px;
        margin-left: 5px;
      }

      .img-label {
        font-size: 16px;
        line-height: 22px;
        display: inline-block;
        margin-left: 10px;
      }
    }
    .popup-desc {
      font-size: 14px;
      line-height: 22px;
      background: #f5f7fa;
      padding: 10px 15px;
      margin: 1px;
      .left-desc {
        text-align: left;
        font-weight: bold;
      }
      .right-desc {
        text-align: right;
      }
    }
  }
  .box-card {
    padding-bottom: 10px;
    // margin: 30px 0;
    .query-item {
      padding-left: 10px;
    }
  }

  .tips {
    font-size: 16px;
    margin-top: 30px;
  }
  .inner-tips {
    font-size: 16px;
    margin-top: 30px;
  }
  .subtitle {
    font-size: 16px;
  }

  .label-title {
    font-size: 14px;
    line-height: 24px;
    color: #ffa702;
    &.required:before {
      color: #f56c6c;
      content: "*";
      //display:inline;
      margin-right: 0.25rem;
    }
  }
  // Document area start
  .document-cell {
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    border: 1px solid #d8dee6;
    border-radius: 8px;
    font-size: 16px;
    color: #b41800;
    letter-spacing: 0;
    line-height: 24px;
    margin: 16px 0 20px;
    border-bottom: #d8d8d8 1px solid;

    .document-name-container {
      flex: 1;
      display: flex;
      flex-direction: column;

      .file-name {
        font-size: 12px;
        color: #929292;
        width: 180px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .action-area {
      display: flex;
      align-items: center;
      width: 46px;
      height: 44px;
      border: #0059ff 1px dotted;
      border-radius: 3px;
      text-align: center;

      .el-icon-plus {
        padding: 14px 8px;
        width: 100%;
        color: #0059ff;
      }
    }
    .action-area-spinner {
      display: flex;
      align-items: center;
      width: 46px;
      height: 44px;
      text-align: center;

      .el-icon-spinner {
        padding: 14px 8px;
        width: 100%;
      }
    }
    .action-area-delete {
      display: flex;
      align-items: center;
      width: 46px;
      height: 44px;
      border: #929292 1px solid;
      border-radius: 3px;
      text-align: center;

      .el-icon-delete {
        padding: 14px 8px;
        width: 100%;
      }
    }
  }
  .section-header {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    // text-transform: uppercase;
    margin: 35px 20px 15px 20px;
    font-weight: bold;
  }
  // Document area end

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

  .settlement {
    .settlement-desc {
      color: #68737d;
      font-size: 14px;
      line-height: 22px;
      margin: 10px 0;
      font-weight: normal;
    }
  }

  .scroll-dialog {
    height: 90vh;
    padding: 10px 0;
    overflow: scroll;
    width: 90%;
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
}
</style>

<style lang="scss">
.channel-checkbox {
  .el-checkbox__label {
    font-size: 0px;
  }
}
.el-form-item__content {
  min-width: 100px;
  padding: 0 0 0 5px;
}
</style>
