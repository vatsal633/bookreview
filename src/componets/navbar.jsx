import React, { useEffect, useState } from 'react'
import Dropdown from './dropdown'
import { Link, Navigate } from 'react-router-dom'
import { FaRegUserCircle, FaSearch } from 'react-icons/fa'
import { CiUser } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";

const navbar = () => {
  const [Token, setToken] = useState(false)
  const [username, setUsername] = useState("")


  useEffect(() => {
    try {
      const storedToken = JSON.parse(localStorage.getItem("token"))
      if (storedToken) {
        setToken(true)
        setUsername(storedToken.name)
      }
      else {
        setToken(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <>
      <div className='bg-white shadow-neutral-700 shadow-2xl p-5 flex justify-between items-center'>
        <div className=''>
          <Link to='/'>
            <span className='text-2xl font-bold '>Book</span>
            <span className='text-2xl font-bold text-green-500'>Verse</span>
          </Link>
        </div>


        <div className='flex gap-3 '>
          <ul className='flex gap-2 text-lg items-center'>
            <Link to='/'>
              <li className=''>Home</li>
            </Link>
            <Link to="/books">
              <li className=''>
                Browse
              </li>
            </Link>
            <Link to='/admin'>
              <div className='flex flex-col items-center'>
                <GrUserAdmin size={20} />
                <span>Admin</span>
              </div>
            </Link>
          </ul>
        </div>

        <div className={`${Token ? 'hidden' : 'block'}`}>
          <Link to='/login' className={`${Token ? 'hidden' : 'inline'}`}>
            <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
          </Link>

          <Link to='/signin' className={`${Token ? 'hidden' : 'inline'}`}>
            <button type="button" className="cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">SignIn</button>
          </Link>


        </div>

      {Token&&(<Link to={`/${username}/profile`} className='flex flex-col items-center'>
          <CiUser size={35} className='cursor-pointer' />
          <span className='text-indigo-600 font-bold'>{username}</span>
        </Link>)}
        
      </div>
    </>
  )
}

export default navbar