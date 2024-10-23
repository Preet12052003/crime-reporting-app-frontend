import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='p-4 text-lg bg-[#ffa368] text-white font-bold flex justify-between'>
      <Link to={'/'}>Anveshan</Link>
      <div className='flex gap-3'>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
      </div>
    </header>
  )
}

export default Header