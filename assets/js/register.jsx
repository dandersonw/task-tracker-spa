import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import api from './api';

export function Register(props) {
    let {dispatch} = props;

    let Button = withRouter(({ history }) =>
                            (<button id="register-button"
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
               <div className="form-group-row">
                 <label className="col-sm-2 col-form-label">Email: </label>
                 <div className="col-sm-10">
                   <input id="register-email"
                          type="email"
                          placeholder="email"
                          className="form-control"/>
                 </div>
               </div>
               <div className="form-group-row">
                 <label className="col-sm-2 col-form-label">Password: </label>
                 <div className="col-sm-10">
                   <input id="register-pass"
                          type="password"
                          placeholder="password"
                          className="form-control"/>
                 </div>
               </div>
               <div className="form-group">
                 <label className="col-sm-4 col-form-label">Confirm Password: </label>
                 <div className="col-sm-10">
                   <input id="register-pass-confirmation"
                          type="password"
                          placeholder="password"
                          className="form-control"/>
                 </div>
               </div>
               <Button />
             </div>
           </form>;
}

function state2props(state) {
    return {};
}

export default connect(state2props)(Register);
