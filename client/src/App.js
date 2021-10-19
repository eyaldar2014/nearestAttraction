import react from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Attractions from './components/Attractions';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';



function App() {


  const [locationData, setLocationData] = react.useState()
  const [favorites, setFavorites] = react.useState([])

  const getLocationData = (currentLocation) => {

    return setLocationData(currentLocation)
  }

  const getFavorites = (data) => {

    return setFavorites(data)
  }

  
  return (
    <div>
      <Router>

        <Navbar className={'navbar'} />

        <Switch>

          <Route exact path="/favorites">
            <Favorites favorites={favorites} getFavorites={getFavorites} />
          </Route>

            <Route exact path="/attractions">
              <Attractions locationData={locationData} getFavorites={getFavorites} favoritesList={favorites} />
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
