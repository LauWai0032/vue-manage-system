<template>
	<!-- Element Plus 配置提供者，设置中文语言 -->
	<el-config-provider :locale="zhCn">
		<!-- 路由视图，用于渲染匹配的路由组件 -->
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
// 导入 Element Plus 配置提供者组件
import { ElConfigProvider } from 'element-plus';
// 导入 Element Plus 中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// 导入主题状态管理 store
import { useThemeStore } from './store/theme';

// 创建主题 store 实例
const theme = useThemeStore();
// 初始化主题配置
theme.initTheme();
</script>
<style>
/* 导入主样式文件 */
@import './assets/css/main.css';
</style>