import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Recipes from './components/Recipes';
import Callback from './components/Callback';

const Root = () => ((
  <div className="container">
    <BrowserRouter>
      <Route path="/" component={Recipes} />
    </BrowserRouter>
    <BrowserRouter>
      <Route path="/callback" component={Callback} />
    </BrowserRouter>
  </div>
));

ReactDOM.render(<Root />, document.getElementById('root'));
