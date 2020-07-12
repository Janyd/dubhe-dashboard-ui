<template>
    <div class="app-container">
        <el-row>
            <el-col :span="24">
                <el-button size="small" plain @click="back">返回</el-button>
                <el-button class="btn-right" type="success" plain icon="el-icon-caret-right" size="small">
                    立即构建
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
                    <el-table-column align="left" prop="name" label="构建版本">
                        <template slot-scope="scope">
                            <el-link type="primary">{{ scope.row.Number }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" />
                    <el-table-column align="center" prop="trigger" label="触发原因" />
                    <el-table-column align="center" prop="trigger" label="触发事件" />
                    <el-table-column align="center" prop="createdAt" label="构建时长">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.started }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createdAt" label="创建时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{ scope.row.createdAt | convertTime }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name   : "Build",
        data() {
            return {
                repoId  : '',
                branchId: ''
            }
        },
        created() {
            const repoId = this.$route.params.repoId
            if (repoId) {
                this.repoId = repoId
            } else {
                this.$router.push({ path: '/404' })
            }
        },
        methods: {
            back() {
                this.$router.push({ name: 'branches', params: { repoId: this.repoId } })
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
