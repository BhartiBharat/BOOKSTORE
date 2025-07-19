import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn);
  const role= useSelector((state)=>state.auth.role);
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://bookstore-2-bbh6.onrender.com/get-book-by-id/${id}`);

      setData(response.data.data)
    };
    fetch();
  }, []);
  const headers={id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const handelFavourite=async ()=>{
    const response=await axios.put("https://bookstore-2-bbh6.onrender.com/add-book-to-favourite",{},{ headers});
    alert(response.data.message);
  };
  const handleCart = async () => {
    console.log("Stored ID:", localStorage.getItem("id"));
    console.log("Stored Token:", localStorage.getItem("token"));
  
    if (!localStorage.getItem("token")) {
      alert("Authentication error: No token found");
      return;
    }
  
    try {
      const response = await axios.put("https://bookstore-2-bbh6.onrender.com/add-to-cart", {}, { headers });
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add to cart");
    }
  };

  const deleteBook=async ()=>{
     const response=await axios.delete("https://bookstore-2-bbh6.onrender.com/delete-book",  { headers });
     alert(response.data.message);
     navigate("/all-books")
  }
  
  return (
    <>
      {Data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>
          <div className=' w-full lg:w-3/6 '>
            {" "}

            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              {" "}
              <img src={Data.url} alt="Book Cover"
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
             {isLoggedIn ===true && role=== "user" &&
              (<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                <button className="bg-white  rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-ceneter justify-center"
                 onClick={handelFavourite}
                 ><FaHeart />
                 <span className="ms-4  block lg:hidden">Favourites</span>
                 </button>
                <button className="text-white rounded mt-8 md:mt-0  lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center"
                 onClick={handleCart}><FaShoppingCart />
                <span className="ms-4  block lg:hidden">Add to Cart</span></button>
              </div>)}

              {isLoggedIn ===true && role=== "admin" &&
              (<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                <Link to={`/updateBook/${id}`} className="bg-white  rounded lg:rounded-full text-3xl p-3 flex items-ceneter justify-center"><FaEdit />
                 <span className="ms-4  block lg:hidden">Edit</span>
                 </Link>
                <button className="text-red-500 rounded mt-8 md:mt-0  lg:rounded-full text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center"
                onClick={deleteBook}><MdOutlineDelete />
                <span className="ms-4  block lg:hidden">Delete Book</span></button>
              </div>)}

</div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            <h1 className="text-4xl text-zinc-300 font-semibold">{Data?.title || "No Title"}
            </h1>
            <p className=" text-zinc-400 mt-1">By {Data?.author || "Unknown Author"}</p>
            <p className=" text-zinc-500 mt-4 text-xl"> {Data?.disc || "No Description Available"}</p>
            <p className=" flex mt-4 items-center justify-start text-zinc-400"><GrLanguage
              className="me-3" /> {Data?.language || "Unknown Language"}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price:{Data?.price ? `$${Data.price}` : "Not Available"}
              {" "}</p>

          </div>
        </div>
      )}
      {!Data && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader /></div>}
    </>
  )

}

export default ViewBookDetails;
