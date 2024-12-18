import request from '@/utils/request'
export function fetchPosList(params) {
  return request({
    url:'/position/list',
    method:'get',
  })
}

    //params:params
