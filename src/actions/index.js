export const updateUserInfo = userInfo => ({
    type: 'UPDATE_USER_INFO',
    userInfo
})

export const updateBtnVisibleState = v => ({
    type: 'UPDATE_BUTTON_VISIBLE',
    buttonVisible:v
})