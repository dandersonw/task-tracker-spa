import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

export function NewTask(props) {
    let {dispatch} = props;

    let Button = withRouter(({ history }) =>
                            (<button id="register-button"
                                   type="button"
                                   className="btn btn-primary col-sm-2"
                                   onClick={() =>
                                            {api.new_task(document.getElementById("task-title").value,
                                                          document.getElementById("task-description").value,
                                                          document.getElementById("task-assignee").value);
                                             history.push('/show');}}>
                              New Task
                            </button>));

    return <form>
             <div className="form">
               <div className="form-group">
                 <label className="col-sm-2 col-form-label">Title: </label>
                 <div className="col-sm-10">
                   <input id="task-title"
                          type="text"
                          placeholder="title"
                          className="form-control"/>
                 </div>
               </div>
               <div className="form-group">
                 <label className="col-sm-2 col-form-label">Description: </label>
                 <div className="col-sm-10">
                   <textarea id="task-description"
                             className="form-control"
                             placeholder="Description">
                   </textarea>
                 </div>
               </div>
               <div className="form-group">
                 <label className="col-sm-2 col-form-label">Assignee: </label>
                 <div className="col-sm-10">
                   <input id="task-assignee"
                          type="text"
                          placeholder="assignee"
                          className="form-control"/>
                 </div>
               </div>
               <Button/>
             </div>
           </form>;
}

function state2props(state) {
    return {};
}

export default connect(state2props)(NewTask);
