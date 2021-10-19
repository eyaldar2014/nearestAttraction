import react from 'react'
import AttractionRow from './AttractionRow'
const axios = require('axios')



const Attractions = ({ locationData, getFavorites, favoritesList }) => {


  // this attraction list will be an array sorted by distance from user location :
  const [attractionListByDistance, setAttractionListByDistance] = react.useState()

  const [arrayOfTypes, setArrayOfTypes] = react.useState()

  const [selected, setSelected] = react.useState('attractionListByDistance')

  const [favorites, setFavorites] = react.useState(favoritesList)

  const [toUpdateFavorites, setToUpdateFavorites] = react.useState(true)


  react.useEffect(() => {

    // get attractions list from db
    if (!attractionListByDistance) {
      getAttractions()
    }

    // update favorites after visiting favorites route
    if (toUpdateFavorites && favoritesList && attractionListByDistance) {
      updateFavorites()
    }


  }, [locationData, favoritesList, attractionListByDistance])


  // update favorites after visiting favorites route
  const updateFavorites = () => {

    let temp = [...attractionListByDistance]

    favoritesList.forEach(f => {

      const index = attractionListByDistance.findIndex(x => x._id === f._id)
      temp[index].isFavorite = true
    })

    setAttractionListByDistance(temp)
    setToUpdateFavorites(false)

    return true
  }

  // get attractions list from db
  const getAttractions = async () => {

    try {
      const response = await axios.get('/api/attractions/getAttractionsList')
      // array of unsorted attractions :
      const arrayOfAttractions = response.data.attractions.data
      // types for iterating later on select input
      let arrayOfTypes = []

      arrayOfAttractions.forEach(element => {
        if (arrayOfTypes.findIndex(x => x === element.type) === -1) {
          arrayOfTypes.push(element.type)
        }

        element.distance = calculateDistance(element.latitude, element.longitude)
      });


      arrayOfAttractions.sort((a, b) => {
        return a.distance - b.distance
      })

      setArrayOfTypes(arrayOfTypes)
      setAttractionListByDistance(arrayOfAttractions)
      return true
    }
    catch (error) {
      // modify incase server is not providing data correctly or any other issue
      console.error(error)
    }
  }

  const calculateDistance = (lat, lon) => {

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

  // for select tag
  const handleChange = (e) => {

    // const current = e.target.value

    setSelected(e.target.value)
  }

  // by attraction type user's selection
  const filterAttractions = () => {

    let mapped = attractionListByDistance.filter(x => {
      if (selected !== 'attractionListByDistance') return x.type === selected
      else return attractionListByDistance
    })

    return mapped
  }

  // add or remove from favorites
  const favoritesAction = (action, data) => {

    let newFavorites = [...favorites]
    let temp = [...attractionListByDistance]
    let index

    if (action === 'add') {
      index = temp.findIndex(x => x._id === data._id)
      temp[index].isFavorite = true

      newFavorites.push(temp[index])
    }
    else {
      index = temp.findIndex(x => x._id === data._id)
      temp[index].isFavorite = false

      let favoritesIndex = newFavorites.findIndex(x => x._id === data._id)
      newFavorites.splice(favoritesIndex, 1)
    }

    // update favorites
    getFavorites(newFavorites)
    setFavorites(newFavorites)
    setAttractionListByDistance(temp)
    return true
  }


  return <>

    <div>
      <h1>Nearest Attractions</h1>
    </div>

    <br />

    <div>
      {!locationData ? <span>get your location first</span> : <>

        <div>
          {!attractionListByDistance ? null : <>

            <div>
              <label htmlFor="type">Choose attraction type : </label>
              <select name="type" id="type" value={selected} onChange={handleChange}>
                <option value="attractionListByDistance">כל האטרקציות</option>
                {
                  arrayOfTypes.map((type, index) => {
                    return <option value={type} key={index}>{type}</option>
                  })
                }
              </select>
            </div>

            <br />

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
                  // check if attractionListByDistance already all set before displaying to the user
                  !attractionListByDistance ? null :
                    filterAttractions().map((att, index) => {
                      return <AttractionRow data={att} key={index} favoritesAction={favoritesAction} attractionListByDistance={attractionListByDistance} />
                    })
                }

              </tbody>
            </table>
          </>}
        </div>
      </>}
    </div>

  </>
}


export default Attractions;