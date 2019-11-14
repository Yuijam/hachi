import {
  UPDATE_USER_INFO,
  UPDATE_PAGE
} from './ActionTypes'
import { reqLogin } from '../api'
import { message } from 'antd'

export const updateUserInfo = userInfo => ({
  type: UPDATE_USER_INFO,
  userInfo
})

export const updatePage = curPage => ({
  type: UPDATE_PAGE,
  curPage
})

export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    console.log('login', result)
    if (result.status === 0) {
      const user = result.data
      // storageUtils.saveUser(user)

      dispatch(updateUserInfo(user))
    } else {
      console.log('login error')
      const msg = result.msg
      message.error(msg)
      // dispatch(showErrorMsg(msg))
    }

  }
}