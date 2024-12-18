import request from '@/utils/request'

export function listDept() {
  return request({
    url: '/dept/list',
    method: 'get',
  })
}
