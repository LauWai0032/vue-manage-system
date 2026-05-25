<template>
    <!-- 主布局容器 -->
    <div class="wrapper">
        <!-- 头部组件 -->
        <v-header />
        <!-- 侧边栏组件 -->
        <v-sidebar />
        <!-- 内容区域容器，根据侧边栏折叠状态动态添加 content-collapse 类 -->
        <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
            <!-- 标签页组件 -->
            <v-tabs></v-tabs>
            <!-- 内容区域 -->
            <div class="content">
                <!-- 路由视图，使用插槽获取组件 -->
                <router-view v-slot="{ Component }">
                    <!-- 过渡动画，先出后进 -->
                    <transition name="move" mode="out-in">
                        <!-- 组件缓存，只缓存标签页名称列表中的组件 -->
                        <keep-alive :include="tabs.nameList">
                            
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// 导入侧边栏状态管理 store
import { useSidebarStore } from '@/store/sidebar';
// 导入标签页状态管理 store
import { useTabsStore } from '@/store/tabs';
// 导入头部组件
import vHeader from '@/components/header.vue';
// 导入侧边栏组件
import vSidebar from '@/components/sidebar.vue';
// 导入标签页组件
import vTabs from '@/components/tabs.vue';

// 创建侧边栏 store 实例
const sidebar = useSidebarStore();
// 创建标签页 store 实例
const tabs = useTabsStore();
</script>

<style>
/* 主布局容器样式 */
.wrapper {
    /* 高度为视口高度 */
    height: 100vh;
    /* 隐藏溢出内容 */
    overflow: hidden;
}
/* 内容区域容器样式 */
.content-box {
    /* 绝对定位 */
    position: absolute;
    /* 左边距 250px，与侧边栏宽度一致 */
    left: 250px;
    /* 右边距 0 */
    right: 0;
    /* 顶部距离 70px，与头部高度一致 */
    top: 70px;
    /* 底部距离 0 */
    bottom: 0;
    /* 底部内边距 30px */
    padding-bottom: 30px;
    /* WebKit 浏览器过渡动画 */
    -webkit-transition: left 0.3s ease-in-out;
    /* 标准过渡动画，左侧边距变化 0.3 秒 */
    transition: left 0.3s ease-in-out;
    /* 背景颜色 */
    background: #eef0fc;
    /* 隐藏溢出内容 */
    overflow: hidden;
}

/* 内容区域样式 */
.content {
    /* 宽度自适应 */
    width: auto;
    /* 高度 100% */
    height: 100%;
    /* 内边距 20px */
    padding: 20px;
    /* 垂直方向可滚动 */
    overflow-y: scroll;
    /* 盒模型为 border-box */
    box-sizing: border-box;
}

/* 内容区域滚动条样式 */
.content::-webkit-scrollbar {
    /* 滚动条宽度为 0，隐藏滚动条 */
    width: 0;
}

/* 侧边栏折叠时的内容区域样式 */
.content-collapse {
    /* 左边距改为 65px */
    left: 65px;
}
</style>