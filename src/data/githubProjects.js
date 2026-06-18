export const allGithubProjects = [
    {
        id: 'minsecrus-github-io',
        name: 'Minsecrus.github.io',
        description: '个人主页项目，使用 Preact 和 Motion 构建的现代化网站',
        repoHref: 'https://github.com/Minsecrus/Minsecrus.github.io',
        featured: true,
    },
    {
        id: 'mdr-c-tutorial',
        name: 'Mdr-C-Tutorial',
        description: '完全开源免费的全套 C 语言教程，涉及从基础语法到项目开发的广大领域',
        repoHref: 'https://github.com/Mdr-C-Tutorial/C',
        featured: true,
    },
    {
        id: 'cpos',
        name: '操作系统 CPOS',
        description: '自制操作系统内核，在 Bilibili 有几十万播放量',
        repoHref: 'https://github.com/PLOS-clan/CoolPotOS',
        featured: true,
    },
    {
        id: 'prodivix',
        name: 'Prodivix',
        description: '开源可视化前端开发平台 —— 从设计到部署的全流程解决方案',
        repoHref: 'https://github.com/Mdr-Tutorials/prodivix',
        featured: true,
    },
    {
        id: 'frontfrontier',
        name: 'FrontFrontier',
        featuredName: 'Front Frontier',
        description: '前端亦可前沿 —— 前端知识分享站',
        repoHref: 'https://github.com/Minsecrus/FrontFrontier',
        pagesHref: 'https://minsecrus.github.io/FrontFrontier/',
        group: '教程和分享',
        featured: true,
    },
    {
        id: 'budgetbridge',
        name: 'BudgetBridge',
        description: 'Go/TypeScript API 代理，聚合多账户为单一高可用服务，支持 OpenAI 和 Anthropic 格式',
        repoHref: 'https://github.com/Minsecrus/BudgetBridge',
        featured: true,
    },
    {
        id: 'learning-notes',
        name: 'Learning Notes',
        pagesHref: 'https://minsecrus.github.io/learning-notes/',
        group: '教程和分享',
    },
    {
        id: 'easy-maths',
        name: 'EasyMaths',
        pagesHref: 'https://minsecrus.github.io/EasyMaths/',
        group: '教程和分享',
    },
    {
        id: 'drifter-poetry',
        name: 'DrifterPoetry',
        pagesHref: 'https://minsecrus.github.io/DrifterPoetry/',
        group: '教程和分享',
    },
    {
        id: 'history-axis',
        name: 'HistoryAxis',
        pagesHref: 'https://minsecrus.github.io/HistoryAxis/',
        group: '前端随笔',
    },
    {
        id: 'gene-graph',
        name: 'GeneGraph',
        pagesHref: 'https://minsecrus.github.io/GeneGraph/',
        group: '前端随笔',
    },
    {
        id: 'pro-con-sheet',
        name: 'ProConSheet',
        pagesHref: 'https://minsecrus.github.io/ProConSheet/',
        group: '前端随笔',
    },
    {
        id: 'calli-grid',
        name: 'CalliGrid',
        pagesHref: 'https://minsecrus.github.io/CalliGrid/',
        group: '前端随笔',
    },
    {
        id: 'name-kura',
        name: 'NameKura',
        pagesHref: 'https://minsecrus.github.io/NameKura/',
        group: '前端随笔',
    },
    {
        id: 'css-tellation',
        name: 'CssTellation',
        pagesHref: 'https://minsecrus.github.io/CssTellation/',
        group: '前端随笔',
    },
    {
        id: 'zen-resume',
        name: 'ZenResume',
        pagesHref: 'https://minsecrus.github.io/ZenResume-Generator/',
        group: '前端随笔',
    },
    {
        id: 'character-percents',
        name: 'CharacterPercents',
        pagesHref: 'https://minsecrus.github.io/CharacterPercents/',
        group: '前端随笔',
    },
    {
        id: 'quixam',
        name: 'QuiXam',
        pagesHref: 'https://minsecrus.github.io/QuiXam/',
        group: '前端随笔',
    },
    {
        id: 'grid-logo',
        name: 'GridLogo',
        pagesHref: 'https://minsecrus.github.io/GridLogo/',
        group: '前端随笔',
    },
    {
        id: 'sugar-scout',
        name: 'SugarScout',
        pagesHref: 'https://minsecrus.github.io/SugarScout/',
        group: '前端随笔',
    },
    {
        id: 'refactoring-ui-example',
        name: 'Refactoring Demo',
        pagesHref: 'https://minsecrus.github.io/refactoring-ui-example/',
        group: '前端随笔',
    },
    {
        id: 'fork-mind',
        name: 'ForkMind',
        pagesHref: 'https://minsecrus.github.io/ForkMind/',
        group: '前端随笔',
    },
    {
        id: 'agent-3d',
        name: 'Agent3D',
        pagesHref: 'https://minsecrus.github.io/Agent3D/',
        group: '前端随笔',
    },
    {
        id: 'neon-flow-rhythm',
        name: 'NeonFlow',
        pagesHref: 'https://minsecrus.github.io/NeonFlow-Rhythm/',
        group: '前端随笔',
    },
    {
        id: 'cormorants-riding-bicycles',
        name: 'CormorantCycling',
        pagesHref: 'https://minsecrus.github.io/Cormorants-riding-bicycles/',
        group: '前端随笔',
    },
]

export const featuredGithubProjects = allGithubProjects
    .filter((project) => project.featured)
    .map(({ id, name, featuredName, description, repoHref, pagesHref }) => ({
        id,
        name: featuredName ?? name,
        description,
        href: repoHref ?? pagesHref,
    }))

export const githubPageProjectGroups = ['教程和分享', '前端随笔'].map((title) => ({
    title,
    items: allGithubProjects
        .filter((project) => project.group === title && project.pagesHref)
        .map(({ id, name, pagesHref }) => ({ id, name, href: pagesHref })),
}))
