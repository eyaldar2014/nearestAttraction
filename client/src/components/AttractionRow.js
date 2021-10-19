// import react from 'react'

import react from "react";


const AttractionRow = ({ data, favoritesAction, attractionListByDistance, favoritesList }) => {

  const [btnValue, setBtnValue] = react.useState()


  react.useEffect(()=>{

    if(data.isFavorite) setBtnValue('remove')
    else setBtnValue('add')
 
  },[data, attractionListByDistance, favoritesList])


  const handleClick = () => {
    
    // function for adding or removing from favorites
    favoritesAction(btnValue, data)
  }



  return <>

    <tr>
      <td><b>{data.name}</b></td>
      <td>{data._id}</td>
      <td>{data.address}</td>
      <td>{data.openingHours}</td>
      <td>{data.distance + ' km'}</td>
      <td><a href={data.link}>{data.link}</a></td>
      <td>
        <button onClick={handleClick}>{btnValue}</button>
      </td>
    </tr>

  </>
}


export default AttractionRow;