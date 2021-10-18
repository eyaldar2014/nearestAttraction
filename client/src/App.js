import react from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Attractions from './components/Attractions';



function App() {


  const [locationData, setLocationData] = react.useState()

  const getLocationData = (currentLocation) => {

    return setLocationData(currentLocation)
  }

  return (
    <div>
      <Router>

        <Switch>

          <Route exact path="/attractions">
            <Attractions  locationData={locationData} />
          </Route>

          <Route exact path="/">
            <Home getLocationData={getLocationData} />
          </Route>

        </Switch>

      </Router>

    </div>
  );
}


export default App;
