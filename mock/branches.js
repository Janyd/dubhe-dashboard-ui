module.exports = [
    {
        url     : '/branch/\\d+',
        type    : 'get',
        response: (req, res) => {
            return {
                "code"     : 200000,
                "data"     : [{
                    "id"           : "@id",
                    "name"         : "master",
                    "repoId"       : "@id",
                    "active|1"     : "@boolean",
                    "counter"      : '@integer(1, 10)',
                    "lastSuccessAt": '@integer(946656000, 1594396800)',
                    "lastFailureAt": '@integer(946656000, 1594396800)',
                    "lastDuration" : '@integer(20, 80)',
                    "createdAt"    : '@integer(946656000, 1594396800)',
                    "updatedAt"    : '@integer(946656000, 1594396800)'
                }, {
                    "id"           : "@id",
                    "name"         : "dev",
                    "repoId"       : "@id",
                    "active|1"     : "@boolean",
                    "counter"      : '@integer(1, 10)',
                    "lastSuccessAt": '@integer(946656000, 1594396800)',
                    "lastFailureAt": '@integer(946656000, 1594396800)',
                    "lastDuration" : '@integer(20, 80)',
                    "createdAt"    : '@integer(946656000, 1594396800)',
                    "updatedAt"    : '@integer(946656000, 1594396800)'
                }, {
                    "id"           : "@id",
                    "name"         : "test",
                    "repoId"       : "@id",
                    "active|1"     : "@boolean",
                    "counter"      : '@integer(1, 10)',
                    "lastSuccessAt": '@integer(946656000, 1594396800)',
                    "lastFailureAt": '@integer(946656000, 1594396800)',
                    "lastDuration" : '@integer(20, 80)',
                    "createdAt"    : '@integer(946656000, 1594396800)',
                    "updatedAt"    : '@integer(946656000, 1594396800)'
                }],
                "msg"      : "操作成功",
                "secondMsg": ""
            }
        }
    }
]
