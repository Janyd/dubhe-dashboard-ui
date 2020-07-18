import request from '@/utils/request'

export function Builds(repoId, branchId, page) {
    return request({
        url   : `/build/list/${repoId}/${branchId}`,
        method: 'post',
        data  : page
    })
}

export function DeleteBuild(buildId) {
    return request({
        url   : `/build/${buildId}`,
        method: 'delete'
    })
}

export function Steps(buildId) {
    return request({
        url   : `/build/steps/${buildId}`,
        method: 'get'
    })
}
