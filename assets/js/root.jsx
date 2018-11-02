import React from 'react';
import ReactDOM from 'react-dom';

export default function root_init(root) {
  ReactDOM.render(<Root />, root);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <h2>TaskTracker loaded.</h2>
    </div>;
  }
}
