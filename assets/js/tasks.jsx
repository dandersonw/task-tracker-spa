import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import _ from 'lodash';

export function Tasks(props) {
    let {tasks, dispatch} = props;

    let relevantTasks = tasks;

    return <div className="row">
             <table className="table table-striped">
               <tbody>
                 <tr key="header">
                   <td>Completed</td>
                   <td>Title</td>
                   <td>Assignee</td>
                   <td>Description</td>
                   <td>Created At</td>
                 </tr>
                 { _.map(relevantTasks, (task) => <Task task={task}/>)}
               </tbody>
             </table>
             <Link to={"/new"}>New Task</Link>
           </div>;

}

function Task(props) {
    let { task } = props;
    //console.log(task);
    return <tr key={task.id}>
             <td>{task.completed ? "✓" : <Link to={"/complete/" + task.id}>Complete</Link>}</td>
             <td><Link to={"/show/" + task.id}>{task.title}</Link></td>
             <td>{task.assignee}</td>
             <td>{task.dec}</td>
             <td>{created_at(task)}</td>
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
        tasks: state.tasks,
    };
}

export default connect(state2props)(Tasks);
