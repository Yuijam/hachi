const index = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                userInfo:action.userInfo
            }   
        default:
            return state
    }
}

export default index