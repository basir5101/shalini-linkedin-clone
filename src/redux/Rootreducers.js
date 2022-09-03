import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';
import UserInfoReducer from './userInfo/userInfoReducer';
import ConfigReducer from './configuration/configurationReducer'
import UserDataReducer from './userInfo/userDataReducer';


const RootReducers = combineReducers({
    CustomizerReducer,
    UserInfoReducer,
    ConfigReducer,
    UserDataReducer
});

export default RootReducers;
