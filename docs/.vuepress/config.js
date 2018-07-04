
module.exports = {
  base: "/",
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "Better Note :)",
      description: "Sometime+s naiv5 👓 ，日常见闻笔记记"
    }
  },
  // head: [
  //   ['link', { rel: 'icon', href: `/logo.png` }],
  //   ['link', { rel: 'manifest', href: '/manifest.json' }],
  //   ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  //   ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  //   ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  //   ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
  //   ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
  //   ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
  //   ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  // ],
  serviceWorker: true,
  // theme: 'vue',
  themeConfig: {
    displayAllHeaders: true,
    activeHeaderLinks: true,
    repo: 'Aysnine/better-note',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '博客',
            items: [
              { text: 'JavaScript', link: '/note/JavaScript/' },
              { text: 'VueJS', link: '/note/VueJS/' },
              { text: 'EggJS', link: '/note/EggJS/' },
              { text: '服务器', link: '/note/Server/' },
              {
                text: '数据库',
                items: [
                  { text: 'MySQL', link: '/note/MySQL' },
                  { text: 'PostgreSQL', link: '/note/PostgreSQL' },
                ]
              },
            ]
          },
          {
            text: '陋室',
            link: '/think/'
          },
          {
            text: '速食',
            link: '/quick/',
          },
        ],
        sidebar: {
          '/note/JavaScript/': [
            '', 'a', 'b'
          ]
        }
      }
    }
  }
};
