const Mock = require('mockjs')

module.exports = [
    {
        url     : '/build/list/\\d+/\\d+',
        type    : 'post',
        response: (req, res) => {
            const respBody = {
                'page'  : {
                    "current": req.body.current,
                    "size"   : 10,
                    "total"  : 30
                },
                'builds': Mock.mock({
                    'builds|10': [{
                        "id"        : "@id",
                        "name"      : "@word(10, 20)",
                        "trigger|1" : ["@hook", "@manual", "@cron"],
                        "number"    : "@integer(1, 100)",
                        "status|1"  : ["skipped", "blocked", "pending", "running", "success", "failure", "killed", "error"],
                        "event|1"   : ["cron", "push", "pull_request", "tag", "promote", "rollback"],
                        "startedAt" : '@integer(946656000, 1594396800)',
                        "finishedAt": '@integer(946656000, 1594396800)',
                        "createdAt" : '@integer(946656000, 1594396800)',
                        "updatedAt" : '@integer(946656000, 1594396800)',
                        "steps|3-5"   : [{
                            "id"        : "@id",
                            "number"    : "@integer(1, 10)",
                            "name"      : "@title",
                            "status|1"  : ["skipped", "blocked", "pending", "running", "success", "failure", "killed", "error"],
                            "startedAt" : '@integer(946656000, 1594396800)',
                            "finishedAt": '@integer(946656000, 1594396800)',
                            "createdAt" : '@integer(946656000, 1594396800)',
                            "updatedAt" : '@integer(946656000, 1594396800)'
                        }]
                    }]
                }).builds
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
