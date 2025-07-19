const express=require("express");
const app=express();
require("./conn/conn");
const cors=require("cors");
require("dotenv").config();

const User=require("./routes/user")
const Books=require("./routes/book");
const Favourite=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");
app.use(cors());
app.use(express.json());


//routes

app.use("/",User);
app.use("/",Books);
app.use("/",Favourite);
app.use("/",Cart);
app.use("/",Order);

//creating portg
app.listen(process.env.PORT,()=>{
    console.log(`server started at port ${process.env.PORT}`);
})