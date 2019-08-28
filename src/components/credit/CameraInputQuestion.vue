<template>
  <div v-if="!!question.value" class="camera-input-question">
    <i class="iconfont iconsuccess" />
    <div class="title">{{question.question}}</div>
    <div class="img-container" :style="backgroundStyle">
    </div>
    <van-button class="submit-btn-disabled" disabled >{{question.limitAmount}} {{$store.state.currency}} Earned</van-button>
  </div>
  <div v-else class="camera-input-question">
    <div class="title">{{question.question}}</div>
    <el-form v-if="!form.answering"
             label-width="0px"
             :model="form"
             ref="elForm"
             size="small"
             label-position="top"
             class="elForm"
    >
      <el-form-item
        :class="error ? 'input-box-error upload-wrapper': 'upload-wrapper'"
        prop="answering">
        <div
          id="camera-input-field" @click="takePhoto"
        >
          <div class="placeholder">
            <i class="iconfont iconcamera" />
            <div class="placeholder-text">Take a photo</div>
          </div>
        </div>

      </el-form-item>
    </el-form>
    <div v-else>
      <div id="photo-question" class="img-container" :style="backgroundStyle">
      </div>
      <div
        class="img-delete"
        @click="deleteImage"
      >
        <i
          class="iconfont iconclose"
        ></i>
        Remove
      </div>
    </div>

    <div v-if="error" class="error_msg">{{$t("Credit.errorImgInput")}}</div>
    <van-button class="submit-btn" @click="handleSubmit">
      <div class="btn-text">+{{question.limitAmount}} {{$store.state.currency}} Credit</div>
      <img class="dollar-coin" src="../../assets/imgs/dollar_coin.png">
    </van-button>
  </div>
</template>

<script>
import util from "@/util.js";
export default {
  name: "CameraInputQuestion",
  props: {
    question: Object
  },
  data() {
    return {
      backgroundStyle: `background: url(${this.question.value || ""}) no-repeat`,
      form: {
        answering: ""
      },
      error: false
    }
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
      let opts = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK
      };
      navigator.camera.getPicture(this.onSuccessPhotoTaking, this.onFailPhotoTaking, opts);
    },
    onSuccessPhotoTaking(imgURI) {
      let dataURI = "data:image/jpeg;base64," + imgURI;
      var vm = this;
      vm[`${"form"}`] = { "answering": dataURI };
      vm[`${"error"}`] = false;
      vm[`${"backgroundStyle"}`] = `background: url(${dataURI}) no-repeat`;
    },
    onFailPhotoTaking() {

    },
    deleteImage() {
      this.form.answering = "";
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
    handleSubmit() {
      event.preventDefault();
      this.validateInput();
      if (!this.error) {
        // upload to cloud
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
            vm.$api.submitQuestion({ id: vm.question.id, value: resUpload.data.url }).then(
              res => {
                if (res.data.code === 200) {
                  // update vuex and localstorage
                  vm.$store.commit("UpdateCreditLimit", vm.$store.state.credit.currentCreditLimit + vm.question.limitAmount);
                  vm.$store.commit("UpdateCreditAnswer", { id: vm.question.id, value: resUpload.data.url });
                }
              }
            )
          } else {
            vm.$notify({
              message:
                "Upload failed. Please check your internet connection is stable before trying again.",
              duration: 3000
            });
            return false;
          }
        };
        xhr.send(form);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .camera-input-question{
    background-color: #ffffff;
    min-height: 320px;
    width: 304px;
    margin: auto;
    border-radius: 8px;
    color: #2F3941;
    padding: 30px 20px 20px 20px;
    box-sizing: border-box;
    position:relative;
    .iconsuccess{
      position: absolute;
      top: 10px;
      right:10px;
      color: #04a777;
      font-size:24px;
    }
    .title{
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      margin-bottom: 20px;
    }
    .answer {
      width: 264px;
      height: 98px;
      box-sizing: border-box;
      background-color: #E9EBED;
      padding-top:26px;
      font-size:24px;
      text-align:center;
      position: relative;
    }

    .upload-wrapper {
      width: 264px;
      height: 98px;
      border: 1px solid #C2C8CC;
      border-radius: 4px;
      .placeholder {
        position: absolute;
        top:18px;
        left:94px;
        text-align: center;
        .iconcamera {
          color: #ff8600;
          font-size: 27px;
        }
        .placeholder-text{
          font-size:14px;
          color:#68737D;
        }
      }
    }

    .img-container {
      width: auto;
      height: 98px;
      background-size: contain !important;
      background-position: center center !important;
      background-repeat: no-repeat !important;
    }
    .img-delete{
      text-align: center;
      width: 264px;
      height:40px;
      margin-top:12px;
      border: 1px solid #ff8600;
      border-radius: 4px;
      font-size: 14px;
      padding-top:10px;
      box-sizing: border-box;
      color: #ff8600;

      .iconclose {
        position: relative;
        top: 2px;
      }
    }
    .submit-btn-disabled{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 264px;
      height:40px;
      background-color: #C2C8CC !important;
      color:white !important;
      opacity: 1 !important;
      box-shadow: none !important;
      font-size: 14px;
    }

    .error_msg {
      font-size: 14px;
      color: #B41800;
      text-align: center;
      width: 100%;
    }
    .input-box{
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
    .input-box-error {
      border: 1px solid #B41800;
      border-radius: 4px;
    }
    .submit-btn{
      position:absolute;
      bottom:20px;
      left:20px;
      width: 264px;
      height:40px;
      background-color: #FF8600;
      color:white;
      font-size: 14px;
      .btn-text{
        position: relative;
        left: -20px;
        top: -2px;
      }
      .dollar-coin{
        width: 24px;
        height:24px;
        position: absolute;
        top: 7px;
        right: 55px;
      }
    }
  }
</style>

<style lang="scss">
  .camera-input-question{
    .el-input--small .el-input__inner{
      border: none;
      border-radius: 4px;
      width:264px;
      height: 98px;
      font-size:24px;
      color: #87929D;
      text-align: center;
      padding-right:0;
    }
  }
</style>
