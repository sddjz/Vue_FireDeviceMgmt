import request from '@/utils/request'

export function listReview(params) {
  return request({
    url: '/review/list',
    method: 'get',
    params: params
  })
}