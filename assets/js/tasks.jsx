import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import _ from 'lodash';

export default function Tasks(props) {
    let {root} = props;

    let relevantTasks = root.state.tasks;

    return <table className="table table-striped">
             <tbody>
               <tr key="header">
                 <td>Completed</td>
                 <td>Title</td>
                 <td>Description</td>
                 <td>Created At</td>
               </tr>
               { _.map(relevantTasks, task_to_row)}
             </tbody>
           </table>;

}

function task_to_row(task) {
    return <tr key={task.id}>
             <td>{task.completed ? "✓" : <Link to={"/complete/" + task.id}>Complete</Link>}</td>
             <td><Link to={"/show/" + task.id}>{task.title}</Link></td>
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
  )
}
