import request from '@/utils/request'

export function Credential() {
    return request({
        url   : '/cred',
        method: 'get'
    })
}

export function AddCredential(data) {
    return request({
        url   : '/cred',
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

export function DelCredential(id) {
    return request({
        url   : `/cred/${id}`,
        method: 'delete'
    })
}
