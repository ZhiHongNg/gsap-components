const nameToHexColor = (name) => {
    // 创建一个虚拟元素以获取计算后的颜色
    const span = document.createElement("span");
    span.style.color = name;

    // 获取计算后的颜色值
    const computedColor = window.getComputedStyle(span).color;

    // 将计算后的颜色值转换为RGB数组
    const rgbMatch = computedColor.match(/\d+/g);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[0]);
        const g = parseInt(rgbMatch[1]);
        const b = parseInt(rgbMatch[2]);

        // 将RGB转换为十六进制颜色值
        const hexColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;

        // 返回十六进制颜色值
        return hexColor;
    }

    // 如果无法转换，返回默认颜色（黑色）
    return "#000000";
}
const rgbToHexColor = (rgb) =>{
    // 匹配RGB中的数值
    const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        // 将RGB转换为十六进制颜色值
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    }

    // 如果无法转换，返回默认颜色（黑色）
    return "#000000";
}

const getContrastColor = (color) => {
    const isHexColor = /^#/.test(color);
    const isRGBColor = color.startsWith("rgb");

    if (isHexColor || isRGBColor) {
        const hexColor = isHexColor ? color : (isRGBColor ? rgbToHexColor(color) : null);

        if (hexColor) {
            // 将十六进制颜色值转换为RGB
            let r = parseInt(hexColor.slice(1, 3), 16);
            let g = parseInt(hexColor.slice(3, 5), 16);
            let b = parseInt(hexColor.slice(5, 7), 16);

            // 计算颜色的亮度
            let brightness = (r * 299 + g * 587 + b * 114) / 1000;

            // 根据亮度决定文本颜色是白色还是黑色
            return brightness > 128 ? "#000000" : "#ffffff";
        }
    }

    // 如果无法识别输入的颜色格式，返回默认颜色（黑色）
    return "#000000";
}
export  {getContrastColor,nameToHexColor,rgbToHexColor}