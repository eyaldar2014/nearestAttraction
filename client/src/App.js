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

  
  react.useEffect(() => {

    readFavoritesFromLocalStorage()
  }, [])

  const getLocationData = (currentLocation) => {

    return setLocationData(currentLocation)
  }

  // update between Attractions and Favorites components
  const getFavorites = (data) => {

    return setFavorites(data)
  }

  // read local storage and update favorites
  const readFavoritesFromLocalStorage = () => {

    let myFavorites = JSON.parse(localStorage.getItem('favorites'))    
    // console.log('myFavorites', myFavorites)

    if (myFavorites) setFavorites(myFavorites)
    return true
  }


  return (
    <div>
      <Router>

        <Navbar className={'navbar'} />

        <Switch>

          <Route exact path="/favorites">
            <Favorites locationData={locationData} favorites={favorites} getFavorites={getFavorites} />
          </Route>

          <Route exact path="/attractions">
            <Attractions locationData={locationData} favoritesList={favorites} getFavorites={getFavorites} />
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
