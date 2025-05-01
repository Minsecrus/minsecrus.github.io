export function filterItems(arr,filter){
    return arr.filter(item =>
        item.name.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, "")) ||
        item.category.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, "")) ||
        item.description.toLowerCase().replace(/\s/g, "").includes(filter.toLowerCase().replace(/\s/g, ""))
    )
}