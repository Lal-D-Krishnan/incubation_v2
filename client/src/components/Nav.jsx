import React, { useContext, useState } from 'react'
import Button from './Button'
import { AppContext } from '../Context/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';


const Nav = () => {

  const { appContext, setAppContext } = useContext(AppContext)
  const navigate =  useNavigate()


  let Links = [
    {name:"HOME",link:"/"},
    {name:"APPLY",link:"/application"},
    {name:"STATUS",link:"/"},
    
  ]
  
  let [open,setOpen] = useState(false);
  return (
    <>
      <div className='shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
            <span className='text-3xl text-indigo-600 mr-1 pt-2'>
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            Incubation Room Booking
          </div>
          <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6
          cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12
          absolute md:static bg-white md:z-auto z-[-1]
          left-0 w-full md:w-auto md:pl-0 pl-9 transition-all 
          duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'} md:opacity-100 `}>
            {
              
              Links.map((link)=>(
            
              //  if (localStorage.getItem('userinfo') : " USERNAME"
                <li key={link.name} className='md:ml-8 
                text-xl md:my-0 my-7'> 
                  <a href={link.link} className='text-gray-800
                   hover:text-gray-400 duration-500'>{link.name}</a>
                </li>
              ))
            }

            {
              JSON.parse(localStorage.getItem("userInfo"))?.name  ?

              <>
              <li key={''} className='md:ml-8 
                text-xl md:my-0 my-7 font-semibold pointer-events-none'> 
                  <a href={'#'} className='text-gray-800
                   hover:text-gray-400 duration-500'>{JSON.parse(localStorage.getItem("userInfo")).name }</a>
                </li>

              <button className= 'bg-gray-900 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'
                  onClick={()=>{
                    localStorage.removeItem("userInfo");
                    navigate('/');
                  }}>
                          Logout
                </button>
              </>
              :
              <>
              <Button text ={'Login'} />
              <Button text ={'Signup'} />
              </>
            }
            
            
          </ul>
        </div>
      </div>
    </>
  )
}

export default Nav