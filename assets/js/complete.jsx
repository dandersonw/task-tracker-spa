import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

class Complete extends React.Component {
    constructor(props) {
        super(props);

        let {dispatch, taskId, showTask, session} = props;
        if (showTask == null || showTask.id != taskId) {
            console.log("fetch");
            api.get_task(taskId);
        }
    }

    render() {
        let {dispatch, taskId, showTask, session, mode} = this.props;

        if (showTask == null) {
            return <p>Loading...</p>;
        }

        if (session == null || (mode == "progress" && showTask.assignee != session.user_email)) {
            return <p>The task "{showTask.title}" is not assigned to you.</p>;
        }

        console.log(mode);

        return <form>
                 <div className="form">
                   <div className="form-group">
                     <label className="col-sm-2 col-form-label">Title: </label>
                     <div className="col-sm-10">
                       <input id="task-title"
                              type="text"
                              placeholder="title"
                              className="form-control"
                              readOnly
                              value={showTask.title}/>
                     </div>
                   </div>
                   <div className="form-group">
                     <label className="col-sm-2 col-form-label">Description: </label>
                     <div className="col-sm-10">
                       <textarea id="task-description"
                                 className="form-control"
                                 placeholder="Description"
                                 readOnly
                                 value={showTask.desc}>
                       </textarea>
                     </div>
                   </div>
                   {mode == "progress" && <Progress showTask={showTask} taskId={taskId}/>}
                   {mode == "assign" && <Assign showTask={showTask} taskId={taskId}/>}
                 </div>
               </form>;
    }
}

const ProgressButton = withRouter(({ history, taskId }) =>
                                  (<button id="complete-button"
                                           type="button"
                                           className="btn btn-primary col-sm-2"
                                           onClick={() => {
                                               let time_spent = document.getElementById("task-time-spent").value;
                                               let completed = document.getElementById("task-completed").checked;
                                               api.update_task_progress(taskId, time_spent, completed);
                                               history.push('/show');
                                           }}>
                                     Update Progress
                                   </button>));

function Progress(props) {
    let {showTask, taskId} = props;
    return <div>
             <div className="form-group">
               <label className="col-sm-2 col-form-label">Minutes Spent: </label>
               <div className="col-sm-10">
                 <input id="task-time-spent"
                        type="number"
                        className="form-control"
                        step={15}
                        placeholder={showTask.time_spent}
                        defaultValue={showTask.time_spent}/>
               </div>
             </div>
             <div className="form-group">
               <label className="col-sm-2 col-form-label">Completed: </label>
               <div className="col-sm-10">
                 <input id="task-completed"
                        type="checkbox"
                        className="form-control"/>
               </div>
             </div>
             <ProgressButton taskId={taskId}/>
           </div>;
}

const AssignButton = withRouter(({ history, taskId }) =>
                                (<button id="assign-button"
                                         type="button"
                                         className="btn btn-primary col-sm-2"
                                         onClick={() => {
                                             let assignee = document.getElementById("task-assignee").value;
                                             api.assign_task(taskId, assignee);
                                             history.push('/show');
                                         }}>
                                   Assign
                                 </button>));

function Assign(props) {
    let {showTask, taskId} = props;
    return <div>
             <div className="form-group">
               <label className="col-sm-2 col-form-label">Assignee: </label>
               <div className="col-sm-10">
                 <input id="task-assignee"
                        type="text"
                        className="form-control"
                        placeholder={showTask.assignee}
                        defaultValue={showTask.assignee}/>
               </div>
             </div>
             <AssignButton taskId={taskId}/>
           </div>;
}

function state2props(state) {
    return {showTask: state.show_task, session: state.session};
}

export default connect(state2props)(Complete);
