import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

import _ from 'lodash';

function show_task(state = null, action) {
    switch(action.type) {
    case 'SHOW_TASK':
        return action.data;
    case 'CLEAR_SHOW_TASK':
        return null;
    default:
        return state;
    }
}

function tasks(state = [], action) {
    switch (action.type) {
    case 'TASK_LIST':
        return action.data;
    default:
        return state;
    }
}

function session(state = null, action) {
    switch (action.type) {
    case 'NEW_SESSION':
        return action.data;
    case 'DELETE_SESSION':
        return null;
    default:
        return state;
    }
}

function error(state = null, action) {
    switch(action.type) {
    case 'SHOW_ERROR':
        return action.data;
    case 'CLEAR_ERROR':
        return null;
    default:
        return state;
    }
}

function task_view_preferences(state = {"others": false, "completed": false} , action) {
    switch(action.type) {
    case 'SHOW_COMPLETED':
        return _.merge({}, state, {'completed': true})
    case 'SHOW_IN_PROGRESS':
        return _.merge({}, state, {'completed': false})
    case 'SHOW_OTHERS':
        return _.merge({}, state, {'others': true})
    case 'SHOW_MINE':
        return _.merge({}, state, {'others': false})
    default:
        return state;
    }
}

// copied from course notes

function root_reducer(state0, action) {
    console.log("reducer", state0, action);

    let reducer = combineReducers({tasks, session, show_task, error, task_view_preferences});
    let state1 = reducer(state0, action);

    console.log("reducer1", state1);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
