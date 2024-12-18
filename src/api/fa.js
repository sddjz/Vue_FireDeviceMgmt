import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/fa/list',
    method:'get',
    params:params
  })
}

export function fetchAllList(params) {
  return request({
    url:'/fa/listall',
    method:'get',
    params:params
  })
}

export function addFa(params) {
  return request({
    url:'/fa/add',
    method:'post',
    data:params
  })
}



