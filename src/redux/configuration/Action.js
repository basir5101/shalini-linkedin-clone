import { CONFIGURATION_LOAD, TABLE_PAGINATION } from '../constants';

// ///////////////////////////////////////////
// Axios part Reducers
// //////////////////////////////////////////

export const configLoad = (data) => ({
    type: CONFIGURATION_LOAD,
    payload: data,
});


export const setTablePagination = (data) => ({
    type: TABLE_PAGINATION,
    payload: data,
});


