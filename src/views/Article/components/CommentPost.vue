<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论内容"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0
      })

      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id
          content: this.message, // 评论内容
          // 对评论内容发表回复，需要传递所属文章id。
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })

        // 关闭弹出层，清空文本框
        this.message = ''
        // 将发布内容传到父组件
        this.$emit('post-success', data.data)

        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
