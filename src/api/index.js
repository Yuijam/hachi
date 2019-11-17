import ajax from './ajax'

export const reqRegister = (user) => ajax('/api/register', user, 'POST')
export const reqLogin = (username, password) => ajax('/api/login', {username, password}, 'POST')
export const reqLogout = () => ajax('/api/logout', 'GET')
export const reqSession = () => ajax('/api/session', 'POST')
export const reqCheckExist = (data) => ajax('/api/checkExist', data, 'GET')

export const reqArticles = (username, pageIdx, pageSize) => ajax('/api/articles', {username, pageIdx, pageSize}, 'GET')
export const reqArticle = (id) => ajax('/api/article', {id}, 'GET')

export const reqPostArticle = (data) => ajax('/api/article', data, 'POST')
export const reqEditArticle = (data) => ajax('/api/article', data, 'PUT')
export const reqDeleteArticle = (id) => ajax('/api/article', {_id:id}, 'DELETE')

export const reqFollow = (data) => ajax('/api/follow', data, 'PUT')
export const reqUnFollow = (data) => ajax('/api/unfollow', data, 'PUT')
export const reqUser = (data) => ajax('/api/user', data, 'GET')

export const reqTimeline = (username, pageIdx, pageSize) => ajax('/api/timeline', {username, pageIdx, pageSize}, 'GET')
export const reqUpdateUser = (user) => ajax('/api/user', user, 'PUT')

export const reqAddComment = (comment) => ajax('/api/comment', comment, 'POST')
export const reqGetComments = (articleId) => ajax('/api/comment', articleId, 'GET')