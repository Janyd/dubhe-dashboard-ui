<template>
    <div class="app-container">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="24">
                <page-header sub-title="仓储库编辑" @back="back">
                    <div slot="content">
                        <el-button
                            v-if="interval > 0"
                            class="btn-right"
                            size="small"
                            plain
                            type="danger"
                            @click="stopGetLog"
                        >停止
                        </el-button>
                        <el-button
                            v-if="!(interval > 0)"
                            class="btn-right"
                            size="small"
                            plain
                            type="success"
                            @click="startGetLog"
                        >开始
                        </el-button>
                    </div>
                </page-header>
            </el-col>
        </el-row>
        <el-row>
            <el-tabs v-model="tabIndex" tab-position="left" @tab-click="handleTabSwitch">
                <el-tab-pane v-for="(step, index) in steps" :key="step.id" :name="String(index)">
                    <el-tag v-if="step.status === 'success'" slot="label" size="mini" type="success">
                        步骤{{ step.number }}
                    </el-tag>
                    <el-tag v-if="step.status === 'failure'" slot="label" size="mini" type="danger">步骤{{
                        step.number }}
                    </el-tag>
                    <el-tag v-if="step.status === 'killed'" slot="label" size="mini" type="info">步骤{{
                        step.number }}
                    </el-tag>
                    <el-tag
                        v-if="step.status === 'pending'"
                        slot="label"
                        size="mini"
                        effect="plain"
                        type="info"
                    >步骤{{ step.number }}
                    </el-tag>
                    <el-tag
                        v-if="step.status === 'blocked'"
                        slot="label"
                        size="mini"
                        effect="plain"
                        type="warning"
                    >步骤{{ step.number }}
                    </el-tag>
                    <el-tag
                        v-if="step.status === 'running'"
                        slot="label"
                        size="mini"
                        effect="plain"
                        type="success"
                    >
                        步骤{{ step.number }}
                    </el-tag>
                    <el-tag
                        v-if="step.status === 'error'"
                        slot="label"
                        size="mini"
                        effect="dark"
                        type="danger"
                    >步骤{{ step.number }}
                    </el-tag>
                    <el-tag
                        v-if="step.status === 'skipped'"
                        slot="label"
                        size="mini"
                        effect="dark"
                        type="info"
                    >步骤{{ step.number }}
                    </el-tag>
                    <pre v-highlightjs="log"><code class="SQL" /></pre>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
    import { GetLog, Steps } from "@/api/step"

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
                interval: 0
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
            this.startGetLog()
        },
        methods: {
            fetchSteps() {
                Steps(this.buildId).then(res => {
                    this.steps = res.data
                })
            },
            back() {
                this.$router.push({ name: 'build', params: { repoId: this.repoId, branchId: this.branchId } })
            },
            getLog() {
                const stepId = this.steps[Number(this.tabIndex)].id
                GetLog(this.buildId, stepId, {
                    time: Date.parse(new Date())
                }).then(res => {
                    const logs = res.data
                    if (logs.length > 0) {
                        for (let i = 0; i < logs.length; i++) {
                            this.log = this.log + logs[i].log + '\n'
                        }
                    }
                })
            },
            handleTabSwitch() {
                this.log = ''
            },
            stopGetLog() {
                clearInterval(this.interval)
                this.interval = 0
            },
            startGetLog() {
                this.interval = setInterval(this.getLog, 1000)
            }

        }
    }
</script>

<style scoped>

</style>
