import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import Header from './header';
import Register from './register';


export default function root_init(root) {
    ReactDOM.render(<Root />, root);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session: window.session,
        };
    }

    // copied from husky shop
    create_session(email, password) {
        $.ajax("/api/v1/sessions", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({"email": email, "password": password}),
            success: (resp) => {
                let state1 = _.assign({}, this.state, { session: resp.data });
                this.setState(state1);
            },
            error: (resp) => {
                console.log("bad username/password");
            }
        });
    }

    delete_session() {
        $.ajax("/api/v1/sessions", {
            method: "delete",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                let state1 = _.assign({}, this.state, { session: null });
                this.setState(state1);
            }
        });
    }

    register_user(email, password, password_confirmation) {
        $.ajax("/api/v1/users", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({"user": {"email": email,
                                           "password": password,
                                           "password_confirmation": password_confirmation}}),
            success: (resp) => {
                let state1 = _.assign({}, this.state, { session: resp.data });
                this.setState(state1);
            },
            error: (resp) => {
                console.log("couldn't register");
            }
        });
    }

    render() {
        return <div>
                 <Router>
                   <div>
                     <Header root={this} />
                     <div className="row">
                       <div className="col-8">
                         <Route path="/" exact={true} render={() =>
                                                              <br/>
                                                             } />
                         <Route path="/register"
                                exact={true}
                                render={() =>
                                        <Register root={this}/>
                                       } />
                       </div>
                     </div>
                   </div>
                 </Router>
               </div>;
    }
}
