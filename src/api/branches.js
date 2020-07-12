import request from '@/utils/request'

export function Branches(repoId) {
    return request({
        url   : `/branch/${repoId}`,
        method: 'get'
    })
}
