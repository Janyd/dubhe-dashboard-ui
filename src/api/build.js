import request from '@/utils/request'

export function Builds(repoId, branchId, page) {
    return request({
        url   : `/build/list/${repoId}/${branchId}`,
        method: 'post',
        data  : page
    })
}
