<template>
  <div class="upload-info">
    <van-nav-bar
      title
      left-text="Back"
      left-arrow
      @click-left="handleBack"
      right-text="Discard"
      @click-right="handleDiscard"
      :border="false"
    />

    <!--    <el-steps-->
    <!--      :active="active"-->
    <!--      style="width: 80%; margin-left: 10%;"-->
    <!--      align-center-->
    <!--    >-->
    <!--      <el-step title="Enter Info">-->
    <!--        <img-->
    <!--          :src="enterInfoActive"-->
    <!--          alt-->
    <!--          slot="icon"-->
    <!--          width="20rem"-->
    <!--        >-->
    <!--      </el-step>-->
    <!--      <el-step title="Upload">-->
    <!--        <img-->
    <!--          :src="uploadActive"-->
    <!--          alt-->
    <!--          slot="icon"-->
    <!--          width="20rem"-->
    <!--        >-->
    <!--      </el-step>-->
    <!--      <el-step title="Preview">-->
    <!--        <img-->
    <!--          :src="reviewDefault"-->
    <!--          alt-->
    <!--          slot="icon"-->
    <!--          width="20rem"-->
    <!--        >-->
    <!--      </el-step>-->
    <!--    </el-steps>-->

    <!-- personal information -->
    <div class="heading">
      <h1>Upload Documents</h1>
      <div class="tips">
        Please upload the following documents.
        Image should not exceed {{$store.state.maxFileSize}}MB per file.
      </div>
    </div>

    <div class="section-header">Identity Card</div>

    <el-card class="box-card">
      <!-- personal information -->
      <div class="document-cell">
        <div class="document-name-container">
          <div class="label-title">Front of Card</div>
          <div class="file-name">{{frontName}}</div>
        </div>
        <div
          class="action-area"
          v-if="frontStatus === 0"
        >
          <el-upload
            action="front"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="fileCheck"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div
          class="action-area-spinner"
          v-if="frontStatus === 1"
        >
          <van-loading
            style="padding: 14px 8px;width: 100%;"
            type="spinner"
          />
        </div>
        <div
          class="action-area-delete"
          v-if="frontStatus === 2"
        >
          <i
            class="el-icon-delete"
            @click="deleteImage('front')"
          ></i>
        </div>
      </div>
      <div class="document-cell">
        <div class="document-name-container">
          <div class="label-title">Back of Card</div>
          <div class="file-name">{{backName}}</div>
        </div>
        <div
          class="action-area"
          v-if="backStatus === 0"
        >
          <el-upload
            action="back"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="fileCheck"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div
          class="action-area-spinner"
          v-if="backStatus === 1"
        >
          <van-loading
            style="padding: 14px 8px;width: 100%;"
            type="spinner"
          />
        </div>
        <div
          class="action-area-delete"
          v-if="backStatus === 2"
        >
          <i
            class="el-icon-delete"
            @click="deleteImage('back')"
          ></i>
        </div>
      </div>

      <div class="document-cell">
        <div class="document-name-container">
          <div class="label-title">Photo of yourself with card</div>
          <div class="file-name">{{faceName}}</div>
        </div>
        <div
          class="action-area"
          v-if="faceStatus === 0"
        >
          <el-upload
            action="face"
            :show-file-list="false"
            :http-request="uploadImg"
            :before-upload="fileCheck"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div
          class="action-area-spinner"
          v-if="faceStatus === 1"
        >
          <van-loading
            style="padding: 14px 8px;width: 100%;"
            type="spinner"
          />
        </div>
        <div
          class="action-area-delete"
          v-if="faceStatus === 2"
        >
          <i
            class="el-icon-delete"
            @click="deleteImage('face')"
          ></i>
        </div>
      </div>
    </el-card>

    <!-- business information -->
    <template v-if="$store.state.form.bizRegNumber">
      <div class="section-header">Business Registration</div>
      <el-card class="box-card">
        <!-- personal information -->
        <div
          class="document-cell"
          style="border-bottom:0"
        >
          <div class="document-name-container">
            <div class="label-title">BUSINESS REGISTRATION DOCUMENT</div>
            <div class="file-name">{{certName}}</div>
          </div>
          <div
            class="action-area"
            v-if="certStatus === 0"
          >
            <el-upload
              action="cert"
              :show-file-list="false"
              :http-request="uploadImg"
              :before-upload="fileCheck"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <div
            class="action-area-spinner"
            v-if="certStatus === 1"
          >
            <van-loading
              style="padding: 14px 8px;width: 100%;"
              type="spinner"
            />
          </div>
          <div
            class="action-area-delete"
            v-if="certStatus === 2"
          >
            <i
              class="el-icon-delete"
              @click="deleteImage('cert')"
            ></i>
          </div>
        </div>
      </el-card>
    </template>

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
import EnterInfoActive from "@/assets/imgs/enter_info_active.png";
import UploadActive from "@/assets/imgs/upload_active.png";
import ReviewDefault from "@/assets/imgs/review_default.png";
import { Idle } from "idlejs/dist";
import util from "@/util.js";

export default {
  name: "upload-info",
  idleTimer: null,
  data() {
    return {
      value: "",
      active: 1,
      // load file url
      frontUrl: this.$store.state.form.frontUrl || "",
      backUrl: this.$store.state.form.backUrl || "",
      faceUrl: this.$store.state.form.faceUrl || "",
      certUrl: this.$store.state.form.certUrl || "",

      // load file name
      frontName: this.$store.state.form.frontName || "",
      backName: this.$store.state.form.backName || "",
      faceName: this.$store.state.form.faceName || "",
      certName: this.$store.state.form.certName || "",

      // load file size
      frontSize: this.$store.state.form.frontSize || "",
      backSize: this.$store.state.form.backSize || "",
      faceSize: this.$store.state.form.faceSize || "",
      certSize: this.$store.state.form.certSize || "",

      frontStatus: this.$store.state.form.frontUrl ? 2 : 0, // 0 - no file, 1 - uploading, 2 - have file
      backStatus: this.$store.state.form.backUrl ? 2 : 0,
      faceStatus: this.$store.state.form.faceUrl ? 2 : 0,
      certStatus: this.$store.state.form.certUrl ? 2 : 0,

      show: false,
      enterInfoActive: EnterInfoActive,
      uploadActive: UploadActive,
      reviewDefault: ReviewDefault,
      form: {},
      ls: window.localStorage
    };
  },
  methods: {
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
    onConfirm(value, index) {
      this.nationalCode = value;
      this.show = false;
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
      const url = "/api/self-onboarding/image/upload";
      var UploadApi =
        process.env.VUE_APP_DEVICETYPE === "APP"
          ? process.env.VUE_APP_BASEURL + url
          : url;
      var fileObj = param.file;
      var originalFileName = fileObj.name;
      var originalFileSizeMb = util.byteToMb(fileObj.size);

      console.log("original file size: ", originalFileSizeMb);
      console.log("original file name: ", originalFileName);

      var type = param.action;
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
    handleNext() {
      var errMsg =
        "Missing documents. Please upload all the necessary documents before proceeding to the next step.";
      if (!this.frontUrl || !this.backUrl || !this.faceUrl) {
        this.$notify({
          message: errMsg,
          duration: 5000
        });
        return false;
      }
      if (this.$store.state.form.bizRegNumber) {
        if (!this.certUrl) {
          this.$notify({
            message: errMsg,
            duration: 5000
          });
          return false;
        }
      }

      this.commitForm();
      this.$router.push({
        name: "PreviewInfo"
      });
    },
    commitForm() {
      this.$store.commit("UpdateForm", {
        frontUrl: this.frontUrl,
        backUrl: this.backUrl,
        faceUrl: this.faceUrl,
        certUrl: this.certUrl,
        frontName: this.frontName,
        backName: this.backName,
        faceName: this.faceName,
        certName: this.certName,
        frontSize: this.frontSize,
        backSize: this.backSize,
        faceSize: this.faceSize,
        certSize: this.certSize
      });
      this.ls.setItem("form", JSON.stringify(this.$store.state.form));
    }
  },
  mounted() {
    window.scrollTo(0, 0);
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
  },
  beforeDestroy() {
    if (this.idleTimer) {
      this.idleTimer.stop();
    }
  },
  created() {
    this.$store.commit("InitForm");
    const form = Object.assign({}, this.$store.state.form);
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.form = Object.assign({}, form);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.upload-info {
  background-color: #f2f2f2;
  .van-nav-bar {
    background-color: #f2f2f2;
  }
  .title {
    font-size: 17px;
    padding: 20px 10%;
    text-align: center;
    color: #d8d8d8;
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
    // text-transform: uppercase;
    margin: 20px 20px 20px 20px;
    font-weight: 500;
  }

  .box-card {
    margin: 30px 30px;
  }

  .document-cell {
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    border-bottom: #d8d8d8 1px solid;

    .document-name-container {
      flex: 1;
      display: flex;
      flex-direction: column;

      .label-title {
        font-size: 14px;
        line-height: 24px;
        color: #053c5e;
        text-transform: uppercase;
      }
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
  // .form {
  //   width: 80%;
  //   margin-left: 10%;
  // }

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

  .placeholder {
    width: 100%;
  }
}
</style>
