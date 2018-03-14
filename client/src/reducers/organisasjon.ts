import { handleActions, Action } from 'redux-actions';

import { UPDATE_KONTAKTPERSON, UPDATE_JURIDISKANSVARLIG, ADD_JURIDISKANSVARLIG, DELETE_JURIDISKANSVARLIG  } from '../actions/organisasjonActions'; 

const initialState = [];

export default handleActions<any>(
    {
        [UPDATE_KONTAKTPERSON]: (state: Pomo, action: Action<string>): Pomo => {
            return Object.assign({}, state, {taskId: action.payload, timer: true});
        },
        [UPDATE_JURIDISKANSVARLIG]: (state: Pomo, action: Action<string>): Pomo => {
            return Object.assign({}, state, {taskId: action.payload, timer: false});
        },
        [ADD_JURIDISKANSVARLIG]: (state: Pomo, action: Action<string>): Pomo => {
            return Object.assign({}, state, {taskId: action.payload, timer: false});
        },
        [DELETE_JURIDISKANSVARLIG]: (state: Pomo, action: Action<string>): Pomo => {
            return Object.assign({}, state, {taskId: action.payload, timer: false});
        }
    }, 
    initialState);