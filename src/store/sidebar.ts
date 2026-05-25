// 从 pinia 中导入 defineStore 函数用于创建 store
import { defineStore } from 'pinia';

// 导出侧边栏状态管理 store
export const useSidebarStore = defineStore('sidebar', {
	// 定义 state 函数，返回响应式状态
	state: () => {
		return {
			// 侧边栏是否折叠，默认为 false（不折叠）
			collapse: false,
			// 侧边栏背景颜色，从 localStorage 读取，默认值为 '#324157'
			bgColor: localStorage.getItem('sidebar-bg-color') || '#324157',
			// 侧边栏文字颜色，从 localStorage 读取，默认值为 '#bfcbd9'
			textColor: localStorage.getItem('sidebar-text-color') || '#bfcbd9'
		};
	},
	// 定义 getters，用于计算属性
	getters: {},
	// 定义 actions，用于修改 state
	actions: {
		// 切换侧边栏折叠状态的方法
		handleCollapse() {
			// 切换 collapse 的布尔值
			this.collapse = !this.collapse;
		},
		// 设置侧边栏背景颜色的方法
		setBgColor(color: string) {
			// 更新背景颜色
			this.bgColor = color;
			// 将背景颜色保存到 localStorage
			localStorage.setItem('sidebar-bg-color', color);
		},
		// 设置侧边栏文字颜色的方法
		setTextColor(color: string) {
			// 更新文字颜色
			this.textColor = color;
			// 将文字颜色保存到 localStorage
			localStorage.setItem('sidebar-text-color', color);
		}
	}
});