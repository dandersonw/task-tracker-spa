import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

// Shamelessly initially copied from course notes

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

function root_reducer(state0, action) {
    console.log("reducer", state0, action);

    let reducer = combineReducers({tasks, session, show_task});
    let state1 = reducer(state0, action);

    console.log("reducer1", state1);

    return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;