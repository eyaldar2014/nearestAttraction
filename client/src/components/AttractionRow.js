// import react from 'react'


const AttractionRow = ({ data }) => {
  

  return <>

    <tr>
      <td><b>{data.name}</b></td>
      <td>{data._id}</td>
      <td>{data.address}</td>
      <td>{data.openingHours}</td>
      <td>{data.distance + ' km'}</td>
      <td><a href={data.link}>{data.link}</a></td>
    </tr>

  </>
}


export default AttractionRow;