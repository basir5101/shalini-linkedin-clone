import { GET_UPDATE_FAILED, GET_UPDATE_REQUEST, GET_UPDATE_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS } from "../constants"


const initialState = {
    isLoading: false,
    userInfo: {},
    error: null
}


const UserDataReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state, isLoading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state, isLoading: false, userInfo: action.payload, error: null
            }
        case GET_USER_FAILED:
            return {
                ...state, isLoading: false, error: action.payload
            }
        case GET_UPDATE_REQUEST:
            return {
                ...state, isLoading: true
            }
        case GET_UPDATE_SUCCESS:
            return {
                ...state, isLoading: false, userInfo: { ...state.userInfo }, error: null
            }
        case GET_UPDATE_FAILED:
            return {
                ...state, isLoading: false, error: action.payload
            }
        default:
            return state;
    }

}

export default UserDataReducer;