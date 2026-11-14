import { ListPage } from '../components/ListPage'
import { libraryBooks } from '../data/library'

export function Library() {
    return (
        <ListPage
            title="我的图书馆和资料库 ~"
            searchLabel="搜索资料"
            items={libraryBooks}
        />
    )
}

export default Library
