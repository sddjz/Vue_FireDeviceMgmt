import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/user/list',
    method:'get',
    params:params
  })
}
export function getUserDetail(params) {
  return request({
    url:'/user/userdetail',
    method:'get',
    params:params
  })
}


export function getUserInBank() {
  return request({
    url:'/user/getinbank',
    method:'get',
  })
}


export function listUserPos() {
  return request({
    url:'/user/poslist',
    method:'get',
  })
}


export function updateUser(params) {
  return request({
    url:'/user/update',
    method:'post',
    params:params
  })
}


/**
export function addUser(user,fileUpload) {
  return request({
    url:'/user/add',
    method:'post',
    data:{user,fileUpload},
    headers: { "Content-Type": "multipart/form-data"}//,"Content-Length":"calculated when request is sent" } //设置请求头请求格式为JSON
  })
}*/


export function addUser(form) {
  return request({
    url:'/user/add',
    method:'post',
    data:form,
    headers: { "Content-Type": "multipart/form-data"}//,"Content-Length":"calculated when request is sent" } //设置请求头请求格式为JSON
  })
}
 

export function upload(file) {
  return request({
    url:'/user/upload',
    method:'post',
    data:file,
    headers: { "Content-Type": "multipart/form-data"}//,"Content-Length":"calculated when request is sent" } //设置请求头请求格式为JSON
  })
}





