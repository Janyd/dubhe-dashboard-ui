module.exports = [
    {
        url     : '/step/\\d+',
        type    : 'get',
        response: (req, res) => {
            return {
                "code"     : 200000,
                "data|3-5" : [{
                    "id"        : "@id",
                    "number"    : "@integer(1, 10)",
                    "name"      : "@title",
                    "status|1"  : ["skipped", "blocked", "pending", "running", "success", "failure", "killed", "error"],
                    "startedAt" : '@integer(946656000, 1594396800)',
                    "finishedAt": '@integer(946656000, 1594396800)',
                    "createdAt" : '@integer(946656000, 1594396800)',
                    "updatedAt" : '@integer(946656000, 1594396800)'
                }],
                "msg"      : "操作成功",
                "secondMsg": ""
            }
        }
    },
    {
        url     : '/step/log/\\d+/\\d+',
        type    : 'post',
        response: (req, res) => {
            return {
                "code"     : 200000,
                "data|1-3": [{
                    "time": "@now()",
                    "log" : "@paragraph"
                }],
                "msg"      : "操作成功",
                "secondMsg": ""
            }
        }
    }
]
