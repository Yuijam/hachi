import {combineReducers} from 'redux'
import {
    UPDATE_USER_INFO,
    UPDATE_PAGE
} from './ActionTypes'

const initUser = {}
function userInfo(state = initUser, action){
    switch (action.type) {
        case UPDATE_USER_INFO:
            return action.userInfo
        default:
            return state
    }
}


const initPage = 1
function curPage(state = initPage, action) {
    switch (action.type) {
        case UPDATE_PAGE:
            return action.curPage
        default:
            return state
    }
}

export default combineReducers({
    curPage,
    userInfo
})