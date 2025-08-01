import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6"; 
import { Link } from 'react-router-dom';
import {IoOpenOutline} from "react-icons/io5"
import { FaCheck } from 'react-icons/fa';
import SeeUserData from './SeeUserData';


const AllOrders = () => {
  const[AllOrders,setAllOrders]=useState();
  const [Options,setOptions]=useState();
   const [Values,setValues]=useState({status:" "});

    const [userDiv,setuserDiv]=useState("hidden");
    const [userDivData,setuserDivData]=useState("hidden");

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get("https://bookstore-2-bbh6.onrender.com/get-all-orders",
        {headers }
      );
      setAllOrders(response.data.data);
    
    };
    fetch()
  },[AllOrders])
  const change = (e) => {
    const {value}=e.target;
    setValues({status:value});
   
    // You can update the state or send a request to update the order status
  };
  const submitChanges=async(i)=>{
    const id=AllOrders[i]._id;
    const response=await axios.put(`https://bookstore-2-bbh6.onrender.com/update-status/${id}`,
      Values,{headers}
    );
    alert(response.data.message);
  }

 
  AllOrders && AllOrders.splice(AllOrders.length-1,1);
  return (
    <>

    {!AllOrders &&( <div className='h-[100%] flex items-center justify-center'>{" "}<Loader/>
    {" "}
    </div>)}


    {AllOrders && AllOrders.length>0 && (


      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
      All Orders
    </h1>
    <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
      <div className='w-[3%]'>
        <h1 className='text-center'>Sr.</h1>
      </div>
      <div className='w-[40%] md:w-[22%]'>
        <h1 className=''>Books</h1>
      </div>
      <div className='w-0 md:w-[45%] hidden md:block'>
        <h1 className=''>Description</h1>
      </div>
      <div className='w-[17%] md:w-[9%]'>
        <h1 className=''>Price</h1>
      </div>
      <div className='w-[30%] md:w-[16%]'>
        <h1 className=''>Status</h1>
      </div>
      <div className='w-[10%] md:w-[5%]'>
        <h1 className=''><FaUserLarge/></h1>
      </div>
    
      </div>
    {AllOrders.map((items,i)=> (<div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
      <div className='w-[3%]'>
        <h1 className='text-center'>{i+1}</h1>
      </div>
      <div className='w-[40%] md:w-[22%]'>
        <Link to={`/view-book-details/${items.book.id}`}
        className='hover:text-blue-300'>
          {items.book.title}
        </Link>

      </div>
      <div className='w-0 md:w-[45%] hidden md:block'>
        <h1 className=''>{items.book.disc.slice(0,50)}...</h1>

      </div>

      <div className="w-[17%] md:w-[9%]">
        <h1 className=''>Rs {items.book.price}</h1>
      </div>

      <div className="w-[30%] md:w-[16%]">
        <h1 className='font-semibold'>
          <button className=' hover:scale-100 transition-all duration-all duration-300'onClick={()=>setOptions(i)}>
            {items.status ==="Order placed" ?(
              <div className='text-yellow-500'>{items.status}</div>
            ): items.status ==="canceled" ?(
              <div className='text-red-500'>{items.status}</div>
            ):(
              <div className='text-green-500'>{items.status}</div>
            )}
            </button>
           
            <div className={`${Options ===i ? " flex": "hidden"}`}>
            <select
  name="status"
  id=""
  className="bg-zinc-700 text-white border border-gray-500 rounded px-2 py-1"
  onChange={change}
  value={Values.status}
>

  {[
    "order placed",
    "out for delivery",
    "Delivered",
    "canceled",
  ].map((items,i)=>(
    <option value={items} key={i}>
      {items}
    </option>

 ))}
</select>
<button className='text-green-500 hover:text-pink-600 mx-2'
onClick={()=>{
  setOptions(-1);
  submitChanges(i);
}}>
  <FaCheck/>
</button>
</div>
            
            </h1>
      </div>

      <div className='w-[10%] md:w-[5%]'>
        <button
         className='text-xl hover:text-orange-500'
         onClick={()=>{
          setuserDiv("fixed");
          setuserDivData(items.user);
         }}>
          <IoOpenOutline/>
         </button>
      </div>
</div>
))}
    </div>
  )}


{userDivData && (
  <SeeUserData
  userDivData={userDivData}
  userDiv={userDiv}
  setuserDiv={setuserDiv}/>
)}

    </>
  );
}
;
export default AllOrders
