import request from '@/utils/request'
export function getTypeList() {
  return request({
    url:'/fatype/list',
    method:'get',
  })
}