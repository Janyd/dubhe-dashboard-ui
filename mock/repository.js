const Mock = require('mockjs')

module.exports = [
    {
        url     : '/repo/list',
        type    : 'post',
        response: (req, res) => {
            const respBody = {
                'page' : {
                    "current": req.body.current,
                    "size"   : 10,
                    "total"  : 30
                },
                'repos': Mock.mock({
                    'repos|10': [{
                        "id"          : "@id",
                        "name"        : "@word(10, 20)",
                        "description" : "@sentence(1, 10)",
                        "url"         : "@url",
                        "credentialId": "@id",
                        "active|1"    : '@boolean',
                        "timeout"     : '@integer(1, 10)',
                        "createdAt"   : '@integer(946656000, 1594396800)',
                        "updatedAt"   : '@integer(946656000, 1594396800)'
                    }]
                }).repos
            }

            return {
                "code"     : 200000,
                "data"     : respBody,
                "msg"      : "操作成功",
                "secondMsg": ""
            }
        }
    }
]
