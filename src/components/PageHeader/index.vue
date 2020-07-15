<template>
    <div class="header-back">
        <div class="left" @click="$emit('back')">
            <i class="el-icon-arrow-left" />
            <div class="title">
                <slot name="title">{{ title }}</slot>
            </div>
        </div>
        <div class="sub-title">
            <slot name="sub-title">{{ subTitle }}</slot>
        </div>
        <div class="content">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
    import { t } from 'element-ui/src/locale'

    export default {
        name: "PageHeader",

        props: {
            title   : {
                type: String,
                default() {
                    return t('el.pageHeader.title')
                }
            },
            subTitle: {
                type   : String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-back {
        display: flex;
        width: 100%;
        line-height: 24px;

        .left {
            display: flex;
            cursor: pointer;
            margin-right: 40px;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                width: 1px;
                height: 16px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                background-color: #dcdfe6;
            }

            .el-icon-arrow-left {
                font-size: 18px;
                margin-right: 6px;
                align-self: center;
            }

            .title {
                align-self: center;
                font-size: 18px;
            }
        }

        .sub-title {
            font-size: 18px;
        }

        .content {
            flex: 1;
            text-align: right;
        }
    }
</style>
