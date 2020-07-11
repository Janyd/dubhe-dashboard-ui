<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button class="btn-right" type="primary" icon="el-icon-plus" size="mini">
                    添加
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    v-loading="loading"
                    element-loading-text="Loading"
                    :data="credentials"
                    size="mini"
                    border
                    fit
                    highlight-current-row
                >
                    <el-table-column align="left" prop="name" label="名称" min-width="150" />
                    <el-table-column align="left" prop="credentialType" label="类型" min-width="150">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.credentialType === 1" size="mini" type="success">账号</el-tag>
                            <el-tag v-if="scope.row.credentialType === 2" size="mini" type="info">RSA</el-tag>
                            <el-tag v-if="scope.row.credentialType === 3" size="mini" type="warning">Docker</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="创建时间" width="200">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template>
                            <el-button type="danger" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { Credential } from "@/api/credential"

    export default {
        name   : "Credential",
        data() {
            return {
                loading    : false,
                credentials: []

            }
        },
        created() {
            this.fetchCredentials()
        },
        methods: {
            fetchCredentials() {
                this.loading = true
                Credential().then(res => {
                    this.loading = false
                    this.credentials = res.data
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
</style>
