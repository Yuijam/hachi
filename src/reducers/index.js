const initialState = {
    userInfo:{},
    buttonVisible:{write:true, done:false}
}

const index = (state = initialState, action) => {
    switch (action.type){
        case 'UPDATE_USER_INFO':
            return {
                ...state,
                userInfo:action.userInfo
            }
        case 'UPDATE_BUTTON_VISIBLE':
            return {
                ...state,
                buttonVisible:action.buttonVisible
            }   
        default:
            return state
    }
}

export default index