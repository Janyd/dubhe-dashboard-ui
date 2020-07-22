<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <page-header title="流水线分支" @back="back">
                    <div slot="content">
                        <el-button
                            class="btn-right"
                            type="success"
                            plain
                            icon="el-icon-caret-right"
                            size="small"
                            @click="build"
                        >
                            立即构建
                        </el-button>
                        <el-button class="btn-right" icon="el-icon-refresh" size="small" @click="fetchBuilds">
                            刷新
                        </el-button>
                    </div>
                </page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    ref="buildTable"
                    v-loading="loading"
                    element-loading-text="Loading"
                    :data="builds"
                    size="mini"
                    fit
                    highlight-current-row
                    row-key="id"
                    :expand-row-keys="expands"
                    @expand-change="handleClick"
                >
                    <el-table-column align="left" prop="name" label="构建版本" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="step(scope.row.id)"># {{ scope.row.number }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status === 'success'" size="mini" type="success">成功</el-tag>
                            <el-tag v-if="scope.row.status === 'failure'" size="mini" type="danger">失败</el-tag>
                            <el-tag v-if="scope.row.status === 'killed'" size="mini" type="info">中断</el-tag>
                            <el-tag v-if="scope.row.status === 'pending'" size="mini" effect="plain" type="info">等待
                            </el-tag>
                            <el-tag v-if="scope.row.status === 'blocked'" size="mini" effect="plain" type="warning">阻塞
                            </el-tag>
                            <el-tag v-if="scope.row.status === 'running'" size="mini" effect="plain" type="success">
                                构建中
                            </el-tag>
                            <el-tag v-if="scope.row.status === 'error'" size="mini" effect="dark" type="danger">错误
                            </el-tag>
                            <el-tag v-if="scope.row.status === 'skipped'" size="mini" effect="dark" type="info">跳过
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="trigger" label="触发原因" />
                    <el-table-column align="center" prop="event" label="触发事件" />
                    <el-table-column align="center" prop="createdAt" label="构建时长">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status === 'success'"
                            >
                                {{ scope.row.finishedAt - scope.row.startedAt }}
                            </span>
                            <span v-else>
                                -
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="创建时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
                    :current-page.sync="current"
                    @current-change="fetchBuilds"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import { Builds, DeleteBuild } from "@/api/build"
    import PageHeader from "@/components/PageHeader/index"
    import { BuildNow } from "@/api/repository"

    export default {
        name      : "Build",
        components: { PageHeader },
        data() {
            return {
                repoId  : '',
                branchId: '',
                loading : false,
                builds  : [],
                total   : 0,
                size    : 10,
                current : 1,
                expands : []
            }
        },
        created() {
            const repoId = this.$route.params.repoId
            if (!repoId) {
                this.$router.push({ path: '/404' })
                return
            }
            this.repoId = repoId
            this.branchId = this.$route.params.branchId
            this.fetchBuilds()
        },
        methods   : {
            fetchBuilds() {
                this.loading = true
                const page = {
                    current: this.current,
                    size   : this.size
                }
                Builds(this.repoId, this.branchId, page).then(resp => {
                    this.loading = false
                    this.builds = resp.data.builds
                    this.total = resp.data.page.total
                })
            },
            back() {
                this.$router.push({ name: 'branches', params: { repoId: this.repoId } })
            },
            handleClick(row, expandedRows) {
                this.expands = []
                if (expandedRows.length > 0) {
                    row ? this.expands.push(row.id) : ''
                }
            },
            step(buildId) {
                this.$router.push({
                    name: 'step', params: {
                        repoId  : this.repoId,
                        branchId: this.branchId,
                        buildId : buildId
                    }
                })
            },
            del(buildId) {
                this.$confirm('此操作将永久删除该构建, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText : '取消',
                    type             : 'warning'
                }).then(() => {
                    DeleteBuild(buildId).then(res => {
                        this.$message({
                            message : '删除成功',
                            type    : 'success',
                            duration: 3 * 1000
                        })
                        this.fetchBuilds()
                    })
                })
            },
            build() {
                BuildNow(this.repoId, this.branchId).then(res => {
                    this.$message({
                        message : '触发成功',
                        type    : 'success',
                        duration: 3 * 1000
                    })
                    this.fetchBuilds()
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
