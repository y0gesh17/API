const express = require("express");
const feedRoutes=require("./routes/feed");
const bodyParser = require("body-parser");
const mongoose =require('mongoose');
const path = require('path'); 
const app=express();
app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname,'images')));



mongoose
       .connect('mongodb://localhost:27017/messages?retryWrites=true')
       .then(result=>{
         app.listen(8080);
         console.log("Data base Connected");

        })
       .catch(err=>{
         console.log(err);
        });

app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin","codepen.io"); // here you can specify a specific domain or * to include all
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    next();
  });
  
  
app.use('/feed',feedRoutes);
app.use((error,req,res,next)=>{
  console.log(error);
   const status =error.statusCode||500;
  const message=error.message;
  res.status(status).json({message:message});
  });

//app.listen(8080); 