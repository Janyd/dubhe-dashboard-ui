import request from '@/utils/request'

export function FindLog(stepId) {
    return request({
        url   : `/log/${stepId}`,
        method: 'get'
    })
}
