import React from 'react';
import { Link } from 'react-router-dom';


export default function Register(props) {
    let {root} = props;

    return <form><div className="form">
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
            <button id="register-button"
                    className="btn btn-primary col-sm-2"
                    onClick={() =>
                             root.register_user(document.getElementById("register-email").value,
                                               document.getElementById("register-pass").value,
                                               document.getElementById("register-pass-confirmation").value)}>
              Register</button>
          </div>
    </form>;
}
