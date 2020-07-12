import request from '@/utils/request'

export function Credential() {
    return request({
        url   : '/cred/list',
        method: 'get'
    })
}

export function AddCredential(data) {
    return request({
        url   : '/cred/add',
        method: 'post',
        data  : data
    })
}

export function RandRsa() {
    return request({
        url   : '/cred/rand',
        method: 'get'
    })
}
