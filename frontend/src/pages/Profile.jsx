import React, { useEffect } from 'react'
import Sidebar from "../components/Profile/Sidebar"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import { useState } from 'react';
import MobileNav from '../components/Profile/MobileNav';


  //const isLoggedIn=useSelector();
  import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [Profile, setProfile] = useState(null);
  const navigate = useNavigate(); // Hook to redirect if unauthorized

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (!token || !id) {
      console.log("No token found. Redirecting to login.");
      navigate("/login"); // 👈 Redirect to login page
      return;
    }

    const headers = {
      authorization: `Bearer ${token}`,
      id: id,
    };

    console.log("Fetching user information...");
    console.log("Headers being sent:", headers);

    try {
      const response = await axios.get("http://localhost:1000/get-user-information", { headers });
      console.log("Response received:", response.data);

      if (response.status === 200 && response.data) {
        setProfile(response.data);
      } else {
        console.error("Invalid response:", response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.response ? error.response.data : error.message);
    }
  };

  fetchUser();
}, [navigate]);

  
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex col md:flex-row 
     py-8 gap-4 text-white'>
    {!Profile && (<div  className='w-full h-[100%] flex items-center justify-center'>
       <Loader/>
    </div>
   ) }
    {
      Profile &&( <>
      <div className='w-full md:w-1/6 h-auto lg:h-screen sidebar'>
        <Sidebar data={Profile}/>
        <MobileNav/>
        </div>
        <div className='w-full md:w-5/6'>
        <Outlet/>  
          </div></>)
    }
      
    </div>
  );
};

export default Profile