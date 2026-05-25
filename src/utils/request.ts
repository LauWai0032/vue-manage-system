// 从 axios 中导入需要的类型和实例
import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    // 设置请求超时时间为 5000 毫秒
    timeout: 5000
});

// 添加请求拦截器
service.interceptors.request.use(
    // 请求发送前的处理
    (config: InternalAxiosRequestConfig) => {
        // 直接返回配置，不做任何处理
        return config;
    },
    // 请求错误的处理
    (error: AxiosError) => {
        // 在控制台输出错误信息
        console.log(error);
        // 返回一个拒绝的 Promise
        return Promise.reject();
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    // 响应成功的处理
    (response: AxiosResponse) => {
        // 如果响应状态码为 200
        if (response.status === 200) {
            // 直接返回响应对象
            return response;
        } else {
            // 否则返回一个拒绝的 Promise
            Promise.reject();
        }
    },
    // 响应错误的处理
    (error: AxiosError) => {
        // 在控制台输出错误信息
        console.log(error);
        // 返回一个拒绝的 Promise
        return Promise.reject();
    }
);

// 导出 axios 实例作为默认导出
export default service;