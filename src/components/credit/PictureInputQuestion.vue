<template>
  <div
    v-if="!!question.value"
    class="picture-input-question"
  >
    <i class="iconfont iconsuccess" />
    <div class="title">{{question.question}}</div>
    <div
      class="img-container"
      :style="backgroundStyle"
    >
    </div>
    <van-button
      class="submit-btn-disabled"
      disabled
    >{{question.limitAmount}} {{$store.state.currency}} {{$t("Credit.earned")}}</van-button>
  </div>
  <div
    v-else
    class="picture-input-question"
  >
    <div class="title">{{question.question}}</div>
    <div v-if="changingImgPreview">
      <van-loading type="spinner" class="spinner"/>
    </div>
    <el-form
      v-else-if="!form.answering"
      label-width="0px"
      :model="form"
      ref="elForm"
      size="small"
      label-position="top"
      class="elForm"
    >
      <el-form-item
        :class="error ? 'input-box-error upload-wrapper': 'upload-wrapper'"
        prop="answering"
      >
        <div
          id="camera-input-field"
          @click="takePhoto"
        >
          <div class="placeholder">
            <van-row style="padding-left: 75px;">
              <van-col span="1">
                <i class="iconfont iconcamera" />
              </van-col>
              <van-col
                span="20"
                offset="3"
              >
                <div class="placeholder-text">{{ $t('Credit.takePhoto') }}</div>
              </van-col>
            </van-row>
          </div>
        </div>

      </el-form-item>
      <el-form-item
        :class="error ? 'input-box-error upload-wrapper': 'upload-wrapper'"
        prop="answering"
      >
        <el-upload
          action="answer"
          :show-file-list="false"
          :http-request="uploadImg"
        >
          <div class="placeholder">
            <van-row style="padding-left: 55px;">
              <van-col span="1">
                <i class="iconfont iconalbum" />
              </van-col>
              <van-col
                span="18"
                offset="3"
              >
                <div class="placeholder-text">{{ $t("Credit.selectAlbum") }}</div>
              </van-col>
            </van-row>
          </div>
        </el-upload>

      </el-form-item>
    </el-form>
    <div v-else>
      <div
        class="img-container"
        :style="backgroundStyle"
      >
      </div>
      <div
        class="img-delete"
        @click="deleteImage"
      >
        <i class="iconfont iconclose"></i>
        {{$t("Credit.remove")}}
      </div>
    </div>

    <div
      v-if="error"
      class="error_msg"
    >{{$t("Credit.errorImgInput")}}</div>
    <van-button
      v-if="!sendingRequest"
      class="submit-btn"
      @click="handleSubmit"
    >
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}}</div>
      <img
        class="dollar-coin"
        src="../../assets/imgs/dollar_coin.png"
      >
    </van-button>
    <van-button v-else class="submit-btn" disabled>
      <div class="btn-text"><van-loading type="spinner" color="#ffa702"/></div>
    </van-button>
  </div>
</template>

<script>
import util from "@/util.js";
export default {
  name: "PictureInputQuestion",
  props: {
    question: Object
  },
  data() {
    return {
      sendingRequest: false,
      changingImgPreview: false,
      url: "",
      backgroundStyle: `background: url(${this.question.value ||
        ""}) no-repeat`,
      form: {
        answering: ""
      },
      error: false,
      photoFromCamera: false
    };
  },
  mounted() {
    // this is to activate cordova camera plugin
    document.addEventListener("deviceready", () => console.log("device-ready"));
  },
  methods: {
    validateInput() {
      this.error = !this.form.answering;
    },
    takePhoto() {
      this.changingImgPreview = true;
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
      vm[`${"form"}`] = { answering: dataURI };
      vm[`${"error"}`] = false;
      vm[`${"photoFromCamera"}`] = true;
      vm[`${"backgroundStyle"}`] = `background: url(${dataURI}) no-repeat`;
      this.changingImgPreview = false;
    },
    onFailPhotoTaking() {
      this.changingImgPreview = false;
    },
    deleteImage() {
      this.form.answering = "";
      this.photoFromCamera = false;
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
    uploadImg(param) {
      this.changingImgPreview = true;
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
          vm[`${"form"}`] = { answering: res.data.url };
          vm[`${"error"}`] = false;
          vm[`${"backgroundStyle"}`] = `background: url(${res.data.url}) no-repeat`;
          vm[`${"changingImgPreview"}`] = false;
        } else {
          vm.$notify({
            message:
              "Upload failed. Please check your internet connection is stable before trying again.",
            duration: 3000
          });
          vm[`${"changingImgPreview"}`] = false;
          return false;
        }
      };
      //
      // xhr.onerror = function() {
      //   vm[`${nextStausKey}`] = 0;
      //   vm.$notify({
      //     message:
      //       "Upload failed. Please check your internet connection is stable before trying again.",
      //     duration: 3000
      //   });
      // };

      xhr.send(form);
    },
    handleSubmit() {
      if (this.sendingRequest) {
        return false;
      }
      if (this.photoFromCamera) {
        this.handleSubmitTakingPhoto();
      } else {
        this.handleSubmitUploadFromGallery();
      }
    },
    handleSubmitUploadFromGallery() {
      event.preventDefault();
      this.validateInput();
      if (!this.error) {
        this.sendingRequest = true;
        // send to server
        this.$api
          .submitCreditAnswer({
            id: this.question.id,
            value: this.form.answering
          })
          .then(res => {
            if (res.data.code === 200) {
              // update vuex and localstorage
              this.$store.commit(
                "UpdateCreditLimit",
                this.$store.state.credit.currentCreditLimit +
                  this.question.limitAmount
              );
              this.$store.commit("UpdateCreditAnswer", {
                id: this.question.id,
                value: this.form.answering
              });
            }
            this.sendingRequest = false;
          });
      }
    },
    handleSubmitTakingPhoto() {
      event.preventDefault();
      this.validateInput();
      if (!this.error) {
        // upload to cloud
        this.sendingRequest = true;
        var vm = this;
        var UploadApi = this.$store.state.uploadImgUrl;
        var fileObj = this.dataURItoBlob(this.form.answering);

        var type = "creditAnswer";

        var form = new FormData();
        form.append("file", fileObj);
        form.append("type", type);

        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", UploadApi, true);
        xhr.onload = function() {
          var resUpload = JSON.parse(xhr.response);
          if (resUpload.code === 200) {
            // send to server
            vm.$api
              .submitCreditAnswer({
                id: vm.question.id,
                value: resUpload.data.url
              })
              .then(res => {
                if (res.data.code === 200) {
                  // update vuex and localstorage
                  vm.$store.commit(
                    "UpdateCreditLimit",
                    vm.$store.state.credit.currentCreditLimit +
                      vm.question.limitAmount
                  );
                  vm.$store.commit("UpdateCreditAnswer", {
                    id: vm.question.id,
                    value: resUpload.data.url
                  });
                }
                vm.sendingRequest = false;
              });
          } else {
            vm.$notify({
              message:
                "Upload failed. Please check your internet connection is stable before trying again.",
              duration: 3000
            });
            vm.sendingRequest = false;
            return false;
          }
        };
        xhr.send(form);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.picture-input-question {
  background-color: #ffffff;
  min-height: 320px;
  width: calc(84vw);
  margin: auto;
  border-radius: 8px;
  color: #2f3941;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
  .iconsuccess {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #04a777;
    font-size: 24px;
  }
  .title {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
    margin-bottom: 20px;
  }
  .answer {
    width: 264px;
    height: 98px;
    box-sizing: border-box;
    background-color: #e9ebed;
    padding-top: 26px;
    font-size: 24px;
    text-align: center;
    position: relative;
  }

  .spinner {
    margin-left: calc(50% - 25px);
    width: 50px;
    height: 50px;
    margin-top: 60px;
  }
  .upload-wrapper {
    width: 98%;
    height: 52px;
    border: 1px solid #c2c8cc;
    border-radius: 4px;
    padding-top: 10px;
    box-sizing: border-box;
    .placeholder {
      /*margin-top: 20px;*/
      .iconcamera,
      .iconalbum {
        color: #ffa702;
        font-size: 17px;
      }
      .placeholder-text {
        font-size: 14px;
        color: #68737d;
      }
    }
  }

  .img-container {
    width: auto;
    height: 80px;
    background-size: contain !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  }
  .img-delete {
    text-align: center;
    width: 98%;
    height: 40px;
    margin-top: 12px;
    border: 1px solid #ffa702;
    border-radius: 4px;
    font-size: 14px;
    padding-top: 10px;
    box-sizing: border-box;
    color: #ffa702;

    .iconclose {
      position: relative;
      top: 2px;
    }
  }
  .submit-btn-disabled {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #c2c8cc !important;
    color: white !important;
    opacity: 1 !important;
    box-shadow: none !important;
    font-size: 14px;
  }

  .error_msg {
    font-size: 14px;
    color: #b41800;
    text-align: center;
    width: 100%;
  }
  .input-box {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  .input-box-error {
    border: 1px solid #b41800;
    border-radius: 4px;
  }
  .submit-btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 85%;
    height: 40px;
    background-color: #ffa702;
    color: white;
    font-size: 14px;
    .btn-text {
      display: inline-block;
      vertical-align: middle;
    }
    .dollar-coin {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-left: 4px;
    }
  }
}
</style>

<style lang="scss">
.picture-input-question {
  .el-input--small .el-input__inner {
    border: none;
    border-radius: 4px;
    width: 264px;
    height: 98px;
    font-size: 24px;
    color: #87929d;
    text-align: center;
    padding-right: 0;
  }
  .el-upload {
    display: unset;
    text-align: left;
  }
}
</style>
