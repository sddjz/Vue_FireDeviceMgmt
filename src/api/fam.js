import request from '@/utils/request'
export function fetchRecordList(params) {
  return request({
    url:'/fam/list',
    method:'get',
    params:params

  })
}