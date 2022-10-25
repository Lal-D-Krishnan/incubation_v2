import React, { useEffect, useState } from 'react';
import loginImg from '../assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Login = () => {
    const navigate = useNavigate();

    useEffect(()=>{
      const userInfo =localStorage.getItem("userInfo");
      if(userInfo){
        navigate('/')
      }
    },[])

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(email , password);
    
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
  
      let datas = {
        email: email,
        password: password,
      };
  
      datas = JSON.stringify(datas)
      console.log("datas stringifed "+datas);
        
      axios.post('/login', datas, axiosConfig).then((response)=>{
  
        // don't store the object data we need to convert it into object data 
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        
        navigate('/')
  
      })
      .catch((err)=>{
        console.log(err.message);
      })
    }


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={handleSubmit}>
                <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
                        <div className='flex flex-col text-gray-400 py-2 '>
                            <label htmlFor="">Email</label>
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            name='email' type="text" />
                        </div>

                        <div className='flex flex-col text-gray-400 py-2 '>
                            <label htmlFor="">Password</label>
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            name='password' type="password" />
                        </div>
                        
                        <button className='w-full my-5 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  text-white font-semibold rounded-lg'>Sign In</button>
            </form>
        </div>
    </div>
  )
  }
