import react from 'react'
import { Link } from 'react-router-dom';


const Home = ({ getLocationData }) => {

  const [loader, setLoader] = react.useState()
  const [location, setLocation] = react.useState()


  // react.useEffect(()=>{},[])

  const getLocation = () => {

    setLoader(true)
    let temp = {}

    // originally wanted to send this request to the server, but nodeJS doesnt have navigator,
    // so its simpler to get it here in react
    navigator.geolocation.getCurrentPosition(function (position) {
      temp.latitude = position.coords.latitude
      temp.longitude = position.coords.longitude

      setLoader(false)
      return setLocation(temp)
    });
  }

  const toAttractionRoute = () =>{

    return getLocationData(location)
  }


  return <>

    <div>
      <h1>Home</h1>
    </div>

    <div>
      {/* can add option to choose location manually in the future*/}
      <h4>press the button to get your location</h4>
      <button onClick={getLocation} >get location</button>
    </div>

    <div>
      {!loader ? null : <span>loading...</span>}
    </div>

    <div>
      {!location ? null : <>

        <div>
          <span>longitude : {location.longitude}</span>
          <br />
          <span>latitude : {location.latitude}</span>
        </div>

        <br />
        <div>
          <h4>press the button to find near attractions</h4>
          <button><Link to="/attractions" onClick={toAttractionRoute} >find near attractions</Link></button>
        </div>

      </>}
    </div>

  </>
}

export default Home;
