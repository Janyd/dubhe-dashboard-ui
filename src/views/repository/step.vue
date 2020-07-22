<template>
    <div class="app-container">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="24">
                <page-header sub-title="构建步骤" @back="back">
                    <div slot="content">
                        <el-button class="btn-right" icon="el-icon-refresh" size="mini" @click="fetchSteps" />
                    </div>
                </page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                v-loading="loading"
                element-loading-text="Loading"
                :data="steps"
                size="mini"
                fit
                highlight-current-row
            >
                <el-table-column align="center" prop="number" label="序号" width="45" />
                <el-table-column align="left" prop="name" label="名称" min-width="150">
                    <template slot-scope="scope">
                        <el-link type="primary">{{ scope.row.name }}</el-link>
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
                <el-table-column align="center" prop="createdAt" label="构建时长">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.status === 'success'"
                        >
                            {{ scope.row.stoppedAt - scope.row.startedAt }}
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
            </el-table>
        </el-row>
    </div>
</template>

<script>

    import { Steps } from "@/api/build"

    export default {
        name   : "Step",
        data() {
            return {
                repoId  : '',
                branchId: '',
                buildId : '',
                steps   : [],
                tabIndex: '0',
                log     : '',
                interval: 0,
                loading : false
            }
        },
        created() {
            const repoId = this.$route.params.repoId
            const branchId = this.$route.params.branchId
            const buildId = this.$route.params.buildId
            if (!repoId) {
                this.$router.push({ path: '/404' })
                return
            }
            this.repoId = repoId
            this.branchId = branchId
            this.buildId = buildId
            this.fetchSteps()
        },
        methods: {
            fetchSteps() {
                Steps(this.buildId).then(res => {
                    this.steps = res.data
                })
            },
            back() {
                this.$router.push({ name: 'build', params: { repoId: this.repoId, branchId: this.branchId } })
            }
        },
        sockets: {
            connect: function() {
                console.log('socket connected')
            }
        }
    }
</script>

<style scoped>

</style>
