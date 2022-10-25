import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    useEffect(()=>{
      const userInfo =localStorage.getItem("userInfo");
      if(userInfo){
        navigate('/')
      }
    },[])

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log( username+" "+ email + " " + password + " ");

        // console.log(data.get('email'));
        // console.log(data.get('password'));
        console.log("here here");
        const datas = {
          name:username,
          email: email,
          mobile: mobile,
          password: password,
        }
    
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };

        axios.post('/signup', datas,  axiosConfig).then((response)=>{
            console.log('ok post send');
            console.log(response.data);
            // console.log(datas);
          }).then(navigate('/signin'))
          .catch((err)=>{
            console.log(err.message);
          })

    }

  return (
    <div className=" md:container md:mx-auto w-full h-full">
    <div className=' h-full w-full mx-auto my-auto'>
    {/* <div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src={loginImg} alt="" />
    </div> */}

    <div className='grid content-center h-full pt-16 mx-auto container '>
        <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
            <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN UP</h2>
                    
                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Username</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        name='email' type="text" />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Email</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email' type="text" />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Mobile</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
                        name='mobile' type="text" />
                    </div>

                    <div className='flex flex-col text-gray-400 py-2 '>
                        <label htmlFor="">Password</label>
                        <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        name='password' type="password" />
                    </div>
                    
                    <button className='w-full my-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  text-white font-semibold rounded-lg hover:duration-500'>Register </button>
        </form>
    </div>
</div>
</div>
  )
}

export default Signup