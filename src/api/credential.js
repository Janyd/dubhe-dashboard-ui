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
        data
    })
}

