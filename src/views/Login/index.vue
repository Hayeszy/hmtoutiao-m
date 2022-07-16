<template>
  <div class=''>
    <!-- 导航栏 -->
    <van-nav-bar
      class="navbar"
      title="登录"
      @click-left="backToPrePage"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form
      ref="form"
      @submit="login"
      class="form"
    >
      <van-field
        v-model="mobile"
        name= 'mobile'
        placeholder="请输入手机号"
        :rules=mobileRules
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules=codeRules
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="6 * 1000"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="code-btn"
            round
            size="mini"
            @click="sendCode"
            native-type="button"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          block
          type="info"
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  props: {
  },
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('./my')
      } catch (error) {
        const status = error.response.status
        let message = '登录错误，请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  components: {
  }
}
</script>
<style scoped lang='less'>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
// 表单样式
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 10;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
  .van-button--info {
    background: #6db4fb;
    border: none;
  }
}
</style>
