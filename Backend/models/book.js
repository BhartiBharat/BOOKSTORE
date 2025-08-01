const mongoose=require("mongoose");
const book=new mongoose.Schema({
   url:{
    type:String,
    required:true,
   },
   title:{
    type:String,
    required:true,
   },
   author:{
    type:String,
    required:true,
   },
   price:{
    type:Number,
    required:true,
   },
   
   disc:{
    type:String,
    required:true,
   },

   language:{
    type:String,
    require:true,
   },


},{timestamps:true}
);module.exports=mongoose.model("books",book);