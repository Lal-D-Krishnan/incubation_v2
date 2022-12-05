import React, { useEffect, useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { AiOutlineUser,AiOutlineLogout } from 'react-icons/ai';
import { FiMessageSquare} from 'react-icons/fi';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import AdminDash from './AdminDash'
import AdminSeatingView from './AdminSeatingView';
import AdminUsers from './AdminUsersView';

import ASubmittedApplications from './ASubmittedApplications';


const AdminHome = () => {
    const navigate = useNavigate()
    
    const onHandlerAdmin = (text)=>{
    switch(text){
        case 'Logout': 
            localStorage.removeItem('click')
            navigate('/adminlogin')
            break;
        case 'Users':
            navigate('/admin/user')
            break;
        case 'Seating':
            navigate('/admin/approval-req')
            break;
        case 'Dashboard':
            navigate('/admin/dashboard')
            break;
        default: return '#'
    }
    }



    useEffect(() => {
        const adminInfo = localStorage.getItem("click");
        if (adminInfo) {
        //   navigate('/admin')
        }else{
            navigate('/adminlogin')
        }
      }, [])

    // const logoutadmin = ()=>{
    //     localStorage.removeItem("adminInfo")
    // }

    const menus = [
        { name: 'Dashboard', link: '/', icon: MdOutlineDashboard },
        { name: 'Users', link: '/', icon: AiOutlineUser },
        { name: 'Seating', link: '/', icon: FiMessageSquare },
        { name: 'Logout', link: '/', icon: AiOutlineLogout },
    ];

    const [open,setOpen] = useState(true);

    // const [user,setUser] = useState(false);
    // const [seating,setSeating] = useState(false);

    return (
        <section className='flex gap-6'>
            <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4 `}>
                <div className='py-3 flex justify-end'>
                    <HiMenuAlt3
                     size={26} 
                     className='cursor-pointer' 
                     onClick={()=>setOpen(!open)}
                     />
                </div>

                <div className='mt-4 flex flex-col gap-4 realtive'>
                    {
                        menus?.map((menu, i) => (

                            <button onClick={ ()=> onHandlerAdmin(menu?.name)  } 
                            key={i} 
                            className={` ${menu?.margin  && 'mt-5'}
                            group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
                                <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                                <h2 
                                style={{
                                    transitionDelay: `${i+3}00ms`
                                }}
                                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} `} >{menu?.name}
                                </h2>
                                <h2 className={` ${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre
                                 text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 
                                 group-hover:left-14  group-hover:duration-300 group-hover:w-fit`}>
                                    {menu?.name}
                                </h2>
                            </button>
                        ))
                    }
                </div>

            </div>

            <div className="flex flex-col w-full">
                    {/* <Link onClick={()=> navigate('/admin/user')} /> */}
                    {/* <Link onClick={()=> navigate('/admin/seating')} /> */}

                    {/* <AdminDash/> */}
                    {/* <ASubmittedApplications/> */}

                    {/* <AdminSeatingView/> */}
                    {/* <AdminUsersView/> */}

                    <Outlet/>
                    

        {/* ------------------------------------------------------------------------------------------------------------------------------------ */}
        
            </div>

        </section>
    )
}


export default AdminHome