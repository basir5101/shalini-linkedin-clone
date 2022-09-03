import { USER_SESSION_CHECK, USER_LOGIN_INFO, USER_SIGN_OUT } from '../constants';

const INIT_STATE = {
    Islogin: false,
    firstName: "",
    lastName: "",
    email: "",
    userId: 0,
    userTypeLabel: "",
    roles: [],
    modules: [],
    filters: {},
};

const UserInfoReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_SESSION_CHECK:
            return {
                ...state,
                Islogin: true,
                roles: action.payload.roles,
                modules: action.payload.modules,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                userId: action.payload.userId,
                userTypeLabel: action.payload.userTypeLabel,
                filters: action.payload.filters,
            };

        case USER_LOGIN_INFO:
            return {
                ...state,
                Islogin: true,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                roles: action.payload.roles,
                modules: action.payload.modules,
                email: action.payload.email,
                userId: action.payload.userId,
                userTypeLabel: action.payload.userTypeLabel,
                filters: action.payload.filters,
            }

        case USER_SIGN_OUT:
            return {
                ...INIT_STATE,
            }

        default:
            return state;
    }
};

export default UserInfoReducer;
