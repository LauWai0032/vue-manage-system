// 从 pinia 中导入 defineStore 函数用于创建 store
import { defineStore } from 'pinia';

// 定义对象列表接口，键为字符串，值为字符串数组
interface ObjectList {
    [key: string]: string[];
}

// 导出权限管理 store
export const usePermissStore = defineStore('permiss', {
    // 定义 state 函数，返回响应式状态
    state: () => {
        // 定义默认权限列表对象
        const defaultList: ObjectList = {
            // admin 角色拥有的所有权限码
            admin: [
                '0',
                '1',
                '11',
                '12',
                '13',
                '2',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '291',
                '292',
                '3',
                '31',
                '32',
                '33',
                '34',
                '4',
                '41',
                '42',
                '5',
                '7',
                '6',
                '61',
                '62',
                '63',
                '64',
                '65',
                '66',
            ],
            // user 角色拥有的权限码
            user: ['0', '1', '11', '12', '13'],
        };
        // 从 localStorage 中获取用户名
        const username = localStorage.getItem('vuems_name');
        // 在控制台输出用户名（调试用）
        console.log(username);
        // 返回状态对象
        return {
            // 根据用户名决定当前用户的权限码列表
            key: (username == 'admin' ? defaultList.admin : defaultList.user) as string[],
            // 保存默认权限列表
            defaultList,
        };
    },
    // 定义 actions，用于修改 state
    actions: {
        // 定义设置权限码列表的方法
        handleSet(val: string[]) {
            // 更新当前用户的权限码列表
            this.key = val;
        },
    },
});