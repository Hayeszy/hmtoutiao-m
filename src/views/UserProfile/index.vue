<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png, jpg"
      @change="onFileChange"
    />

    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
    >
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <!-- 个人信息 -->

    <!-- 编辑照片 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%;"
      position="bottom"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        @update-photo="user.photo = $event"
        :photo="photo"
        @close="isUpdatePhotoShow = false"
      />
    </van-popup>
    <!-- /编辑照片 -->

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%;"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日 -->
  </div>
</template>
<script>
import { getUserProfile } from '@/api'
import UpdateName from '@/views/UserProfile/components/UpdateName.vue'
import UpdateGender from '@/views/UserProfile/components/UpdateGender.vue'
import UpdateBirthday from '@/views/UserProfile/components/UpdateBirthday.vue'
import UpdatePhoto from '@/views/UserProfile/components/UpdatePhoto.vue'
export default {
  name: 'UserProfile',
  props: {},
  components: {
    UpdateBirthday,
    UpdateGender,
    UpdateName,
    UpdatePhoto
  },
  created () {
    this.loadUserProfile()
  },
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      photo: ''
    }
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
        // console.log(data)
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 获取blob 数据
      this.photo = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 同一张图片，change不会触发
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang='less' scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
