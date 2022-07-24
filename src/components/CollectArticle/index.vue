<template>
  <van-button
    :icon="isCollected ? 'star' : 'star-o'"
    :class="{
      collected: isCollected
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>
<script>
import { addCollect, deleteCollect } from '@/api'
export default {
  name: 'CollectArticle',
  model: {
    prop: 'isCollected',
    event: 'update-is_collected'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
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
    async onCollect () {
      this.loading = true
      try {
        // 已收藏就取消收藏
        if (this.isCollected) {
          await deleteCollect((this.articleId))
        } else {
          // 没有收藏就添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('update-is_collected', !this.isCollected)

        this.$toast.fail(!this.isCollected ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败，请重试！')
      }
      this.loading = false
    }
  }
}
</script>
<style lang='less' scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>
