// 从 vue-router 中导入路由创建函数、哈希历史模式和路由记录类型
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// 导入权限管理的 store
import { usePermissStore } from '../store/permiss';
// 导入首页布局组件
import Home from '../views/home.vue';
// 导入 NProgress 进度条库
import NProgress from 'nprogress';
// 导入 NProgress 的样式文件
import 'nprogress/nprogress.css';

// 定义路由配置数组，类型为 RouteRecordRaw
const routes: RouteRecordRaw[] = [
    {
        // 根路径配置
        path: '/',
        // 重定向到仪表板页面
        redirect: '/dashboard',
    },
    {
        // 根路径，与 Home 布局组件关联
        path: '/',
        // 路由名称
        name: 'Home',
        // 路由对应的组件
        component: Home,
        // 子路由数组
        children: [
            {
                // 仪表板页面路径
                path: '/dashboard',
                // 路由名称
                name: 'dashboard',
                // 路由元信息
                meta: {
                    // 页面标题
                    title: '系统首页',
                    // 不需要登录认证
                    noAuth: true,
                },
                // 路由懒加载，指定 webpack chunk 名称
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                // 用户管理页面路径
                path: '/system-user',
                name: 'system-user',
                meta: {
                    title: '用户管理',
                    // 需要权限码 '11'
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "system-user" */ '../views/system/user.vue'),
            },
            {
                // 角色管理页面路径
                path: '/system-role',
                name: 'system-role',
                meta: {
                    title: '角色管理',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "system-role" */ '../views/system/role.vue'),
            },
            {
                // 菜单管理页面路径
                path: '/system-menu',
                name: 'system-menu',
                meta: {
                    title: '菜单管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "system-menu" */ '../views/system/menu.vue'),
            },
            {
                // 基础表格页面路径
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '基础表格',
                    permiss: '31',
                },
                component: () => import(/* webpackChunkName: "table" */ '../views/table/basetable.vue'),
            },
            {
                // 可编辑表格页面路径
                path: '/table-editor',
                name: 'table-editor',
                meta: {
                    title: '可编辑表格',
                    permiss: '32',
                },
                component: () => import(/* webpackChunkName: "table-editor" */ '../views/table/table-editor.vue'),
            },
            {
                // schart 图表页面路径
                path: '/schart',
                name: 'schart',
                meta: {
                    title: 'schart图表',
                    permiss: '41',
                },
                component: () => import(/* webpackChunkName: "schart" */ '../views/chart/schart.vue'),
            },
            {
                // echarts 图表页面路径
                path: '/echarts',
                name: 'echarts',
                meta: {
                    title: 'echarts图表',
                    permiss: '42',
                },
                component: () => import(/* webpackChunkName: "echarts" */ '../views/chart/echarts.vue'),
            },

            {
                // 图标展示页面路径
                path: '/icon',
                name: 'icon',
                meta: {
                    title: '图标',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "icon" */ '../views/pages/icon.vue'),
            },
            {
                // 个人中心页面路径
                path: '/ucenter',
                name: 'ucenter',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "ucenter" */ '../views/pages/ucenter.vue'),
            },
            {
                // 富文本编辑器页面路径
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '291',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/pages/editor.vue'),
            },
            {
                // markdown 编辑器页面路径
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '292',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/pages/markdown.vue'),
            },
            {
                // 导出 Excel 页面路径
                path: '/export',
                name: 'export',
                meta: {
                    title: '导出Excel',
                    permiss: '34',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/table/export.vue'),
            },
            {
                // 导入 Excel 页面路径
                path: '/import',
                name: 'import',
                meta: {
                    title: '导入Excel',
                    permiss: '33',
                },
                component: () => import(/* webpackChunkName: "import" */ '../views/table/import.vue'),
            },
            {
                // 主题设置页面路径
                path: '/theme',
                name: 'theme',
                meta: {
                    title: '主题设置',
                    permiss: '7',
                },
                component: () => import(/* webpackChunkName: "theme" */ '../views/pages/theme.vue'),
            },
            {
                // 日历组件页面路径
                path: '/calendar',
                name: 'calendar',
                meta: {
                    title: '日历',
                    permiss: '24',
                },
                component: () => import(/* webpackChunkName: "calendar" */ '../views/element/calendar.vue'),
            },
            {
                // 水印组件页面路径
                path: '/watermark',
                name: 'watermark',
                meta: {
                    title: '水印',
                    permiss: '25',
                },
                component: () => import(/* webpackChunkName: "watermark" */ '../views/element/watermark.vue'),
            },
            {
                // 走马灯组件页面路径
                path: '/carousel',
                name: 'carousel',
                meta: {
                    title: '走马灯',
                    permiss: '23',
                },
                component: () => import(/* webpackChunkName: "carousel" */ '../views/element/carousel.vue'),
            },
            {
                // 分步引导组件页面路径
                path: '/tour',
                name: 'tour',
                meta: {
                    title: '分步引导',
                    permiss: '26',
                },
                component: () => import(/* webpackChunkName: "tour" */ '../views/element/tour.vue'),
            },
            {
                // 步骤条组件页面路径
                path: '/steps',
                name: 'steps',
                meta: {
                    title: '步骤条',
                    permiss: '27',
                },
                component: () => import(/* webpackChunkName: "steps" */ '../views/element/steps.vue'),
            },
            {
                // 表单组件页面路径
                path: '/form',
                name: 'forms',
                meta: {
                    title: '表单',
                    permiss: '21',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/element/form.vue'),
            },
            {
                // 上传组件页面路径
                path: '/upload',
                name: 'upload',
                meta: {
                    title: '上传',
                    permiss: '22',
                },
                component: () => import(/* webpackChunkName: "upload" */ '../views/element/upload.vue'),
            },
            {
                // 统计组件页面路径
                path: '/statistic',
                name: 'statistic',
                meta: {
                    title: '统计',
                    permiss: '28',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/element/statistic.vue'),
            },
        ],
    },
    {
        // 登录页面路径
        path: '/login',
        meta: {
            title: '登录',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/pages/login.vue'),
    },
    {
        // 注册页面路径
        path: '/register',
        meta: {
            title: '注册',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "register" */ '../views/pages/register.vue'),
    },
    {
        // 重置密码页面路径
        path: '/reset-pwd',
        meta: {
            title: '重置密码',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/pages/reset-pwd.vue'),
    },
    {
        // 403 无权限页面路径
        path: '/403',
        meta: {
            title: '没有权限',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/pages/403.vue'),
    },
    {
        // 404 页面未找到路径
        path: '/404',
        meta: {
            title: '找不到页面',
            noAuth: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue'),
    },
    // 通配符路由，匹配所有未定义的路径，重定向到 404
    { path: '/:path(.*)', redirect: '/404' },
];

// 创建路由实例
const router = createRouter({
    // 使用哈希历史模式
    history: createWebHashHistory(),
    // 传入路由配置
    routes,
});

// 全局前置路由守卫，在路由跳转前执行
router.beforeEach((to, from, next) => {
    // 启动 NProgress 进度条
    NProgress.start();
    // 从 localStorage 中获取用户角色信息
    const role = localStorage.getItem('vuems_name');
    // 获取权限 store 实例
    const permiss = usePermissStore();

    // 如果用户未登录且当前路由需要认证
    if (!role && to.meta.noAuth !== true) {
        // 跳转到登录页
        next('/login');
    } 
    // 如果当前路由有权限码且用户没有该权限
    else if (typeof to.meta.permiss == 'string' && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } 
    // 其他情况，正常跳转
    else {
        next();
    }
});

// 全局后置路由守卫，在路由跳转完成后执行
router.afterEach(() => {
    // 结束 NProgress 进度条
    NProgress.done();
});

// 导出路由实例作为默认导出
export default router;