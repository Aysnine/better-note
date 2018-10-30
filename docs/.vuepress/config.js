const path = require('path');
const ls = require('ls');

let nav = [
  {
    text: '📗 笔记',
    items: [
      { text: '🦄 Web前端', link: '/note/FrontEnd/', auto: true },
      { text: '🐢 NodeJS', link: '/note/NodeJS/', auto: true },
      { text: '🐘 数据库', link: '/note/Database/', auto: true },
      { text: '🐧 Linux', link: '/note/Linux/', auto: true },
      { text: '🚀 探索', link: '/note/Explore/', auto: true }
    ]
  },
  {
    text: '👓 收藏集',
    link: '/star/'
  },
  {
    text: '🌈 作品',
    link: '/project/'
  },
  {
    text: '⚡️ 速食记',
    link: '/quick/'
  }
];

// 文件排序，默认显示最新，README在最前
function sortFile(files) {
  // console.log(files.map(i => i.path))
  files.sort((a, b) => (a.stat.ctime < b.stat.ctime))
  let o = files.find(i => i.name === 'README')
  if (o) {
    files.splice(files.indexOf(o), 1);
    files.unshift(o);
  }
}

module.exports = {
  base: "/",
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "📚 Better Note",
      description: "CNine的日常笔记"
    }
  },
  serviceWorker: true,
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
        nav,
        sidebar: buildSidebar(nav)
      }
    }
  }
};

function buildSidebar(nav) {

  let task = [];
  function rev(list) {
    list.map(i => {
      if (i.auto) task.push(i);
      if (i.items) rev(i.items);
    })
  }; rev(nav);

  let rst = {};
  task.map(i => {
    if (i.link && i.text) {
      rst[i.link] = [
        {
          title: i.text,
          collapsable: false,
          children: getList(i.link)
        }
      ]
    }
  })

  return rst
}

function getList(link) {
  let p = path.join(__dirname, '..', link);
  let files = ls(p + '*.md');
  sortFile(files);
  let rst = [];
  for (let file of files) {
    rst.push(file.name === 'README' ? '' : file.name)
  }
  return rst;
}
