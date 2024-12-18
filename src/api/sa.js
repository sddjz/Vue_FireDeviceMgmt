import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/sa/list',
    method:'get',
    params:params
  })
}

export function fetchAllList(params) {
  return request({
    url:'/sa/listall',
    method:'get',
    params:params
  })
}

export function addSa(params) {
  return request({
    url:'/sa/add',
    method:'post',
    data:params
  })
}



