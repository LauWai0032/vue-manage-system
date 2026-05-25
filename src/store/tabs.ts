// 从 pinia 中导入 defineStore 函数用于创建 store
import { defineStore } from 'pinia';

// 定义标签页列表项的接口
interface ListItem {
	// 标签页名称
	name: string;
	// 标签页对应的路由路径
	path: string;
	// 标签页显示的标题
	title: string;
}

// 导出标签页状态管理 store
export const useTabsStore = defineStore('tabs', {
	// 定义 state 函数，返回响应式状态
	state: () => {
		return {
			// 标签页列表，类型为 ListItem 数组，初始为空数组
			list: <ListItem[]>[]
		};
	},
	// 定义 getters，用于计算属性
	getters: {
		// 判断是否显示标签页
		show: state => {
			// 当标签页列表长度大于 0 时返回 true
			return state.list.length > 0;
		},
		// 获取所有标签页的名称列表
		nameList: state => {
			// 映射标签页列表，只返回 name 字段
			return state.list.map(item => item.name);
		}
	},
	// 定义 actions，用于修改 state
	actions: {
		// 删除指定索引的标签页
		delTabsItem(index: number) {
			// 从数组中删除指定索引的元素
			this.list.splice(index, 1);
		},
		// 添加标签页
		setTabsItem(data: ListItem) {
			// 将新标签页添加到列表末尾
			this.list.push(data);
		},
		// 清空所有标签页
		clearTabs() {
			// 将标签页列表重置为空数组
			this.list = [];
		},
		// 关闭其他标签页，只保留传入的标签页
		closeTabsOther(data: ListItem[]) {
			// 将标签页列表替换为传入的数据
			this.list = data;
		},
		// 关闭当前标签页
		closeCurrentTag(data: any) {
			// 遍历标签页列表
			for (let i = 0, len = this.list.length; i < len; i++) {
				// 获取当前遍历的标签页项
				const item = this.list[i];
				// 检查当前标签页路径是否与传入的路由路径匹配
				if (item.path === data.$route.fullPath) {
					// 如果不是最后一个标签页
					if (i < len - 1) {
						// 跳转到下一个标签页
						data.$router.push(this.list[i + 1].path);
					} 
					// 如果不是第一个标签页
					else if (i > 0) {
						// 跳转到上一个标签页
						data.$router.push(this.list[i - 1].path);
					} 
					// 如果是唯一的标签页
					else {
						// 跳转到首页
						data.$router.push('/');
					}
					// 从标签页列表中删除当前标签页
					this.list.splice(i, 1);
					// 跳出循环
					break;
				}
			}
		}
	}
});