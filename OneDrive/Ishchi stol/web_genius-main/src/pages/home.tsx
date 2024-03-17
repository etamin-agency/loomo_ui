import React from 'react'
import { FaSearch, FaRegUser,FaShoppingCart } from "react-icons/fa";


const Home: React.FC = () => {
  return (
    <div className='w-[full] h-[100vh] bg-[#285A43]  box-border pt-5 pb-5 pr-5 '>
      <div className='w-[full] h-[680px] bg-white rounded-[50px] p-16'>
        <div className='w-full h-[70px] flex items-center justify-between' >
          <input type="text" placeholder='Search' className='w-[80%] h-[55px] border-2 border-green-800 rounded-[20px] ps-3' />

          <div className='flex gap-10 items-center'>
            <FaRegUser className='text-[25px]'/>
            <div className='w-[55px] h-[55px] bg-[#285A43] flex items-center justify-center rounded-xl'>
              <FaShoppingCart className='text-[25px] text-[white]' />
            </div>
          </div>
      

        </div>
      <h1>Cart</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque nostrum repudiandae veniam quis officiis blanditiis tempore optio incidunt? Doloremque porro quo, tenetur iste ipsum iure fugiat aperiam beatae quam quos.</p>
      </div>
      
    </div>
  )
}

export default Home;