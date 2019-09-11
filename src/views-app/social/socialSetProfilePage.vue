<template>
  <div class="socialSetProfilePage">
    <app-common-header :title="$t('Social.profileTitle')" />
    <div class="nameCard">
      <div class="title">{{ $t('Social.businessName') }}</div>
      <van-field
          class="answerInput"
          ref="inputText"
          :border="true"
          :placeholder="$t('Social.placeHolder')"
          @keyup.enter.native="$refs.inputText.blur()"
          v-model="answer"
        ></van-field>
    </div>
    <div class="profileCard">
      <div class="title">{{ $t('Social.merchantPhoto') }}</div>
      <div class="subTitle">{{ $t('Social.photoText') }}</div>
      <!-- <md-image-reader
        class="takePhoto"
        name="reader0"
        @select="onReaderSelect"
        @complete="onReaderComplete"
        @error="onReaderError"
        is-multiple
        ></md-image-reader>
      <div class="takePhoto"><van-icon class="iconfont iconcamera" /><div class="textMsg">Take Photo</div></div>
      <div class="takePhoto"><van-icon class="iconfont iconcamera" /><div class="textMsg">Take Photo</div></div> -->
      <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader1']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }">
        <md-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#111A34"
          type="fill"
          font-color="#fff"
          @click.native="onDeleteImage('reader1', index)"
        >
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader1"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></md-image-reader>
        <van-icon class="iconfont iconcamera" />
        <div class="textMsg">Take Photo</div>
      </li>
      </ul>
    </div>
    <van-button class="saveBtn">{{ $t('Social.saveBtn') }}</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import {Icon, ImageReader, Tag, Toast} from 'mand-mobile'
import imageProcessor from 'mand-mobile/components/image-reader/image-processor'

Vue.component(ImageReader.name, ImageReader)

export default {
  name: "socialSetProfilePage",
  components: {
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Tag.name]: Tag,
  },
  data() {
    return {
      answer: "",
      imageList: {
        reader0: [
          '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
          '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
        ],
        reader1: [],
      }
    }
  },
  methods: {
    goNextPage(){
      this.$router.push({ name: "SocialHome" });
    },
    takePhoto() {
    },
    onReaderSelect() {
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, {dataUrl}) {
      const demoImageList = this.imageList[name] || []

      imageProcessor({
        dataUrl,
        width: 200,
        height: 200,
        quality: 0.1,
      }).then(({dataUrl}) => {
        dataUrl && demoImageList.push(dataUrl)
      })
      this.$set(this.imageList, name, demoImageList)

      Toast.hide()
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
    }
  }
};
</script>

<style lang="scss" scoped>
.socialSetProfilePage {
  width: 100%;
  background-color: #E9EBED;

  .nameCard {
    position: relative;
    width: 328px;
    height: 180px;
    margin: 16px 16px 0 16px;
    background-color: white;
    border-radius: 8px;

    .title {
      position: absolute;
      margin: 16px 30px 0 30px;
      width: 264px;
      font-size: 20px;
      font-weight: bolder;
      color: #2F3941;
      text-align: center;
    }

    .answerInput {
      position: absolute;
      background-color: #ffffff;
      font-size: 24px;
      line-height: 80px;
      height: 80px;
      width: calc(100vw - 95px);
      border-radius: 4px;
      border: 1px solid #87929d;
      box-sizing: border-box;
      margin: 64px 30px 0 30px;
    }
  }

  .profileCard {
    width: 328px;
    height: 658px;
    margin: 16px 16px 0 16px;
    background-color: white;
    border-radius: 8px;

    .title {
      font-size: 20px;
      font-weight: bolder;
      color: #2F3941;
      margin: 16px 16px 0 16px;
      text-align: center;
    }

    .subTitle {
      font-size: 14px;
      color: #2F3941;
      text-align: center;
      margin: 16px 30px 0 30px;
    }

    .takePhoto{
      position: relative;
      background-color: #ffffff;
      height: 118px;
      width: 264px;
      border-radius: 4px;
      border: 1px solid #87929d;
      box-sizing: border-box;
      margin: 30px 30px 0 30px;

      .iconfont {
        position: absolute;
        font-size: 40px;
        color: #ffa702;
        width: 32px;
        margin-top: 30px;
        margin-left: calc(50% - 20px);
      }

      .textMsg {
        position: absolute;
        font-size: 14px;
        color: #68737D;
        text-align: center;
        bottom: 20px;
        width: 100%;
      }
    }
  }

  .saveBtn {
    margin: 32px 16px 0 16px;
    width: 328px;
    font-size: 14px;
    background-color: #ffa702;
    color: #052d46;
  }

}
</style>
