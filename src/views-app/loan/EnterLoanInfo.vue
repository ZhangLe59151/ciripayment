<template>
  <div class="enter-loan-info">
    <van-nav-bar
      :title="$t('AppLoanOverview.headerTitle')"
      @click-left="handleDiscard"
      left-arrow
    />

    <el-form
      label-width="0px"
      :model="form"
      ref="elForm"
      size="small"
      label-position="top"
      style="width: 100%;"
    >
      <el-card class="box-card">
        <!-- merchant information -->
        <div
          ref="bizInfo"
          class="title"
        >{{$t("EnterLoanInfo.subTitle")}}</div>
        <div class="title-line"></div>
        <el-form-item
          :label="$t('EnterLoanInfo.bizNameEng')"
          prop="bizNameEn"
          :rules="[
      { required: true, message: $t('EnterLoanInfo.errorEnterRequired'), trigger: 'blur' },
    ]"
        >
          <el-input
            v-model="form.bizNameEn"
            :placeholder="$t('EnterLoanInfo.bizNameEng')"
            :maxlength="25"
            @blur="validateBizName"
          ></el-input>
          <div
            v-if="bizNameEnValidated"
            class="bottom-right-position"
          >
            <i class="iconfont iconsuccess success-validator" /></div>
        </el-form-item>

        <!-- business address -->
        <el-form-item
          :label="$t('EnterLoanInfo.bizAdd')"
          prop="bizAddr"
          :rules="[
      { required: true, message: $t('EnterLoanInfo.errorEnterRequired'), trigger: 'blur' }
    ]"
        >
          <el-input
            v-model="form.bizAddr"
            :placeholder="$t('EnterLoanInfo.bizAdd')"
            type="textarea"
            :maxlength="110"
            :autosize="{minRows: 0, maxRows: 3}"
            @blur="validateBizAddr"
          ></el-input>
          <div
            v-if="bizAddrValidated"
            class="bottom-right-position"
          >
            <i class="iconfont iconsuccess success-validator" /></div>
        </el-form-item>

        <el-form-item
          :label="$t('EnterLoanInfo.bizCat')"
          prop="sicName"
          :rules="[
        { required: true, message: $t('EnterLoanInfo.errorSelectCategory'), trigger: 'blur'}
        ]"
        >
          <van-cell
            :title="`${this.form.mccName || $t('EnterLoanInfo.selectCat')} `"
            is-link
            @click="handleGotoSIC"
          />
        </el-form-item>

      </el-card>

      <el-card class="box-card">
        <!-- supporting documents -->
        <div class="title">{{$t("EnterLoanInfo.subTitle3")}}</div>
        <div class="title-line"></div>
        <div class="section-header">{{$t("EnterLoanInfo.identityCard")}}</div>
        <div class="document-cell">
          <div class="document-name-container">
            <div class="label-title required">{{$t("EnterLoanInfo.frontNat")}}</div>
            <div class="file-name"><i
                v-if="!!frontName"
                class="iconfont iconsuccess success-validator margin-right-8"
              />{{frontName}}</div>
          </div>
          <div
            class="action-area"
            v-if="frontStatus === 0"
          >
            <div
              class="camera-input-question"
              @click="takePhoto('front')"
            >
              <i class="iconfont iconcamera"></i>
            </div>
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
            <div class="label-title required">{{$t("EnterLoanInfo.backNat")}}</div>
            <div class="file-name">
              <i
                v-if="!!backName"
                class="iconfont iconsuccess success-validator margin-right-8"
              />{{backName}}</div>
          </div>
          <div
            class="action-area"
            v-if="backStatus === 0"
          >
            <div
              class="camera-input-question"
              @click="takePhoto('back')"
            >
              <i class="iconfont iconcamera"></i>
            </div>
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
            <div class="label-title required double-line">{{$t("EnterLoanInfo.photos")}}</div>
            <div class="file-name"><i
                v-if="!!faceName"
                class="iconfont iconsuccess success-validator margin-right-8"
              />
              {{faceName}}</div>
          </div>
          <div
            class="action-area"
            v-if="faceStatus === 0"
          >
            <div
              class="camera-input-question"
              @click="takePhoto('face')"
            >
              <i class="iconfont iconcamera"></i>
            </div>
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
    </el-form>
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-picker
        show-toolbar
        title="National code"
        :columns="columns"
      />
    </van-popup>
    <div class="btn-group">
      <van-button
        size="small"
        class="bottom-btn"
        @click="handleNext"
      >
        {{$t("EnterLoanInfo.submit")}}
      </van-button>
    </div>

  </div>
</template>

<script>
import { Idle } from "idlejs/dist";
import util from "@/util.js";
import { mapState } from "vuex";

export default {
  name: "EnterLoanInfo",
  computed: {
    ...mapState({
      columns: "nationalCodeList"
    })
  },
  data() {
    return {
      form: {},
      // load file url
      frontUrl: this.$store.state.form.frontUrl,
      backUrl: this.$store.state.form.backUrl,
      faceUrl: this.$store.state.form.faceUrl,
      certUrl: this.$store.state.form.certUrl,

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
      ls: window.localStorage,

      active: 0,
      value: "",
      show: false,
      resAddrValidated: false,
      bizNameEnValidated: false,
      bizAddrValidated: false,
      processingDoc: ""
    };
  },
  created() {
    this.$store.commit("InitForm");
    const form = Object.assign(
      {},
      this.$store.state.form,
      this.$store.state.userInfo
    );
    Object.keys(form).map(item => {
      if (!form[`${item}`]) {
        form[`${item}`] = "";
      }
    });
    this.$store.commit("UpdateForm", form);
    this.form = Object.assign(form);
  },
  mounted() {
    // this is to activate cordova camera plugin
    document.addEventListener("deviceready", () => console.log("device-ready"));
    if (!this.$route.query.position) {
      // Scroll to top whenever apply new application
      window.scrollTo(0, 0);
    }

    // scroll to saved position - change to refs, position value somehow not working in Vue with refs
    if (this.$route.query.position) {
      var element = this.$refs["bizInfo"];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    }
    if (this.$route.query.flag && this.$route.query.flag === "back") {
      this.$refs["elForm"].validate();
    }
  },

  methods: {
    handleDiscard() {
      this.$dialog
        .confirm({
          title: this.$t("EnterLoanInfo.discard.question"),
          message: this.$t("EnterLoanInfo.discard.msg"),
          confirmButtonText: this.$t("EnterLoanInfo.discard.confirm"),
          cancelButtonText: this.$t("EnterLoanInfo.discard.cancel")
        })
        .then(() => {
          this.$store.commit("ClearForm");
          this.$router.push({ name: "Loan", query: this.$route.query });
        })
        .catch(() => {
          // on cancel
          this.$dialog.close();
        });
    },
    validateBizName() {
      this.bizNameEnValidated = !!this.form.bizNameEn;
    },
    validateBizAddr() {
      this.bizAddrValidated = !!this.form.bizAddr;
    },
    handleGotoSIC() {
      var savedPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.$store.commit("UpdateForm", this.form);

      this.$router.push({
        name: "SIC",
        query: {
          position: savedPosition,
          origin: "EnterLoanInfo"
        }
      });
    },
    takePhoto(field) {
      this.processingDoc = field;
      let opts = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK
      };
      navigator.camera.getPicture(
        this.onSuccessPhotoTaking,
        this.onFailPhotoTaking,
        opts
      );
    },
    onSuccessPhotoTaking(imgURI) {
      let dataURI = "data:image/jpeg;base64," + imgURI;
      var vm = this;
      this.uploadImg({
        file: this.dataURItoBlob(dataURI),
        action: this.processingDoc,
        name: `${this.$moment().format("YYYYMMDDHHmm")}_${this.processingDoc}.jpeg`
      });
    },
    onFailPhotoTaking() {},
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
    handleNext() {
      this.$refs["elForm"].validate(valid => {
        if (valid) {
          var errMsg = this.$t("missingDocumentErrorMsg");
          if (!this.frontUrl || !this.backUrl || !this.faceUrl) {
            this.$notify({
              message: errMsg,
              duration: 5000
            });
            return false;
          }
          this.gotoNextPage();
        } else {
          this.$notify({
            message: this.$t("marketingServiceErrorMsg"),
            duration: 5000
          });
          return false;
        }
      });
    },
    gotoNextPage() {
      this.$store.commit("UpdateForm", this.form);
      let submitForm = {
        bizAddr: this.$store.state.form.bizAddr,
        bizNameEn: this.$store.state.form.bizNameEn,
        currency: this.$store.state.currency,
        loanAmount: this.$store.state.form.loanAmount,
        mcc: this.$store.state.form.mccID,
        picNationalIdBack: this.$store.state.form.backUrl,
        picNationalIdFront: this.$store.state.form.frontUrl,
        picNationalIdFrontWithFace: this.$store.state.form.faceUrl
      };
      this.$api.applyLoan(submitForm).then(res => {
        if (res.data.code === 200 && res.data.data === true) {
          this.$store.commit("ClearForm");
          this.$router.push({ name: "LoanApplicationResult",
            params: { id: "latest" },
            query: { justSubmitted: "true", origin: this.$route.query.origin } });
        }
      });
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
      var UploadApi = this.$store.state.uploadImgUrl;
      var fileObj = param.file;
      var originalFileName = fileObj.name || param.name;
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
  }
};
</script>

<style lang="scss" scoped>
.enter-loan-info {
  background-color: #e9ebed;
  .spec-mobile {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
    span {
      color: #c0c4cc;
    }
  }
  .van-nav-bar {
    background-color: #ffffff;
  }
  .title {
    font-size: 17px;
    padding: 20px 10px;
    text-align: center;
    color: #2f3941;
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

  .label-title {
    font-size: 14px;
    color: #2f3941;
    height: 40px;
    line-height: 40px;

    &.double-line {
      height: 40px;
      width: 160px;
      line-height: 20px;
    }

    &.required:before {
      color: #f56c6c;
      content: "*";
      margin-right: 0.25rem;
    }
  }

  .steps {
    width: 80%;
    margin-left: 10%;
  }

  .heading {
    text-align: center;
    .description {
      margin: 0 10px 0 10px;

      font-size: 16px;
      color: #2f3941;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
    }

    > h1 {
      font-size: 24px;
      color: #2f3941;
      letter-spacing: 0;
      text-align: center;
      line-height: 36px;
      margin-bottom: 8px;
    }
  }

  .box-card {
    padding: 10px;
    box-shadow: none;
    // margin: 30px 10px;
  }
  .success-validator {
    color: #04a777;
  }
  .bottom-right-position {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .margin-right-8 {
    margin-right: 8px;
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
  // Document area start
  .document-cell {
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    border: 1px solid #d8dee6;
    border-radius: 8px;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
    margin: 16px 0 20px;

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
      width: 44px;
      height: 40px;
      border: #ffa702 1px solid;
      border-radius: 8px;
      text-align: center;
      box-sizing: border-box;
      background-color: #ffa702;

      .el-icon-camera-solid {
        padding: 14px 7px;
        width: 100%;
        color: #ffa702;
      }
      .iconcamera {
        font-size: 20px;
        padding: 12px 9px;
        width: 100%;
        color: white;
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
      border: #ffa702 1px solid;
      border-radius: 8px;
      text-align: center;

      .el-icon-delete {
        padding: 14px 8px;
        width: 100%;
        color: #ffa702;
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
  .btn-group {
    padding: 0 16px 0 16px;
    .bottom-btn {
      width: 100%;
      background-color: #ffa702;
      border-radius: 4px;
      height: 40px;
      font-size: 14px;
      margin-bottom: 12px;
      margin-top: 20px;
    }
  }
}
</style>

<style lang="scss">
.enter-loan-info {
  .el-textarea__inner {
    border-left: none;
    border-top: none;
    border-right: none;
    resize: none;
    border-radius: 0;
    font-size: 16px;
  }
  .el-input__inner {
    font-size: 16px;
  }
  textarea::placeholder {
    font-size: 14px !important;
  }
  input::placeholder {
    font-size: 14px !important;
  }
}
</style>
