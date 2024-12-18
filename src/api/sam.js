import request from '@/utils/request'
export function fetchRecordList(params) {
  return request({
    url:'/sam/list',
    method:'get',
    params:params

  })
}