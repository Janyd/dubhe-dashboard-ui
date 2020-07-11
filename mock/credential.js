module.exports = [
    {
        url     : '/cred',
        type    : 'get',
        response: (req, res) => {
            return {
                "code"     : 200000,
                "data"     : [{
                    "id"            : "100000",
                    "name"          : "aliyun code",
                    "credentialType": 1,
                    "url"           : "@url",
                    "username"      : "@word",
                    "password"      : '@word',
                    "publicKey"     : '@word',
                    "privateKey"    : '@word',
                    "createdAt"     : '@integer(946656000, 1594396800)',
                    "updatedAt"     : '@integer(946656000, 1594396800)'
                }, {
                    "id"            : "100001",
                    "name"          : "gitee code",
                    "credentialType": 1,
                    "url"           : "@url",
                    "username"      : "@word",
                    "password"      : '@word',
                    "publicKey"     : '@word',
                    "privateKey"    : '@word',
                    "createdAt"     : '@integer(946656000, 1594396800)',
                    "updatedAt"     : '@integer(946656000, 1594396800)'
                }, {
                    "id"            : "100002",
                    "name"          : "github code",
                    "credentialType": 1,
                    "url"           : "@url",
                    "username"      : "@word",
                    "password"      : '@word',
                    "publicKey"     : '@word',
                    "privateKey"    : '@word',
                    "createdAt"     : '@integer(946656000, 1594396800)',
                    "updatedAt"     : '@integer(946656000, 1594396800)'
                }],
                "msg"      : "操作成功",
                "secondMsg": ""
            }
        }
    }
]
