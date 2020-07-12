<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button size="small" plain @click="back">返回</el-button>
                <el-button class="btn-right" icon="el-icon-refresh" size="small" @click="fetchBranches">
                    刷新
                </el-button>
                <el-button class="btn-right" plain icon="el-icon-caret-right" size="small" @click="scan">
                    立即扫描
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    v-loading="loading"
                    element-loading-text="Loading"
                    :data="branches"
                    size="mini"
                    fit
                    highlight-current-row
                >
                    <el-table-column align="left" prop="name" label="名称">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="buildDetail(scope.row.id)">{{ scope.row.name }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.active" size="mini" type="success">启用</el-tag>
                            <el-tag v-if="!scope.row.active" size="mini" type="danger">不存在</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="上次成功构建">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.lastSuccessAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="上次失败构建">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.lastFailureAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="上次构建时长">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.lastDuration }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="创建时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="success"
                                icon="el-icon-caret-right"
                                size="mini"
                                @click="build(scope.row.id)"
                            >
                                立即构建
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import { Branches } from "@/api/branches"
    import { BuildNow, ScanRepository } from "@/api/repository"

    export default {
        name   : "Branches",
        data() {
            return {
                repoId  : '',
                branches: []
            }
        },
        created() {
            const repoId = this.$route.params.repoId
            if (repoId) {
                this.repoId = repoId
                this.fetchBranches()
            } else {
                this.$router.push({ path: '/404' })
            }
        },
        methods: {
            fetchBranches() {
                Branches(this.repoId).then(res => {
                    this.branches = res.data
                })
            },
            back() {
                this.$router.push({ name: 'repositories' })
            },
            scan() {
                ScanRepository(this.repoId).then(res => {
                    this.$message({
                        message : '触发成功',
                        type    : 'success',
                        duration: 3 * 1000
                    })
                })
            },
            build(branchId) {
                BuildNow(this.repoId, branchId).then(res => {
                    this.$message({
                        message : '触发成功',
                        type    : 'success',
                        duration: 3 * 1000
                    })
                })
            },
            buildDetail(branchId) {
                this.$router.push({ name: 'build', params: { repoId: this.repoId, branchId: branchId } })
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
