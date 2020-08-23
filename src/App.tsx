import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import VideoSearch from './components/videoSearch';
import VideoCard from './components/videoCard';

function App() {
  return (
    <Router>
      <Helmet>
        <title>SearchTube</title>
      </Helmet>
      <Switch>
        <Route exact path="/" component={VideoSearch} />
        <Route exact path="/video" component={VideoCard} />
      </Switch>
    </Router>
  );
}

export default App;
