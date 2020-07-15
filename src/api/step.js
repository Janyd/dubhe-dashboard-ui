import request from '@/utils/request'

export function Steps(buildId) {
    return request({
        url   : `/step/${buildId}`,
        method: 'get'
    })
}

export function GetLog(buildId, stepId, data) {
    return request({
        url   : `/step/log/${buildId}/${stepId}`,
        method: 'post',
        data
    })
}
