import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DisplayAll from './containers/DisplayRecipes';
import Header from './components/NavigationBar';

const App = () => (
  <div id="App">
    <Header className="Header" />
    <Router>
      <Route path="/" component={DisplayAll} />
    </Router>
  </div>
);

export default App;
