import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
const SearchBox = () => {
  return (
    <div className='searchBox shadow-sm d-flex align-items-center'>
        <IoSearchSharp className='searchIcon'/>
       <input type="text" placeholder='search here...' />
    </div>
  )
}

export default SearchBox
