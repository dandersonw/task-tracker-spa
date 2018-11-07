import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import store from './store';
import _ from 'lodash';

import api from './api';

export function Show(props) {
    let {dispatch, taskId, showTask} = props;

    if (showTask != null && taskId == null) {
        return <Redirect to={{pathname: "/show/" + showTask.id}}/>;
    }

    return <div>{props.taskId}</div>;

}

function state2props(state) {
    return {showTask: state.show_task};
}

export default connect(state2props)(Show);
