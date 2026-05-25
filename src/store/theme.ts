// 从 utils 中导入颜色混合和设置 CSS 变量的工具函数
import { mix, setProperty } from '@/utils';
// 从 pinia 中导入 defineStore 函数用于创建 store
import { defineStore } from 'pinia';

// 导出主题状态管理 store
export const useThemeStore = defineStore('theme', {
    // 定义 state 函数，返回响应式状态
    state: () => {
        return {
            // 主题主色调
            primary: '',
            // 成功状态颜色
            success: '',
            // 警告状态颜色
            warning: '',
            // 危险状态颜色
            danger: '',
            // 信息状态颜色
            info: '',
            // 头部背景颜色，默认值为 '#242f42'
            headerBgColor: '#242f42',
            // 头部文字颜色，默认值为 '#fff'
            headerTextColor: '#fff',
        };
    },
    // 定义 getters，用于计算属性
    getters: {},
    // 定义 actions，用于修改 state
    actions: {
        // 初始化主题配置的方法
        initTheme() {
            // 遍历主题颜色类型数组
            ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
                // 从 localStorage 中获取对应的颜色值，默认为空字符串
                const color = localStorage.getItem(`theme-${type}`) || '';
                // 如果颜色值存在
                if (color) {
                    // 设置主题色
                    this.setPropertyColor(color, type);
                }
            });
            // 从 localStorage 中获取头部背景颜色
            const headerBgColor = localStorage.getItem('header-bg-color');
            // 如果头部背景颜色存在，则设置
            headerBgColor && this.setHeaderBgColor(headerBgColor);
            // 从 localStorage 中获取头部文字颜色
            const headerTextColor = localStorage.getItem('header-text-color');
            // 如果头部文字颜色存在，则设置
            headerTextColor && this.setHeaderTextColor(headerTextColor);
        },
        // 重置主题配置的方法
        resetTheme() {
            // 遍历主题颜色类型数组
            ['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
                // 重置主题色为空
                this.setPropertyColor('', type);
            });
        },
        // 设置主题颜色属性的方法
        setPropertyColor(color: string, type: string = 'primary') {
            // 更新 state 中对应的颜色值
            this[type] = color;
            // 设置 CSS 变量
            setProperty(`--el-color-${type}`, color);
            // 将颜色值保存到 localStorage
            localStorage.setItem(`theme-${type}`, color);
            // 设置浅色主题
            this.setThemeLight(type);
        },
        // 设置浅色主题变体的方法
        setThemeLight(type: string = 'primary') {
            // 遍历浅色变体数组 [3, 5, 7, 8, 9]
            [3, 5, 7, 8, 9].forEach((v) => {
                // 设置对应浅色变体的 CSS 变量
                setProperty(`--el-color-${type}-light-${v}`, mix('#ffffff', this[type], v / 10));
            });
            // 设置深色变体的 CSS 变量
            setProperty(`--el-color-${type}-dark-2`, mix('#ffffff', this[type], 0.2));
        },
        // 设置头部背景颜色的方法
        setHeaderBgColor(color: string) {
            // 更新头部背景颜色
            this.headerBgColor = color;
            // 设置头部背景颜色的 CSS 变量
            setProperty('--header-bg-color', color);
            // 将头部背景颜色保存到 localStorage
            localStorage.setItem(`header-bg-color`, color);
        },
        // 设置头部文字颜色的方法
        setHeaderTextColor(color: string) {
            // 更新头部文字颜色
            this.headerTextColor = color;
            // 设置头部文字颜色的 CSS 变量
            setProperty('--header-text-color', color);
            // 将头部文字颜色保存到 localStorage
            localStorage.setItem(`header-text-color`, color);
        }
    }
});