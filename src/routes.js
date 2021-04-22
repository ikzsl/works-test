import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';

export const routes = {
  searchUsersUrl: () => '/search/users',
  searchRepositoriesUrl: () => '/search/repositories',
  getReadmeUrl: (owner, repo) => `/repos/${owner}/${repo}/readme`,
  postRenderMarkdown: () => '/markdown',
  // userLoginUrl: () => 'users/login',
  // getProfileUrl: () => 'user',
  // getArticleUrl: (slug) => `articles/${slug}`,
  // getArticlesListUrl: (limit = 10, offset = 0) => `articles?limit=${limit}&offset=${offset}`,
  // setFavoriteArticleURL: (slug) => `articles/${slug}/favorite`,
  // articlePostUrl: () => 'articles',
  // articleEditUrl: (slug) => `articles/${slug}`,
  // articleDeleteUrl: (slug) => `articles/${slug}`,
};