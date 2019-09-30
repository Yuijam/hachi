const initialState = {
    userInfo:{},
    buttonVisible:{write:true, done:false},
    curPage:1
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
        case 'UPDATE_PAGE':
            return {
                ...state,
                curPage:action.curPage
            }
        default:
            return state
    }
}

export default index