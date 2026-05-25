// 从 vue 中导入 createApp 函数用于创建 Vue 应用实例
import { createApp } from 'vue';
// 从 pinia 中导入 createPinia 函数用于创建 Pinia 实例
import { createPinia } from 'pinia';
// 导入 Element Plus 所有图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 导入根组件
import App from './App.vue';
// 导入路由配置
import router from './router';
// 导入权限管理 store
import { usePermissStore } from './store/permiss';
// 导入 Element Plus 样式
import 'element-plus/dist/index.css';
// 导入自定义图标样式
import './assets/css/icon.css';

// 创建 Vue 应用实例
const app = createApp(App);
// 安装 Pinia 状态管理
app.use(createPinia());
// 安装 Vue Router 路由
app.use(router);

// 注册 Element Plus 所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 将图标组件注册为全局组件
    app.component(key, component);
}
// 创建权限 store 实例
const permiss = usePermissStore();
// 自定义权限指令 v-permiss
app.directive('permiss', {
    // 指令挂载到元素时执行
    mounted(el, binding) {
        // 如果绑定值存在且当前用户没有该权限
        if (binding.value && !permiss.key.includes(String(binding.value))) {
            // 隐藏该元素
            el['hidden'] = true;
        }
    },
});

// 将应用挂载到 id 为 app 的 DOM 元素上
app.mount('#app');