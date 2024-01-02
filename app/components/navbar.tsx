'use client';

import React from 'react'


const Navbar = () => {
  return (
    <nav className="bg-[#1e1919] text-white rounded-2xl w-full mx-1">
  <div className='flex justify-between items-center'>

    <div>
      <h1 className='text-4xl w-full p-6 font-bold'>
        CHARU&#127925;
      </h1>
    </div>

    <div className='flex items-center mx-6'>
      
      <ul className='menu menu-horizontal px-0 flex justify-between space-x-4'>
        <li>My Songs</li>
        <li>Login</li>
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar