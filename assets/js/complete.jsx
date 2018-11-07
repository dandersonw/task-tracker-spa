import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export function Complete(props) {
    let {dispatch, taskId, showTask, session} = props;

    if (showTask == null || showTask.id != taskId) {
        api.get_task(taskId);
        return <p>Loading...</p>;
    }

    if (showTask.assignee != session.user_email) {
        return <p>The task "{showTask.title}" is not assigned to you.</p>;
    }

    let Button = withRouter(({ history }) =>
                            (<button id="complete-button"
                                     type="button"
                                     className="btn btn-primary col-sm-2"
                                     onClick={() => {
                                         let email = document.getElementById("register-email").value;
                                         let pass = document.getElementById("register-pass").value;
                                         let conf = document.getElementById("register-pass-confirmation").value;
                                         api.register_user(email,
                                                           pass,
                                                           conf);
                                         history.push('/');
                                     }}>
                               Register
                             </button>));

    return <form>
             <div className="form">
               <div className="form-group">
                 <label className="col-sm-2 col-form-label">Title: </label>
                 <div className="col-sm-10">
                   <input id="task-title"
                          type="text"
                          placeholder="title"
                          className="form-control"
                          readonly
                          value={showTask.title}/>
                 </div>
               </div>
               <div className="form-group">
                 <label className="col-sm-2 col-form-label">Description: </label>
                 <div className="col-sm-10">
                   <textarea id="task-description"
                             className="form-control"
                             placeholder="Description"
                             readonly
                             value={showTask.desc}>
                   </textarea>
                 </div>
               </div>
               <Button />
             </div>
           </form>;
}

function state2props(state) {
    return {showTask: state.show_task, session: state.session};
}

export default connect(state2props)(Complete);
