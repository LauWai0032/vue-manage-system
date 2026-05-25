<template>
    <!-- 数字递增动画显示的容器元素 -->
    <span ref="countRef"></span>
</template>

<script setup lang="ts">
// 导入 Vue 组合式 API 的生命周期钩子和响应式工具
import { onMounted, ref, watch } from 'vue';
// 导入 countup.js 库用于实现数字递增动画
import { CountUp } from 'countup.js';

// 定义组件接收的 props 属性
const props = defineProps({
    // 数字递增的目标结束值，必填
    end: {
        type: Number,
        required: true,
    },
    // countup.js 的配置选项对象，可选，默认为空对象
    options: {
        type: Object,
        default: () => ({}),
        required: false,
    },
});

// 创建一个 ref 引用，用于绑定模板中的 span 元素
const countRef = ref<any>(null);
// 声明 countUp 实例变量
let countUp: any;
// 组件挂载完成后执行的生命周期钩子
onMounted(() => {
    // 创建 CountUp 实例，传入 DOM 引用、结束值和配置选项
    countUp = new CountUp(countRef.value, props.end, props.options);
    // 检查是否有错误发生
    if (countUp.error) {
        // 如果有错误，在控制台输出错误信息
        console.error(countUp.error);
        // 提前返回，不执行后续代码
        return;
    }
    // 启动数字递增动画
    countUp.start();
});

// 监听 props.end 的变化，当结束值改变时执行回调
watch(() => props.end, (newVal) => {
    // 检查 countUp 实例是否存在
    if (countUp) {
        // 更新数字递增的目标值
        countUp.update(newVal);
    }
});


</script>