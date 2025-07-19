import React,{useEffect} from 'react'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import {  Routes,Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from "./pages/Cart";
import Profile from "./pages/Profile"
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth.js';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx';
import Settings from './components/Profile/Settings.jsx';
import AllOrders from './pages/AllOrders.jsx';
import AddBook from './pages/AddBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';

const App = () => {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  })
  return (
    <div>
      
         <Navbar/>

     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/all-books" element={<AllBooks/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/profile" element={<Profile />}>
  {role === "user" ? (
    <>
      <Route index element={<Favourites />} />
      <Route path="settings" element={<Settings />} />
      <Route path="orderHistory" element={<UserOrderHistory />} />
    </>
  ) : role === "admin" ? (
    <>
      <Route index element={<AllOrders />} />
      <Route path="add-book" element={<AddBook />} />
    </>
  ) : null}
</Route>

      <Route  path="/signUp" element={<SignUp/>}/>
      <Route  path="/logIn" element={<LogIn/>}/>
      <Route  path="/updateBook/:id" element={<UpdateBook/>}/>
      <Route path="/view-book-details/:id" element={<ViewBookDetails />}/>

      
     </Routes>
      

      <Footer/>
      
     
      
      
    
      
    </div>
  )
}

export default App;