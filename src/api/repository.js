import request from '@/utils/request'

export function Repositories(page) {
    return request({
        url   : '/repo/list',
        method: 'post',
        data  : page
    })
}

export function AddRepository(data) {
    return request({
        url   : '/repo',
        method: 'post',
        data
    })
}

export function EditRepository(data) {
    return request({
        url   : '/repo',
        method: 'put',
        data
    })
}

export function FindRepository(repoId) {
    return request({
        url   : `/repo/${repoId}`,
        method: 'get'
    })
}

export function DelRepository(repoId) {
    return request({
        url   : `/repo/${repoId}`,
        method: 'delete'
    })
}

export function ScanRepository(repoId) {
    return request({
        url   : `/repo/scan/${repoId}`,
        method: 'post'
    })
}

export function BuildNow(repoId, branchId) {
    return request({
        url   : `/repo/build/${repoId}/${branchId}`,
        method: 'post'
    })
}
