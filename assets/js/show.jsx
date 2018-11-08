import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import ReactTimeAgo from 'react-time-ago';

import api from './api';

class Show extends React.Component {
    constructor(props) {
        super(props);

        let {dispatch, taskId, showTask, session} = props;
        if (showTask == null || (taskId != null && showTask.id != taskId)) {
            console.log("fetch");
            api.get_task(taskId);
        }
    }


    render() {
        let {dispatch, taskId, showTask, session} = this.props;

        if (showTask != null && taskId == null) {
            return <Redirect to={{pathname: "/show/" + showTask.id}}/>;
        }

        if (showTask == null) {
            return <p>Loading...</p>;
        }

        return <ul>
                 <li>
                   <strong>Title: </strong>
                   {showTask.title}
                 </li>
                 <li>
                   <strong>Description: </strong>
                   {showTask.desc}
                 </li>
                 <li>
                   <strong>Minutes Spent: </strong>
                   {showTask.time_spent}
                 </li>
                 <li>
                   <strong>Assignee: </strong>
                   {showTask.assignee}
                 </li>
                 <li>
                   <strong>Created: </strong>
                   <ReactTimeAgo locale="en">{Date.parse(showTask.inserted_at)}</ReactTimeAgo>
                 </li>
                 <li>
                   <strong>Completed: </strong>
                   {showTask.completed? "true" : "false"}
                 </li>
               </ul>;
    }
}

function state2props(state) {
    return {showTask: state.show_task, session: state.session};
}

export default connect(state2props)(Show);
