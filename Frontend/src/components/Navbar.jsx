import React from 'react'
import { Link,useNavigate  } from 'react-router-dom'


const Navbar = () => {
  const navigate=useNavigate();
  const isLoggedIn=localStorage.getItem("authtoken")
  const handleLogout=(params) => {
    localStorage.removeItem("authtoken")
    navigate("/login")
  }
  
  return (
    <nav className='flex bg-black text-white justify-between p-3 px-5'>
        <div className="logo">
            <h2 className='text-3xl'>INoto</h2>
        </div>
        <ul className='flex gap-4 items-center text-xl'>
            <Link to={"/"} className='hover:text-gray-400'><li>Home</li></Link>
            <Link to={"/about"} className='hover:text-gray-400'><li>About</li></Link>
            {!isLoggedIn && <Link to={"/signup"} className='hover:text-gray-400'><li>Signup</li></Link>}
            {
              isLoggedIn?( <li className='hover:text-gray-400 hover:cursor-pointer'onClick={handleLogout}>Logout</li> ):(
                <Link to={"/login"} className='hover:text-gray-400'><li>login</li></Link>
              )
            }
        </ul>
    </nav>
  )
}

export default Navbar
