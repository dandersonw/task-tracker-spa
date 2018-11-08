import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';

import api from './api';
import Routes from './routes';

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
        // I couldn't figure out how to make Root hook into Redux well so I
        // delegate everything...
        return <Routes/>;
    }
}
