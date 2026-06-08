export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/explorer/index',
    'pages/search/index',
    'pages/settings/index',
    'pages/viewer/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3366cc',
    navigationBarTitleText: 'MD Viewer',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#80868b',
    selectedColor: '#3366cc',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home'
      },
      {
        pagePath: 'pages/explorer/index',
        text: 'Explorer'
      },
      {
        pagePath: 'pages/search/index',
        text: 'Search'
      },
      {
        pagePath: 'pages/settings/index',
        text: 'Settings'
      }
    ]
  }
})
