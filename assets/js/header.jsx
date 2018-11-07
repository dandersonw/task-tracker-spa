import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from './api';

// initially copied from husky shop

export function Header(props) {
    let {dispatch, session} = props;

    let session_view = <div className="form-inline">
                          <div className="form-group">
                            <input id="login-email" type="email" placeholder="email" />
                          </div>
                          <div className="form-group">
                            <input id="login-pass" type="password" placeholder="password" />
                          </div>
                         <button id="login-button"
                                 className="btn btn-secondary"
                                 onClick={() =>
                                          api.create_session(document.getElementById("login-email").value,
                                                              document.getElementById("login-pass").value)}>
                           Login
                         </button>
                          <p><Link to={"/register"}>Register</Link></p>
                       </div>;

    if (session != null) {
        session_view = <div className="col">
                         User: {session.user_email}
                         <button id="logout-button"
                                 className="btn btn-secondary"
                                 onClick={() => api.delete_session()}>Logout</button>
                       </div>;
    }

    return <div className="row my-2">
             <div className="col-4"><h2>Task Tracker</h2></div>
             <div className="col-2">
               <Link to={"/"} onClick={() => api.fetch_tasks()}>Tasks</Link>
             </div>
             <div className="col-6">
               {session_view}
             </div>
           </div>;
}

function state2props(state) {
    return {session: state.session};
}

export default connect(state2props)(Header);
