import react from "react";
import { Link } from 'react-router-dom';

import AttractionRow from './AttractionRow'

const Favorites = ({ favorites, getFavorites, locationData }) => {


  const [favoritesList, setFavoritesList] = react.useState(favorites)

  const [toSortFavorites, setToSortFavorites] = react.useState(true)


  react.useEffect(() => {

    // optional : sort favorite list by distance :
    // 1. calculate distance from location
    // 2. sort by distance
    if (favoritesList.length > 1 && toSortFavorites) {
      sortFavorites()
    }

  }, [favorites, favoritesList])

  const sortFavorites = () => {

    let temp = [...favoritesList]

    temp.forEach(element => {
      element.distance = calculateDistance(element.latitude, element.longitude)
    });

    temp.sort((a, b) => {
      return a.distance - b.distance
    })

    setFavoritesList(temp)
    setToSortFavorites(false)
    return true

  }

  // copied from attractions - could be shared from outside controller / located in app.js for better practice and future updates
  const calculateDistance = (lat, lon) => {

    if (!locationData) return 0

    const { longitude, latitude } = locationData

    const lon1 = lon * Math.PI / 180;
    const lon2 = longitude * Math.PI / 180;
    const lat1 = lat * Math.PI / 180;
    const lat2 = latitude * Math.PI / 180;


    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers
    let r = 6371;

    return Math.round(c * r)
  }

  // remove from favorites & update local storage
  const favoritesAction = (action, data) => {

    let newFavorites = [...favoritesList]

    let favoritesIndex = newFavorites.findIndex(x => x._id === data._id)
    newFavorites.splice(favoritesIndex, 1)

    setFavoritesList(newFavorites)

    // send updated favorites to app.js, and from there to attractions list
    getFavorites(newFavorites)

    // update local storage
    localStorage.setItem("favorites", JSON.stringify(newFavorites))

    return true
  }


  return <>

    <h1>favorites</h1>

    <button className={'right back'}><Link to="/attractions" >back to attractions</Link></button>


    <div>
      {
        favorites.length < 1 ? null :
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Address</th>
                <th>Opening Hours</th>
                <th>Distance from User</th>
                <th>Link</th>
              </tr>
              {
                favoritesList.map((att, index) => {
                  return <AttractionRow data={att} key={index} favoritesAction={favoritesAction} favoritesList={favoritesList} />
                })
              }


            </tbody>
          </table>
      }
    </div>



  </>
}


export default Favorites;