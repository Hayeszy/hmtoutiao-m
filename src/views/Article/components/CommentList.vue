<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="已显示全部评论"
    :error="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>
<script>
import { getComments } from '@/api'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  model: {
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created () {
    // 开启loading
    this.loading = true
    this.onLoad()
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // a 文章的评论
        // c 评论的回复
        // 文章的评论，传递文章的 ID
        // 评论的回复，传递评论的 ID

        // 获取数据
        const { data } = await getComments({
          type: this.type, // 评论的类型
          source: this.source.toString(), // id
          offset: this.offset, // 获取数据偏移量，值为id，不传从第一页开始读取
          limit: this.limit // 获取评论个数
        })

        // 添加到列表
        const { results } = data.data
        // this.list.push(...results)

        // 评论数据传到父组件
        this.$emit('onload-success', data.data)

        // 关闭 loading
        this.loading = false

        // 判断还有没有数据
        if (results.length) {
          // 有就获取下一页
          this.offset = data.data.last_id
        } else {
          // 没有 finished 设置结束
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
