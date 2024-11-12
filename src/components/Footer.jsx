import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";


const Footer = () => {
  return (
    <div className=' p-8 pl-16 flex justify-between'>
      <div>
        <h1 className=' font-medium'>Lorem ipsum dolor sit amet, consectetur  <br />adipisicing elit. Mollitia magnam numq <br /> uam aliquid dicta illum minima tem <br />poribus obcaecati </h1>
        <p className=' pt-14'>
            <div className=' font-serif flex gap-5 text-gray-300 '>
                <h5>Privacy Policy</h5>
                <h5> Term of service</h5>
                <h5> Language</h5>
            </div>
        </p>
      </div>
      <div>
        <p>
            <div className=' flex gap-2 font-serif text-gray-300'>
                <h1>Home</h1>
                <span>/</span>
                <h1>Discover</h1>
                <span>/</span>
                <h1>Influence</h1>
                <span>/</span>
                <h1>Release</h1>
            </div>
        </p>
        <div className=' flex gap-5 pt-14 bg'>
            <h1 className=' bg-slate-50 text-black p-1 rounded-lg'><FaInstagram /></h1>
            <h1 className=' bg-slate-50 text-black p-1 rounded-lg'><CiFacebook /></h1>
            <h1 className=' bg-slate-50 text-black p-1 rounded-lg'><BsTwitterX /></h1>
            <h1 className=' bg-slate-50 text-black p-1 rounded-lg'><FaGoogle /></h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
