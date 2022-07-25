<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="localComment.aut_photo"
    />
    <div
      slot="title"
      class="title-wrap"
    >
      <div class="user-name">{{ localComment.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{
          liked: localComment.is_liking
        }"
        :icon="localComment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="onCommentLike"
      >{{ localComment.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ localComment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ localComment.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', localComment)"
        >回复 {{ localComment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>
<script>
import { addCommentLike, deleteCommentLike } from '@/api'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localComment: this.comment,
      commentLoading: false
    }
  },
  methods: {
    async onCommentLike () {
      this.commentLoading = true
      try {
        if (this.localComment.is_liking) {
          // 已点赞就取消
          await deleteCommentLike(this.localComment.com_id)
          this.localComment.like_count--
        } else {
          // 没有则添加点赞
          await addCommentLike(this.localComment.com_id)
          this.localComment.like_count++
        }
        this.localComment.is_liking = !this.localComment.is_liking
      } catch (error) {
        this.$toast('操作失败，请重试')
      }
      this.commentLoading = false
    }
  }
}
</script>
<style lang='less' scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
