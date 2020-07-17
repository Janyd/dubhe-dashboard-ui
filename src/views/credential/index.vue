<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button class="btn-right" type="primary" icon="el-icon-plus" size="mini" @click="openCreateCred">
                    添加
                </el-button>
                <el-button class="btn-right" icon="el-icon-refresh" size="mini" @click="fetchCredentials" />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    v-loading="loading"
                    element-loading-text="Loading"
                    :data="credentials"
                    size="mini"
                    fit
                    highlight-current-row
                >
                    <el-table-column align="left" prop="name" label="名称" min-width="150" />
                    <el-table-column align="center" prop="credentialType" label="类型" min-width="150">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.credentialType === 1" size="mini" type="success">账号</el-tag>
                            <el-tag v-if="scope.row.credentialType === 2" size="mini" type="info">RSA</el-tag>
                            <el-tag v-if="scope.row.credentialType === 3" size="mini" type="warning">Docker</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="账号" min-width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.credentialType === 1">{{ scope.row.username }}</span>
                            <span v-if="scope.row.credentialType === 3">{{ scope.row.username }}</span>
                            <el-button v-if="scope.row.credentialType === 2" size="mini">一键复制公钥</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="创建时间" width="200">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="添加凭据" width="35%" :visible.sync="visible">
            <form-create
                v-model="fApi"
                :rule="rule"
                :option="option"
            />
            <div slot="footer" class="dialog-footer">
                <el-button v-if="randVisible" size="small" @click="randRsa">随机生成</el-button>
                <el-button size="small" @click="visible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { AddCredential, Credential, DelCredential, RandRsa } from "@/api/credential"

    export default {
        name   : "Credential",
        data() {
            return {
                loading    : false,
                credentials: [],
                visible    : false,
                randVisible: false,
                fApi       : {},
                rule       : [
                    {
                        type    : 'input',
                        field   : 'name',
                        title   : '名称',
                        validate: [
                            { required: true, message: '请输入名称', trigger: 'blur' }
                        ]
                    }, {
                        type   : 'select',
                        field  : 'credentialType',
                        title  : '类型',
                        value  : 1,
                        options: [{
                            value: 1,
                            label: '账号'
                        }, {
                            value: 2,
                            label: '秘钥'
                        }, {
                            value: 3,
                            label: 'Docker'
                        }],
                        on     : {
                            change: () => {
                                this.randVisible = this.fApi.getValue('credentialType') === 2
                            }
                        },
                        control: [
                            {
                                value: 1,
                                rule : [
                                    {
                                        type    : 'input',
                                        field   : 'username',
                                        title   : '用户名',
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }, {
                                        type    : 'input',
                                        field   : 'password',
                                        title   : '密码',
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }
                                ]
                            }, {
                                value: 2,
                                rule : [
                                    {
                                        type    : 'input',
                                        field   : 'publicKey',
                                        title   : 'publicKey',
                                        props   : {
                                            "type": "textarea"
                                        },
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }, {
                                        type    : 'input',
                                        field   : 'privateKey',
                                        title   : 'privateKey',
                                        props   : {
                                            "type": "textarea"
                                        },
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }
                                ]
                            }, {
                                value: 3,
                                rule : [
                                    {
                                        type    : 'input',
                                        field   : 'address',
                                        title   : 'url',
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }, {
                                        type    : 'input',
                                        field   : 'username',
                                        title   : '用户名',
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }, {
                                        type    : 'input',
                                        field   : 'password',
                                        title   : '密码',
                                        validate: [
                                            { required: true, message: '请输入名称', trigger: 'blur' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                option     : {
                    form     : {
                        labelWidth   : '100px',
                        size         : 'small',
                        labelPosition: 'left'
                    },
                    submitBtn: false
                }
            }
        },
        created() {
            this.fetchCredentials()
        },
        methods: {
            fetchCredentials() {
                this.loading = true
                Credential().then(res => {
                    this.credentials = res.data
                }).finally(() => {
                    this.loading = false
                })
            },
            onSubmit() {
                this.fApi.submit((formData, $f) => {
                    AddCredential(formData).then(res => {
                        this.$message({
                            message : '添加成功',
                            type    : 'success',
                            duration: 5 * 1000
                        })
                        this.fetchCredentials()
                    }).finally(() => {
                        this.visible = false
                    })
                })
            },
            openCreateCred() {
                this.visible = true
                this.$nextTick(() => {
                    this.fApi.resetFields()
                })
            },
            del(credId) {
                DelCredential(credId).then(res => {
                    this.$message({
                        message : '删除成功',
                        type    : 'success',
                        duration: 3 * 1000
                    })
                    this.fetchCredentials()
                })
            },
            randRsa() {
                RandRsa().then(res => {
                    this.fApi.setValue({
                        publicKey : res.data.publicKey,
                        privateKey: res.data.privateKey
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .btn-right {
        margin-left: 10px;
        float: right;
    }
</style>
