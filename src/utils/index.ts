// 导出设置 CSS 变量的函数
export const setProperty = (prop: string, val: any, dom = document.documentElement) => {
    // 在指定 DOM 元素上设置 CSS 变量
    dom.style.setProperty(prop, val);
};

// 导出颜色混合函数
export const mix = (color1: string, color2: string, weight: number = 0.5): string => {
    // 初始化结果颜色字符串，以 # 开头
    let color = '#';
    // 循环处理 R、G、B 三个颜色通道
    for (let i = 0; i <= 2; i++) {
        // 从 color1 中提取对应通道的十六进制值并转换为十进制
        const c1 = parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16);
        // 从 color2 中提取对应通道的十六进制值并转换为十进制
        const c2 = parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16);
        // 根据权重计算混合后的颜色值，四舍五入取整
        const c = Math.round(c1 * weight + c2 * (1 - weight));
        // 将计算结果转换为两位十六进制字符串，不足补 0，并拼接到结果中
        color += c.toString(16).padStart(2, '0');
    }
    // 返回混合后的颜色
    return color;
};