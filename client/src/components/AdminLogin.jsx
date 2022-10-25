import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const admin = {
        email:'admin@admin.com',
        password:'123456'
    }
    
    useEffect(() => {
        const adminInfo = localStorage.getItem("click");
        if (adminInfo) {
          // setShowuser(c=>!c)
        //   setAppContext({ ...appContext, showlogin:false ,showuser: true, list:['hello change','hello1'] })
          navigate('/admin')

        }else{
            setEmail('')
            setPassword('')
            navigate('/adminlogin')
        }
      }, [])



    function handleSubmit(e){
        e.preventDefault();
        console.log(admin.email, admin.password);
        if ((email == admin.email) && (password == admin.password)){
            // console.log(admin);
            // localStorage.setItem("adminInfo", JSON.stringify(admin));
            localStorage.setItem('click', JSON.stringify(admin))
            navigate('/admin')
        }else{
            navigate('/adminlogin')
        }
    }

 


  return (
    <div className='flex items-center justify-center h-screen'>
   

    <div className='bg-gray-800 flex flex-col justify-center rounded-lg'>
        <form className='max-w-[400px] w-full mx-auto bg-green-300 p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
            <h2 className='text-4xl dark:text-white font-bold text-center'>Admin login</h2>
                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Email</label>
                        <input className='rounded-lg bg-pink-100 mt-2 p-2 focus:border-blue-500 focus:bg-trueGray-700 focus:outline-none' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email' type="text" />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Password</label>
                        <input className='rounded-lg bg-pink-100 mt-2 p-2 focus:border-blue-500 focus:bg-trueGray-700 focus:outline-none'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        name='password' type="password" />
                    </div>
                    
                    <button onClick={handleSubmit}  className='w-full my-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-400 hover:to-blue-700  text-white font-semibold rounded-lg'>Sign In</button>
        </form>
    </div>
    </div>
  )
}

export default AdminLogin