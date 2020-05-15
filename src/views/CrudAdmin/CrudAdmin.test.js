import React from 'react';
import ReactDOM from 'react-dom';
import CrudAdmin from './CrudAdmin';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CrudAdmin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
