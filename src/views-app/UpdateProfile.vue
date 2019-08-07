<template>
  <div class="update-profile">
<!--    <van-nav-bar-->
<!--      right-text="Discard"-->
<!--      @click-right="handleDiscard"-->
<!--      @click-left="$router.back()"-->
<!--      title="Update Profile"-->
<!--      left-arrow-->
<!--    />-->

<!--    Remove the left arrow now because same purpose as Discard-->
    <van-nav-bar
      right-text="Discard"
      @click-right="handleDiscard"
      title="Update Profile"
    />

    <div class="heading">
      <h1>Business Profile Update</h1>
      <div class="description">Updating of profile may take up to 24 hours to approve. Please note that you are not allowed to edit the National ID field.</div>
    </div>

    <el-form
      label-width="0px"
      status-icon
      :model="form"
      ref="elForm"
      size="small"
      label-position="top"
      style="width: 100%; margin-top: 10px;"
    >
      <el-card class="box-card">
        <!-- applicant information -->
        <div class="title">Applicant Information</div>
        <div class="title-line"></div>
        <el-form-item
          label="First Name"
          prop="applicantFirstName"
          :rules="[{ required: true, message: 'This field is required.', trigger: 'blur' }, { validator: this.$store.state.validationPatterns.englishAlphabetAndThai, message: 'Please enter a valid First Name', trigger: 'blur'}]"
        >
          <el-input
            v-model="form.applicantFirstName"
            placeholder="First Name"
            :maxlength="25"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Last Name"
          prop="applicantLastName"
          :rules="[
      { required: true, message: 'This field is required.', trigger: 'blur' },
      { validator: this.$store.state.validationPatterns.englishAlphabetAndThai, message: 'Please enter a valid Last Name', trigger: 'blur'}
    ]"
        >
          <el-input
            v-model="form.applicantLastName"
            placeholder="Last Name"
            :maxlength="25"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="National ID"
          prop="applicantNationalId"
          :rules="[
        { required: true, message: 'This field is required.', trigger: 'blur' },
        { pattern: this.$store.state.validationPatterns.nationaldID, message: 'Please enter a valid National ID', trigger: 'blur'}
        ]"
        >
          <el-input
            v-model="form.applicantNationalId"
            placeholder="National ID"
            :maxlength="13"
          ></el-input>
        </el-form-item>
        <div class="label-title required">Contact Number</div>
        <el-form-item
          class="spec-mobile"
          prop="contactPersonPhoneNumber"
        >
          <span
            slot="label"
            style="width: 100px;"
          >
            <van-icon name="phone-o" />
            <span
              style="margin: 0 10px;"
              class="disable-field"
            >{{$store.state.form.nationalCode}}</span>
            <van-icon name="arrow-down" />
          </span>
          <el-input
            :value="$store.state.form.phone"
            placeholder="Mobile Number"
            width="100%"
            :maxlength="this.$store.state.phone.maxLen"
            :minength="this.$store.state.phone.minLen"
            readonly
            disabled
          ></el-input>
        </el-form-item>

      </el-card>

      <el-card class="box-card">
        <!-- merchant information -->
        <div class="title">Business Information</div>
        <div class="title-line"></div>

        <el-form-item
          label="Business Name (English)"
          prop="bizNameEn"
          :rules="[
      { required: true, message: 'This field is required.', trigger: 'blur' },
      { validator: checkSpecificKey, message: 'Please enter a valid business name in English', trigger: 'blur'}
    ]"
        >
          <el-input
            v-model="form.bizNameEn"
            placeholder="Business Name(English)"
            :maxlength="25"
          ></el-input>
        </el-form-item>

        <div
          class="inner-tips"
          style="font-size:11px;color: #929292;"
          v-show="$store.state.form.haveBizReg === '1'"
        >If your business is registered, please enter the Business Registration Number above.</div>
        <el-form-item
          label="Business Category"
          prop="sicName"
          :rules="[
        { required: true, message: 'Select a category.', trigger: 'blur'}
        ]"
        >
          <van-cell
            :title="`${this.form.mccName || 'Select Category'} `"
            is-link
            @click="handleGotoSIC"
          />
        </el-form-item>
        <!-- business address -->
        <el-form-item
          label="Business Address"
          prop="bizAddr"
          :rules="[
      { required: true, message: 'This field is required.', trigger: 'blur' }
    ]"
        >
          <el-input
            v-model="form.bizAddr"
            placeholder="Business Address"
            type="textarea"
            :maxlength="110"
            :autosize="{minRows: 0, maxRows: 3}"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="Province"
          prop="provinceName"
          :rules="[
        { required: true, message: 'Select a province.', trigger: 'blur' }
      ]"
        >
          <van-cell
            :title="`${this.form.provinceName || 'Select Province'} `"
            is-link
            @click="handleGotoProvince"
          />
        </el-form-item>

        <el-form-item
          label="Postal Code"
          prop="postal"
          :rules="[
        { required: true, message: 'This field is required.', trigger: 'blur' },
        { pattern: this.$store.state.validationPatterns.postalCode, message: 'Please enter a valid Postal Code', trigger: 'blur'},
        { validator: validateProvince, trigger: 'blur'}
    ]"
        >
          <el-input
            v-model.number="form.postal"
            placeholder="Postal Code"
            :maxlength="5"
          ></el-input>
        </el-form-item>
      </el-card>

      <el-card class="box-card">
        <!-- personal information -->
        <div class="title">Supporting Documents</div>
        <div class="title-line"></div>
        <div class="section-header">Identity Card</div>
        <div class="document-cell">
          <div class="document-name-container">
            <div class="label-title required">Front of National ID</div>
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
            <div class="label-title required">Back of National ID</div>
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
            <div class="label-title required double-line">Photo of yourself with Front of National ID</div>
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
        <!-- business information -->
        <template v-if="isBizRegNumberValid">
          <div class="section-header">Business Registration</div>
          <!-- personal information -->
          <div class="document-cell">
            <div class="document-name-container">
              <div class="label-title required double-line">Business Registration Document </div>
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
        </template>
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
    <van-button
      size="large"
      class="bottom-btn"
      @click="handleNext"
    >
      Submit Update
    </van-button>

  </div>
</template>

<script>
import { Idle } from "idlejs/dist";
import util from "@/util.js";
import { mapState } from "vuex";

export default {
  name: "UpdateProfil",
  computed: {
    isBizRegNumberValid: function() {
      if (this.form.bizRegNumber) {
        if (
          this.$store.state.validationPatterns.nationaldID.exec(
            this.form.bizRegNumber
          )
        ) {
          return true;
        }
      }
      return false;
    },
    ...mapState({
      columns: "nationalCodeList",
      applicationInfoId: state => state.merchantProfile.applicationInfoId
    })
  },
  data() {
    return {
      form: {
        contactPersonFirstName: "",
        contactPersonLastName: ""
      },
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
      ls: window.localStorage,
      idleTimer: null,
      active: 0,
      value: "",
      show: false,
      merchantProfileInfoActive: require("@/assets/imgs/stepper_active.png"),
      uploadDefault: require("@/assets/imgs/upload_default.png"),
      servicesInfoDefault: require("@/assets/imgs/stepper_default.png"),
      provinceHasError: false,
      provinceError: "",
      validateProvince: (rule, value, callback) => {
        if (!this.isProvinceValid()) {
          callback(new Error("Please enter a valid Postal Code"));
          // show error;
        } else {
          callback();
        }
      }
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
    if (!this.idleTimer) {
      this.idleTimer = new Idle()
        .whenNotInteractive()
        .within(this.$store.state.idleTime, 1000) // minute
        .do(() => {
          console.log("EnterInfo page idle");

          util.redirectToHome(this, this.$store.state.messages.idleTimeout);
        });
    }
    console.log("idletimer start enter info");

    this.idleTimer.start();

    // scroll to saved position
    if (this.$route.query.position) {
      var savedPosition = this.$route.query.position;
      window.scrollTo(0, savedPosition);
    }
    if (this.$route.query.flag && this.$route.query.flag === "back") {
      this.$refs["elForm"].validate();
    }
  },
  beforeDestroy() {
    if (this.idleTimer) {
      console.log("idle timer stop enter info");

      this.idleTimer.stop();
    }
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
          // TODO: close the app and return to the previous page.
          this.$router.push({ name: "Home" });
          // util.redirectToHome(this);
        })
        .catch(() => {
          // on cancel
          this.$dialog.close();
        });
    },
    handleGotoSIC() {
      var savedPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.$store.commit("UpdateForm", this.form);

      this.$router.push({
        name: "SIC",
        query: {
          position: savedPosition,
          origin: "UpdateProfile"
        }
      });
    },
    handleGotoProvince() {
      var savedPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      // go to select province page
      this.$store.commit("UpdateForm", this.form);
      this.$router.push({
        name: "Province",
        query: {
          position: savedPosition,
          origin: "UpdateProfile"
        }
      });
    },
    onPostalChange() {
      if (this.form.postal && this.form.postal) {
        if (!this.isProvinceValid()) {
          this.provinceHasError = true;
          this.provinceError = "Please enter a valid Postal Code";
          // show error;
        }
      }
      this.provinceError = "";
      this.provinceHasError = false;
    },
    // onConfirm(value, index) {
    //   this.form.contactPersonNationalCode = value;
    //   this.show = false;
    // },
    // onCancel() {
    //   this.show = false;
    // },
    isProvinceValid() {
      if (this.form.postal && this.form.provinceName) {
        if (
          this.form.postal.toString().substring(0, 2) !==
          this.form.provincePostalPrefix.toString()
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    handleNext() {
      this.form.contactPersonFirstName = this.form.applicantFirstName;
      this.form.contactPersonLastName = this.form.applicantLastName;
      this.form.contactPersonNationalCode = this.form.applicantPhoneNumber.substring(
        0,
        3
      );
      this.form.contactPersonPhoneNumber = this.form.applicantPhoneNumber.substring(
        3
      );

      this.$refs["elForm"].validate(valid => {
        if (valid) {
          var errMsg =
            "Missing documents. Please upload all the necessary documents before proceeding to the next step.";
          if (!this.frontUrl || !this.backUrl || !this.faceUrl) {
            this.$notify({
              message: errMsg,
              duration: 5000
            });
            return false;
          }
          if (this.isBizRegNumberValid) {
            if (!this.certUrl) {
              this.$notify({
                message: errMsg,
                duration: 5000
              });
              return false;
            }
          }
          this.gotoNextPage();
        } else {
          this.$notify({
            message:
              "There are errors in your form. Please correct them before trying again.",
            duration: 5000
          });
          return false;
        }
      });
    },
    gotoNextPage() {
      const form = this.form;
      debugger;
      const params = {
        applicantFirstName: form.applicantFirstName,
        applicantLastName: form.applicantLastName,
        applicantNationalId: form.applicantNationalId,
        applicantPhoneNumber: form.applicantPhoneNumber,
        bizNameEn: form.bizNameEn,
        bizNameTh: "",
        mcc: form.mccID,
        bizAddr: form.bizAddr,
        postalCode: form.postal,
        province: form.provinceName,
        picNationalIdBackName: form.backName,
        picNationalIdBack: form.backUrl,
        picNationalIdFrontWithFaceName: form.faceName,
        picNationalIdFrontWithFace: form.faceUrl,
        picNationalIdFrontName: form.frontName,
        picNationalIdFront: form.frontUrl,
        parentId: this.applicationInfoId
      };

      this.$api.updateBusinessProfile(params).then(res => {
        if (res.data.code === 200) {
          this.$router.back();
          return false;
        }

        this.$notify(res.data.msg);
      });
    },

    // From UploadInfo.vue, - obsolete, not using now.
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
      var UploadApi = this.$store.state.uploadImgUrl;
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
    },

    checkSpecificKey(rule, value, callback) {
      var specialKey = this.$store.state.validationPatterns.invalidCharset;
      for (var i = 0; i < value.length; i++) {
        if (specialKey.indexOf(value.substr(i, 1)) !== -1) {
          callback(new Error(rule.message));
        }
      }
      callback();
    },
    confirmRefresh(event) {
      var e = event || window.event;
      e.preventDefault();
      this.$store.commit("removeUselessForm");
      e.returnValue =
        "Your previous application was discarded, please start your application over again.";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.update-profile {
  background-color: #ffffff;
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

  .label-title {
    font-size: 14px;
    color: #053c5e;
    height: 40px;
    line-height: 40px;

    &.double-line {
      height: 40px;
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
    }
  }

  .box-card {
    padding: 10px;
    // margin: 30px 10px;
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
    color: #b41800;
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
      width: 40px;
      height: 40px;
      border: #0059ff 1px dotted;
      border-radius: 3px;
      text-align: center;

      .el-icon-plus {
        padding: 14px 6px;
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
}
</style>
