import react from "react";
import { Link } from 'react-router-dom';

import AttractionRow from './AttractionRow'

const Favorites = ({ favorites, getFavorites }) => {


  const [favoritesList, setFavoritesList] = react.useState(favorites)

  react.useEffect(() => {

    // read local storage


  }, [favorites, favoritesList])




  // remove from favorites
  const favoritesAction = (action, data) => {

    let newFavorites = [...favoritesList]

    let favoritesIndex = newFavorites.findIndex(x => x._id === data._id)
    newFavorites.splice(favoritesIndex, 1)

    setFavoritesList(newFavorites)

    // update main list
    getFavorites(newFavorites)

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


// add and remove from this list functionality
// every time update local storage
// mount local storage every restart of the program
// optional : sort favorite list by distance