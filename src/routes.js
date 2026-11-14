export const ROUTES = {
    home: { path: '/', title: 'Minsecrus - 遇见更好的自己' },
    toolbox: { path: '/toolbox', title: 'Minsecrus - 工具箱' },
    library: { path: '/library', title: 'Minsecrus - 资料库' },
    abbr: { path: '/abbr', title: 'Minsecrus - 缩略词列表' },
    about: { path: '/about', title: 'Minsecrus - 关于本网站' },
}

export function getPageFromPath(pathname = '/') {
    const cleanPath = pathname.replace(/\/+$/, '') || '/'
    for (const [page, route] of Object.entries(ROUTES)) {
        if (route.path === cleanPath) return page
    }
    return 'home'
}

export function getPathForPage(page) {
    return ROUTES[page]?.path ?? '/'
}

export function getTitleForPage(page) {
    return ROUTES[page]?.title ?? ROUTES.home.title
}
