import { CONFIGURATION_LOAD, TABLE_PAGINATION } from '../constants';

const INIT_STATE = {
    configLoaded: false,
    configData: {},

    tablePaginationConfguration: {
        userListing: 10,
        sessionTable: 10,
        MdmTable: 10
    }

};

const ConfigReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CONFIGURATION_LOAD:
            return {
                ...state,
                configLoaded: true,
                configData: action.payload
            };


        case TABLE_PAGINATION:
            return {
                ...state,
                tablePaginationConfguration: {
                    ...state.tablePaginationConfguration, [action.payload.key]: action.payload.value
                }
            };

        default:
            return state;
    }
};


export default ConfigReducer;
