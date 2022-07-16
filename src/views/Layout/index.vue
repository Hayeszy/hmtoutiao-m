<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
          <span class="text">{{ $store.state.user.token ? '我的' : '未登录' }}</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () { },
  computed: {},
  methods: {}
}
</script>
<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  .toutiao {
    font-size: 0.53rem;
  }
  .text {
    font-size: 0.32rem;
  }
}
</style>
