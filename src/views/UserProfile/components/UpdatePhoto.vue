<template>
  <div class="update-photo">
    <img
      :src="photo"
      ref="img"
    />
    <div class="toolbar">
      <div
        class="cancel"
        @click="$emit('close')"
      >取消</div>
      <div
        class="confirm"
        @click="onConfirm"
      >完成</div>
    </div>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api'
export default {
  name: 'UpdatePhoto',
  props: {
    photo: {
      type: [String, Object],
      retuired: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  methods: {
    onConfirm () {
      console.log(1111)
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
        console.log(blob)
      })
    },
    async updateUserPhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)

        const { data } = await uploadPhoto(formData)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        console.log(data.data.photo)
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })

    // this.cropper = new Cropper(image, [])
  }
}
</script>
<style lang='less' scoped>
.update-photo {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    display: block;
  }
}
</style>
