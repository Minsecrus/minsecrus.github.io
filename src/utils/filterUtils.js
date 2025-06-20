export function filterItems(arr, filter) {
    const normalizedFilter = filter.toLowerCase().replace(/\s/g, "");
    if (normalizedFilter.length === 0) {
        return arr
    }
    return arr.filter(item =>
        item.name.toLowerCase().replace(/\s/g, "").includes(normalizedFilter) ||
        item.category.toLowerCase().replace(/\s/g, "").includes(normalizedFilter) ||
        item.description.toLowerCase().replace(/\s/g, "").includes(normalizedFilter)
    )
}