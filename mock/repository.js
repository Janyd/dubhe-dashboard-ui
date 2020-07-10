const data = {
    "code"     : 200000,
    "data"     : {
        "page" : {
            "current": 1,
            "size"   : 10,
            "total"  : 2
        },
        "repos": [
            {
                "id"          : "1275732011163586560",
                "name"        : "sdf34",
                "description" : "sgsfgd",
                "url"         : "sdgdsfhad",
                "credentialId": "1",
                "active"      : true,
                "timeout"     : 1,
                "createdAt"   : 1592993188,
                "updatedAt"   : 1592993188
            },
            {
                "id"          : "1280859292043317248",
                "name"        : "zefunnew",
                "description" : "智放",
                "url"         : "git@codeup.aliyun.com:maywant/maywant6.0/zefun.git",
                "credentialId": "1280857622894874624",
                "active"      : true,
                "counter"     : 9,
                "timeout"     : 10,
                "createdAt"   : 1594215627,
                "updatedAt"   : 1594292113
            }
        ]
    },
    "msg"      : "操作成功",
    "secondMsg": ""
}

module.exports = [
    {
        url     : '/repo/list',
        type    : 'post',
        response: config => {
            return data
        }
    }
]
