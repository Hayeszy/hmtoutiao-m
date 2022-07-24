<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
  >关注</van-button>
</template>
<script>
import { addFollow, deleteFollow } from '@/api'
export default {
  name: 'FollowUser',
  // 自定义 v-model 的数据名称
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      // 开启loading
      this.loading = true

      try {
        // 已关注就取消关注
        if (this.isFollowed) {
          await deleteFollow(this.userId)
        } else {
          // 否则添加关注
          await addFollow(this.userId)
        }
        // 更新视图
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请重试！'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast.fail(message)
      }

      // 关闭 loading 状态
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
</style>
