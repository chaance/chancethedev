const authors = require('./authors');
const { blue30, black100 } = require('@chancethedev/colors');

module.exports = {
  pathPrefix: '/',
  siteTitle: 'Chance the Developer',
  siteTitleAlt: 'A web developer who occasionally podcasts.',
  siteTitleShort: 'Chance the Dev',
  siteUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000'
      : 'https://chancethedev.com',
  siteLanguage: 'en',
  siteLogo: 'images/logo.png', // Relative to 'static' folder
  siteDescription: 'A web developer who occasionally podcasts.',
  author: authors.find(author => author.id === 'chance'),
  organization: 'Chance Digital',
  keywords: ['podcast', 'web development', 'JavaScript', 'React'],

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  itunesAppId: '1344502648',
  userTwitter: '@chancethedev',
  ogSiteName: 'Chance the Developer',
  ogLanguage: 'en_US',
  typekitId: 'bmo6hfj',
  podcastID: 'be80c501-3fbc-4cd2-9e9b-b11d13e4925e',

  // Manifest and Progress color
  themeColor: blue30,
  backgroundColor: black100,

  // Social component
  twitter: 'https://twitter.com/chancethedev/',
  twitterHandle: '@chancethedev',
  github: 'https://github.com/chancestrickland/',
  stackOverflow: 'https://stackoverflow.com/users/1792019/chance-strickland',
  linkedin: 'https://www.linkedin.com/in/chancestrickland/',
};
