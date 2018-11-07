import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import Header from './header';
import Register from './register';
import Tasks from './tasks';
import NewTask from './newtask';
import Complete from './complete';
import Show from './show';
import api from './api';

export default function root_init(root, store) {
    ReactDOM.render(<Provider store={store}>
                      <Root session={window.session}
                            tasks={window.tasks}/>
                    </Provider>, root);
}

class Root extends React.Component {
    constructor(props) {
        super(props);

        api.check_for_session();
        api.fetch_tasks();
    }

    render() {
        return <div>
                 <Router>
                   <div>
                     <Header />
                     <div className="row">
                       <div className="col-12">
                         <Route path="/"
                                exact={true}
                                render={() =>
                                        <Tasks />
                                       } />
                         <Route path="/register"
                                exact={true}
                                component={Register}/>
                         <Route path="/new"
                                exact={true}
                                component={NewTask}/>
                         <Route path="/complete/:id"
                                exact={true}
                                render={({match}) =>
                                        <Complete taskId={match.params.id}></Complete>
                                       }/>
                         <Route path="/show"
                                exact={true}
                                component={Show}/>
                         <Route path="/show/:id"
                                exact={true}
                                render={({match}) =>
                                        <Show taskId={match.params.id}></Show>
                                       }/>
                       </div>
                     </div>
                   </div>
                 </Router>
               </div>;
    }
}
