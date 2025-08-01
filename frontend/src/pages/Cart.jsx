import React, { useState, useEffect } from 'react';
//import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const Cart = () => {
  const navigate=useNavigate();
  const [Cart, setCart] = useState([]); // ✅ Initialize as an empty array to prevent undefined errors
  const [Total, setTotal] = useState(0);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Fixed "Token" -> "token"
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://bookstore-2-bbh6.onrender.com/get-user-cart", { headers });
        setCart(res.data.data || []); // ✅ Ensure `data` exists
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [Cart]); // ✅ Remove unnecessary dependency to prevent infinite loop

  // ✅ Function to delete an item from the cart
  const deleteItem = async (bookid) => {
   const response=await axios.put(`https://bookstore-2-bbh6.onrender.com/remove-from-cart/${bookid}`,{},
   {headers})
   alert(response.data.message)
  };
  useEffect(() => {
    if (Cart.length > 0) {
      let total = Cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [Cart]);
  const PlaceOrder=async()=>{
    try {
      const response=await axios.post(`https://bookstore-2-bbh6.onrender.com/place-order`,
        {order:Cart},{headers}
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
      
    } catch (error) {
      console.log(error)
      
    }
  };
  

  return (
    < div className='bg-zinc-900 px-12 h-screen  py-8'>
      
{!Cart &&( 
  <div className='w-full h-[100%] flex items-center justify-center'>
   <Loader/></div>
  )}
      {Cart.length === 0 && (
        <div className='h-screen flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png " alt="Empty Cart" className='lg:h-[50vh]' />
        </div>
      )}

      {Cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
          {Cart.map((items, i) => ( // ✅ Implicit return by removing `{}` 
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.disc.slice(0, 100)}...</p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{items.disc.slice(0, 65)}...</p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{items.disc.slice(0, 100)}...</p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>{items.price}</h2>
                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(items._id)} // ✅ Correct function reference
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}


      {Cart && Cart.length>0 && (
        <div className='mt-4 w-full flex items-center justify-end'> 
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>
            Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} books</h2>
              <h2>Rs.{Total}</h2>
              
              
              </div>
              <div className='w-[100%] mt-3'>


                <button className='bg-zinc-100 roundede px-4 py-2 flex justify-center w-full font-semibold
                hover:bg-zinc' onClick={PlaceOrder}>
                  Place Your Order
                </button>
              </div>
              
              </div></div>
      )}
    </div>
  );
};

export default Cart;
