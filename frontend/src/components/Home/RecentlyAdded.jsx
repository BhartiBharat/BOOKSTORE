import React, { useState,useEffect } from 'react'
import axios from "axios";
import Loader from "../Loader/Loader";


import BookCard from "../BookCard/BookCard"; // Adjust path based on your folder structure


const RecentlyAdded = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
    const fetch=async ()=>{
     const response= await axios.get("https://bookstore-2-bbh6.onrender.com/get-recent-books");
   
     setData(response.data.data);
    };
    fetch();
  },[]);
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
      {!Data && (
        <div className='flex items-center justify-center my-8'>
          <Loader/>{" "}
      </div>)}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data
         && Data.map((items,i)=>
          (<div key={i}>
          <BookCard data={items } />{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded
