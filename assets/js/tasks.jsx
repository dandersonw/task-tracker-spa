import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import _ from 'lodash';

export function Tasks(props) {
    let {session, tasks, dispatch, show_completed, show_others} = props;

    let relevantTasks = _.filter(tasks, task_is_relevant(session, show_completed, show_others));

    return <div>
             <div className="row">
               <div className="col-sm">
                 <div className="row">
                   <div className="col-sm">
                     <p>View Completed: </p>
                   </div>
                   <div className="col-sm">
                     <input id="view-completed"
                            type="checkbox"
                            checked={show_completed}
                            onClick={checkbox_handler(dispatch,
                                                      "view-completed",
                                                      "SHOW_COMPLETED",
                                                      "SHOW_IN_PROGRESS")}
                            className="form-control"/>
                   </div>
                 </div>
               </div>
               <div className="col-sm">
                 <div className="row">
                   <div className="col-sm">
                     <p>View Others: </p>
                   </div>
                   <div className="col-sm">
                     <input id="view-others"
                            type="checkbox"
                            className="form-control"
                            checked={show_others}
                            onClick={checkbox_handler(dispatch,
                                                      "view-others",
                                                      "SHOW_OTHERS",
                                                      "SHOW_MINE")}/>
                   </div>
                 </div>
               </div>
             </div>
             <div className="row">
               <table className="table table-striped">
                 <tbody>
                   <tr key="header">
                     <td>Completed</td>
                     <td>Title</td>
                     <td>Assignee</td>
                     <td>Description</td>
                     <td>Created At</td>
                     <td></td>
                   </tr>
                   { _.map(relevantTasks, (task) => <Task task={task}/>)}
                 </tbody>
               </table>
               <Link to={"/new"}>New Task</Link>
             </div>
           </div>;

}

function checkbox_handler(dispatch, name, positive, negative) {
    function result() {
        let message = document.getElementById(name).checked ? positive : negative;
        dispatch({
            type: message
        });
    }
    return result;
}

function task_is_relevant(session, show_completed, show_others) {
    function result(task) {
        return ((show_completed || !task.completed)
                && (show_others || session == null || session.user_email == task.assignee));
    }
    return result;
}

function Task(props) {
    let { task } = props;
    //console.log(task);
    return <tr key={task.id}>
             <td>{task.completed ? "✓" : "X"}</td>
             <td><Link to={"/show/" + task.id}>{task.title}</Link></td>
             <td>{task.assignee == null ? <Link to={"/assign/" + task.id}>Assign</Link> : task.assignee}</td>
             <td>{task.dec}</td>
             <td>{created_at(task)}</td>
             <td><Link to={"/progress/" + task.id}>Track Progress</Link></td>
           </tr>;
}


function created_at(task) {
  return (
    <div>
      <ReactTimeAgo locale="en">{Date.parse(task.inserted_at)}</ReactTimeAgo>
      {/* {task.inserted_at} */}
    </div>
  );
}

function state2props(state) {
    return {
        session: state.session,
        tasks: state.tasks,
        show_completed: state.task_view_preferences.completed,
        show_others: state.task_view_preferences.others,
    };
}

export default connect(state2props)(Tasks);
