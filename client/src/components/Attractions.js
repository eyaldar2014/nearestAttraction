import react from 'react'
import AttractionRow from './AttractionRow'
const axios = require('axios')



const Attractions = ({ locationData }) => {

  
  // attraction list will be an object, sorted by attraction types :
  const [attractionListByType, setAttractionListByType] = react.useState()
  // this attraction list will be an array sorted by distance from user location :
  const [attractionListByDistance, setAttractionListByDistance] = react.useState()
  const [arrayOfTypes, setArrayOfTypes] = react.useState()
  const [selected, setSelected] = react.useState('attractionListByDistance')


  react.useEffect(() => {

    getAttractions()

  }, [locationData])


  const getAttractions = async () => {

    try {
      const response = await axios.get('/api/attractions/getAttractionsList')
      const listByTypes = response.data.attractions.data

      // for a list with all the attractions
      let arrayOfAttractions = []
      // types for iterating later on select input
      let arrayOfTypes = []

      for (let group in listByTypes) {
        listByTypes[group].forEach(att => {

          att.distance = calculateDistance(att.latitude, att.longitude)
          arrayOfAttractions.push(att)
        })
        arrayOfTypes.push(group)
      }

      arrayOfAttractions.sort((a, b) => {
        return a.distance - b.distance
      })

      setArrayOfTypes(arrayOfTypes)
      setAttractionListByType(listByTypes)
      setAttractionListByDistance(arrayOfAttractions)
      return true
    }
    catch (error) {
      // modify incase server is not providing data correctly
      console.log(error)
    }
  }

  const calculateDistance = (lat, lon) => {

    const lon1 = lon * Math.PI / 180;
    const lon2 = locationData.longitude * Math.PI / 180;
    const lat1 = lat * Math.PI / 180;
    const lat2 = locationData.latitude * Math.PI / 180;

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

  const handleChange = (e) => {
    
    const current = e.target.value
    if(current !== 'attractionListByDistance' && !attractionListByType[current].sorted){

      attractionListByType[current].sort((a,b)=>{
        return a.distance - b.distance
      })
      attractionListByType[current].sorted = true
    }

    setSelected(current)
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

                { selected === 'attractionListByDistance' ? 
                attractionListByDistance.map((att, index) => {
                  return <AttractionRow data={att} key={index} />
                }) :
                attractionListByType[selected].map((att, index) => {
                  return <AttractionRow data={att} key={index} />
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