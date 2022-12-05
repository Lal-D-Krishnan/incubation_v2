import React, { useContext, useState } from 'react'
import Button from './Button'
import axios from 'axios';
import Swal from "sweetalert2";
import swal from "sweetalert";

import { AppContext } from '../Context/AppContext';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { AuthPageContext } from '../Context/AuthPageContext';
// import HomePage from '../pages/HomePage';


const Nav = () => {
  const { appStatus,setAppstatus}=useContext(AuthPageContext)


  const { appContext, setAppContext } = useContext(AppContext)
  const navigate =  useNavigate()

  // const [application, showApplication ] = useState(false)
  // const [status, showStatus ] = useState(false)
  // const [home, showHome] = useState(false)

  let Links = [
    {name:"HOME",link:"/"},
    {name:"APPLY",link:"/application"},
    {name:"STATUS",link:"/"},
  ]

  const onHandler = (text)=>{
    switch(text){
        case 'HOME': 
            navigate('/home')
            break;
        case 'APPLY':
            if (localStorage.getItem('userInfo')) {
              navigate('/application')
              // if(appStatus){
              //   navigate('/status')
              // }else{
              //   navigate('/application')
              // }
            }else{
              navigate('/signin')
            }
            break;
        case 'STATUS':
            if (localStorage.getItem('userInfo')){
              navigate('/status')
            }else{
              navigate('/signin')
            }
            break;
            
        default: return '#'
    }
    }

  // let Linkss = [
  //   {name:"DASHBOARD",link:"/"},
  //   {name:"STATUS",link:"/application"},
  //   {name:"PROFILE",link:"/"},
    
  // ]
  
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
                <li key={link.name}   className='md:ml-8 
                text-xl md:my-0 my-7'> 
                  
                  <p onClick={()=> onHandler(link.name)}   className='text-gray-800
                   hover:text-gray-400 duration-500 cursor-pointer'>{link.name}</p>
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

                    Swal.fire({
                      title: "Do you Want to  Logout?",
                      showDenyButton: true,
                      confirmButtonText: "yes",
                      denyButtonText: "No",
                      customClass: {
                        actions: "my-actions",
                        confirmButton: "order-2",
                        denyButton: "order-3",
                      },
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        await axios.get("/logout").then((response) => {
                          try {
                            if (response.data.logout) {
                              localStorage.removeItem("userInfo");
                              navigate("/");
                            }
                          } catch (e) {
                            swal("error Occured");
                          }
                        });
                
                        navigate("/");
                      }
                    });

                    // localStorage.removeItem("userInfo");
                    // navigate('/');
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

       <Outlet/> 
    </>
  )
}

export default Nav