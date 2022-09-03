import { userData } from '../../utils/fakeData';
import { USER_SESSION_CHECK, USER_LOGIN_INFO, USER_SIGN_OUT, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED } from '../constants';



export const checkUserSession = (userData) => ({
    type: USER_SESSION_CHECK,
    payload: userData,
});

export const loginUserInfo = (userData) => ({
    type: USER_LOGIN_INFO,
    payload: userData,
})

export const userSignOut = () => ({
    type: USER_SIGN_OUT,
})

export const getUserData = () => (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    })
    try {
        const res = userData;
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: GET_USER_FAILED,
            payload: 'fetching user data failed'
        })
    }
}

export const updateUser = (userInfo) => (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    })
    try {
        const res = userInfo;
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res
        })
    } catch (error) {
        dispatch({
            type: GET_USER_FAILED,
            payload: 'fetching user data failed'
        })
    }
}




