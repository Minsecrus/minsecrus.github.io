import { ListPage } from '../components/ListPage'
import { data } from '../data/tools'
import { calculateCardSize } from '../utils/cardUtils'

const tools = data.map((tool) => ({
    ...tool,
    size: calculateCardSize(tool)
}))

export function Toolbox() {
    return (
        <ListPage
            title="我的开发工具与实用工具 ~"
            searchLabel="搜索工具"
            items={tools}
        />
    )
}

export default Toolbox
