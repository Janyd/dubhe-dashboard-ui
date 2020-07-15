<template>
    <div class="app-container">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="24">
                <page-header sub-title="仓储库编辑" @back="back" />
            </el-col>
        </el-row>
        <el-row>
            <el-steps space="30%" direction="vertical" :active="1">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>
        </el-row>
    </div>
</template>

<script>
    import { Steps } from "@/api/step"

    export default {
        name   : "Step",
        data() {
            return {
                repoId  : '',
                branchId: '',
                buildId : '',
                steps   : []
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
            this.fetchSteps()
            this.repoId = repoId
            this.branchId = branchId
            this.buildId = buildId
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

        }
    }
</script>

<style scoped>

</style>
