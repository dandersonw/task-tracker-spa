import React from 'react';
import { Link } from 'react-router-dom';

// initially copied from husky shop

export default function Header(props) {
    let {root} = props;

    let session_view = <div className="form-inline my-2">
                         <input id="login-email" type="email" placeholder="email" />
                         <input id="login-pass" type="password" placeholder="password" />
                         <button id="login-button"
                                 className="btn btn-secondary"
                                 onClick={() =>
                                          root.create_session(document.getElementById("login-email").value,
                                                              document.getElementById("login-pass").value)}>
                           Login</button>
                       </div>;

    if (root.state.session != null) {
        session_view = <div className="col">
                         User: {root.state.session.user_email}
                         <button id="logout-button"
                                 className="btn btn-secondary"
                                 onClick={() => root.delete_session()}>Logout</button>
                       </div>;
    }

    return <div className="row my-2">
    <div className="col-4"><h2>Task Tracker</h2></div>
    {/* <div className="col-4"> */}
    {/*   <h1><Link to={"/"} onClick={root.fetch_products.bind(root)}>Husky Shop</Link></h1> */}
    {/* </div> */}
    {/* <div className="col-2"> */}
    {/*   <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p> */}
    {/* </div> */}                        
    <div className="col-6">
      {session_view}
    </div>
  </div>;
}
