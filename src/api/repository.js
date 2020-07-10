import request from '@/utils/request'

export function Repositories(page) {
    return request({
        url   : '/repo/list',
        method: 'post',
        data  : page
    })
}
