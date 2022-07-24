import request from '@/utils/request'

// 获取文章评论列表
export const getComments = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 评论点赞
export const addCommentLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消评论点赞
export const deleteCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 发布文章评论或评论回复
export const addComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
