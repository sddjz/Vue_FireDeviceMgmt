import request from '@/utils/request'

export function listRectify(params) {
  return request({
    url: '/rectify/list',
    method: 'get',
    params: params
  })
}

export function addRectify(rectify) {
  return request({
    url: '/rectify/add',
    method: 'post',
    data: rectify
  })
}

export function getItem(id) {
  return request({
    url: '/rectify/getitem',
    method: 'get',
    params:id
  })
}