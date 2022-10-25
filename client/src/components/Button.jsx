import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {onHandler} from '../utils/onHandler'

const Button = ({text}) => {

  const navigate = useNavigate()

  return (
    <button className= 'bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 duration-500'
    onClick={()=>{navigate(onHandler(text))}}>
        {text}
    </button>
  )
}

export default Button