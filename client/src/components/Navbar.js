// import react from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {


  return <>

    <div>
      <Link to='/favorites'>
        <button className={'right'} >Favorites</button>
      </Link>

      <Link to='/'>
        <button className={'right'} >Home</button>
      </Link>
    </div>
  </>
}


export default Navbar;