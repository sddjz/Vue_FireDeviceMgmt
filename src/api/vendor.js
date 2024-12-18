import request from '@/utils/request'

export function listVendor(params) {
    return request({
      url:'/vendor/list',
      method:'get',
      params:params
    })
  }

  export function listAll(params) {
    return request({
      url:'/vendor/listall',
      method:'get',
      params:params
    })
  }

  
export function addVendor(params) {
  return request({
    url:'/vendor/add',
    method:'post',
    data:params
  })
}