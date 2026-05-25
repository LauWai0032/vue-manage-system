<template>
  <!-- 渲染一个 span 标签，用来显示滚动数字 -->
  <!-- ref="countRef"：把这个 DOM 节点绑定给 JS 中的 countRef 变量，方便获取元素 -->
  <span ref="countRef"></span>
</template>

<script setup lang="ts">
// 导入 Vue 组合式API
import { onMounted, ref, watch } from 'vue';
// 导入数字滚动库 countup.js
import { CountUp } from 'countup.js';

// 1. 定义组件接收的参数（props）
const props = defineProps({
  // 要滚动到的【目标数字】
  end: {
    type: Number,      // 类型：数字
    required: true,    // 必填项，必须传
  },
  // 滚动配置选项（非必填，有默认空对象）
  options: {
    type: Object,
    default: () => ({}),
    required: false,
  },
});

// 2. 获取 DOM 元素
// countRef 绑定 <span> 标签，any 是临时类型，不报错
const countRef = ref<any>(null);

// 3. 存储 countUp 实例（全局可用，方便后续更新）
let countUp: any;

// 4. 组件挂载完成后执行（DOM 已渲染）
onMounted(() => {
  // 创建 CountUp 实例：传入DOM节点、目标值、配置项
  countUp = new CountUp(countRef.value, props.end, props.options);

  // 如果创建失败，打印错误
  if (countUp.error) {
    console.error(countUp.error);
    return;
  }

  // 启动数字滚动动画
  countUp.start();
});

// 5. 监听 end 值变化，自动更新数字
// 当父组件传入的 end 改变时，这里会自动触发
watch(() => props.end, (newVal) => {
  // 如果实例存在
  if (countUp) {
    // 调用 countUp 自带的 update 方法，更新到新数字
    countUp.update(newVal);
  }
});
</script>