// import react from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Attractions from './components/Attractions';


function App() {

  return (
    <div>
      <Router>

        <Switch>
          <Route exact path='/attractions' component={Attractions} />
          <Route exact path='/' component={Home} />
        </Switch>

      </Router>

    </div>
  );
}


export default App;
