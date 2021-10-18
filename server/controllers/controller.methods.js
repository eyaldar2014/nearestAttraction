
const MethodsController = function () {

  this.getLocation = (req, res) => {

    let location = {}
    // location.latitude =  .latitude
    // location.longitude = geolocationCoordinatesInstance.longitude
    // console.log('here', location)

    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      console.log(lat)
    })

      return location
  }

}


module.exports = MethodsController