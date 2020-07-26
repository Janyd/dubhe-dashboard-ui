<template>
    <div class="app-container">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="24">
                <page-header sub-title="日志" @back="back">
                    <div slot="content">
                        <el-button class="btn-right" icon="el-icon-refresh" size="mini" @click="handle" />
                    </div>
                </page-header>
            </el-col>
        </el-row>
        <div class="log-content">
            <p v-for="(l, index) in lines" :key="index">{{ l }}</p>
        </div>
    </div>
</template>

<script>
    import { FindLog } from "@/api/log"

    export default {
        name   : "Log",
        data() {
            return {
                repoId  : '',
                branchId: '',
                buildId : '',
                stepId  : '',
                lines   : []
            }
        },
        created() {
            const repoId = this.$route.params.repoId
            const branchId = this.$route.params.branchId
            const buildId = this.$route.params.buildId
            const stepId = this.$route.params.stepId
            if (!repoId) {
                this.$router.push({ name: 'repositories' })
                return
            }
            this.repoId = repoId
            this.branchId = branchId
            this.buildId = buildId
            this.stepId = stepId
            this.join()
        },
        methods: {
            back() {
                this.$router.push({
                    name: 'step', params: {
                        repoId  : this.repoId,
                        branchId: this.branchId,
                        buildId : this.buildId
                    }
                })
            },
            join() {
                const that = this
                this.$socket.emit('step:join', JSON.stringify({ stepId: this.stepId }), function(res) {
                    const data = JSON.parse(res)
                    if (data.code === 200000) {
                        that.sockets.subscribe('step:' + that.stepId, (d) => {
                            const r = JSON.parse(d)
                            if (r.code !== 200000) {
                                return
                            }
                            const line = r.data
                            that.lines.push(line.out)
                        })
                    } else if (data.code === 300000) {
                        FindLog(that.stepId).then(resp => {
                            const lines = JSON.parse(resp.data)
                            for (let i = 0; i < lines.length; i++) {
                                that.lines.push(lines[i].out)
                            }
                        })
                    }
                })
            },
            handle() {
                this.$socket.emit('step', JSON.stringify({ stepId: this.stepId }), function(res) {
                    const data = JSON.parse(res)
                    console.log(data)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .log {
        line-height: 10px;
    }
</style>
