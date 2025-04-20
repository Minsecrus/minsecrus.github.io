/**
 * 计算字符串长度，考虑中英文字符宽度差异
 * @param {string} str 要计算长度的字符串
 * @returns {number} 字符串的视觉长度
 */
export function getStringLength(str) {
    return Array.from(str).reduce((len, char) => {
        // 获取字符的 Unicode 编码
        const charCode = char.charCodeAt(0);
        // 判断是否为 ASCII 字符 (0-127)
        return len + (charCode >= 0 && charCode <= 127 ? 1 : 1.6);
    }, 0);
}

/**
 * 计算卡片的大小类别
 * @param {Object} item 包含name和description的对象
 * @returns {string} 卡片大小类别：'normal', 'wide', 或 'wider'
 */
export function calculateCardSize(item, linked = true) {
    let nameLength = getStringLength(item.name);
    if (!linked) nameLength += 3;
    const descLength = getStringLength(item.description);

    if (nameLength > 16) return 'wider';
    if (descLength > 40) return 'wider';
    if (nameLength > 8.5) return 'wide';
    if (descLength > 22) return 'wide';
    return 'normal';
}