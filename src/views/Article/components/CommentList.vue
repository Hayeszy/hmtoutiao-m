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
      v-for="item in localList"
      :key="item.com_id"
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
  data () {
    return {
      localList: this.list,
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  created () {
    // 开启初始 loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type, //  评论类型
          source: this.source, // id
          offset: this.offset,
          limit: this.limit // 获取的评论数据个数
        })

        // 将数据添加到列表
        const { results } = data.data
        this.localList.push(...results)

        // 把文章评论数量传到父组件
        this.$emit('onload-success', data.data)

        this.loading = false

        // 判断还有没有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
