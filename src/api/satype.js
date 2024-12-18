import request from '@/utils/request'
export function getTypeList() {
  return request({
    url:'/satype/list',
    method:'get',
  })
}