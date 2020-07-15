import request from '@/utils/request'

export function Steps(buildId) {
    return request({
        url   : `/step/${buildId}`,
        method: 'get'
    })
}
