<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button class="btn-right" type="primary" icon="el-icon-plus" size="mini" @click="editVisible = true">
                    添加
                </el-button>
                <el-button class="btn-right" icon="el-icon-refresh" size="mini" @click="fetchRepositories" />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    v-loading="loading"
                    element-loading-text="Loading"
                    :data="repositories"
                    size="mini"
                    border
                    fit
                    highlight-current-row
                >
                    <el-table-column align="left" prop="name" label="名称" min-width="150" />
                    <el-table-column align="left" prop="description" label="描述" min-width="300" />
                    <el-table-column align="center" label="状态" width="80">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.active" size="mini" type="success">启用</el-tag>
                            <el-tag v-if="!scope.row.active" size="mini" type="danger">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="timeout" label="超时(分钟)" width="80" />
                    <el-table-column align="center" prop="createdAt" label="创建时间" width="200">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | toDate }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-pagination
                    style="float: right;"
                    small
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="size"
                    @current-change="fetchRepositories"
                />
            </el-col>
        </el-row>
        <el-dialog
            class="custom-dialog"
            :title="isCreate? '添加项目' : '修改项目'"
            :visible.sync="editVisible"
            width="700px"
        >
            <form-create v-model="form" :rule="rule" :option="option"></form-create>
        </el-dialog>
    </div>
</template>

<script>

    import { Repositories } from "@/api/repository"
    import { formatDate } from "@/utils/date"

    export default {
        name   : "Repository",
        filters: {
            toDate(time) {
                time = time * 1000
                return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss')
            }
        },
        data() {
            return {
                loading     : false,
                current     : 1,
                size        : 10,
                total       : 0,
                repositories: [],
                isCreate    : true,
                editVisible : false,
                form        : {},
                rule        : [
                    {
                        type : 'input',
                        field: 'name',
                        title: '名称'
                    }, {
                        type : 'input',
                        field: 'description',
                        props: {
                            "type": "textarea"
                        },
                        title: '描述'
                    }
                ],
                option      : {
                    onSubmit : function(formData) {
                        console.log(formData)
                    },
                    form     : {
                        labelWidth: '50px',
                        size      : 'mini'
                    },
                    submitBtn: {
                        size: "small",
                        icon: '',
                        col : {
                            span: 3,
                            push: 21
                        }
                    }
                }
            }
        },
        created() {
            this.fetchRepositories()
        },
        methods: {
            fetchRepositories() {
                this.loading = true
                const page = {
                    current: this.current,
                    size   : this.size
                }
                Repositories(page).then(resp => {
                    this.loading = false
                    this.repositories = resp.data.repos
                    this.total = resp.data.page.total
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
