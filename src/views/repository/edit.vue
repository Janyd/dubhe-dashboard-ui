<template>
    <div class="app-container">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="24">
                <page-header sub-title="仓储库编辑" @back="back" />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18">
                <form-create
                    v-model="fApi"
                    :rule="rule"
                    :option="option"
                    @on-submit="onSubmit"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { Credential } from '@/api/credential'
    import { AddRepository, EditRepository, FindRepository } from '@/api/repository'

    export default {
        name   : "RepositoryEdit",
        data() {
            return {
                fApi  : {},
                rule  : [
                    {
                        type : "hidden",
                        field: "id"
                    },
                    {
                        type    : 'input',
                        field   : 'name',
                        title   : '名称',
                        validate: [
                            { required: true, message: '请输入名称', trigger: 'blur' }
                        ]
                    }, {
                        type : 'input',
                        field: 'description',
                        props: {
                            "type": "textarea"
                        },
                        title: '描述'
                    }, {
                        type    : 'input',
                        field   : 'url',
                        title   : 'Url',
                        validate: [
                            { required: true, message: '请输入URL', trigger: 'blur' }
                        ]
                    }, {
                        type : "switch",
                        title: "是否启用",
                        field: "active",
                        value: true,
                        props: {
                            activeValue  : true,
                            inactiveValue: false
                        }
                    }, {
                        type   : 'select',
                        field  : 'credentialId',
                        title  : '凭据',
                        options: []
                    }, {
                        type : 'InputNumber',
                        field: 'timeout',
                        title: '超时时间(分钟, 0不限)',
                        props: {
                            controlsPosition: 'right'
                        }
                    }
                ],
                option: {
                    form     : {
                        labelWidth   : '150px',
                        size         : 'small',
                        labelPosition: 'left'
                    },
                    submitBtn: {
                        size: "small",
                        icon: '',
                        col : {
                            span: 3,
                            push: 21
                        }
                    }
                },
                create: false
            }
        },
        created() {
            const self = this
            Credential().then(res => {
                const data = res.data
                for (let i = 0; i < data.length; i++) {
                    self.fApi.getRule('credentialId').options.push({
                        value: data[i].id,
                        label: data[i].name
                    })
                }
            })

            const repoId = this.$route.params.repoId
            if (repoId) {
                FindRepository(repoId).then(res => {
                    self.fApi.setValue(res.data)
                })
            } else {
                this.create = true
            }
        },
        methods: {
            onSubmit(data) {
                if (this.create) {
                    AddRepository(data).then(res => {
                        this.$message({
                            message : '添加成功',
                            type    : 'success',
                            duration: 5 * 1000
                        })
                        this.back()
                    })
                } else {
                    EditRepository(data).then(res => {
                        this.$message({
                            message : '修改成功',
                            type    : 'success',
                            duration: 5 * 1000
                        })
                        this.back()
                    })
                }
            },
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>

</style>
