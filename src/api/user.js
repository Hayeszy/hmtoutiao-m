import request from '@/utils/request'
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 请求用户自己的信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 关注用户
export const addFollow = target => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注用户
export const deleteFollow = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 获取登录用户个人资料
export const getUserProfile = target => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 编辑用户资料
export const updateUserProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 编辑用户图片
export const uploadPhoto = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
