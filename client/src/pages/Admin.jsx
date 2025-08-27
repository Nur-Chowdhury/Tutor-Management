import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Admin() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    (currentUser && currentUser.admin) ?
    <div>
      <div className=' flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
            Admin Panel
      </div>
      <div className=' flex justify-center mt-4 text-xl font-bold'>
        Welcome to Admin Panel!
      </div>
      <div className=' mb-20 flex justify-center text-red-700 text-xl'>
        <span className=' font-bold'>Warning: </span>
        Changes made here will affect the whole system. Therefore operate cautiously!
      </div>
      <div className=' px-24 w-full flex flex-wrap justify-evenly items-center over'>
        <Link to={'/admin/ads'}>
            <div className=' px-2 py-1 bg-blue-500 cursor-pointer text-white text-lg font-medium rounded-lg'>
                Ads
            </div>
        </Link>
        <Link to={'/admin/users'}>
            <div className=' px-2 py-1 bg-blue-500 cursor-pointer text-white text-lg font-medium rounded-lg'>
                Users
            </div>
        </Link>
      </div>
    </div>:
    <div>
      Access Denied!
    </div>
  )
}
