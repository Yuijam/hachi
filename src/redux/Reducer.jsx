import {combineReducers} from 'redux'
import {
    UPDATE_USER_INFO,
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

export default combineReducers({
    userInfo
})