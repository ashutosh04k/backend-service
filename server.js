//JyyWqHDP5Y7pjE3k
//ashutosh19jics022
//mongodb+srv://ashutosh19jics022:JyyWqHDP5Y7pjE3k@cluster0.czv7x.mongodb.net/


const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const cors = require('cors');


mongoose.connect('mongodb+srv://ashutosh19jics022:JyyWqHDP5Y7pjE3k@cluster0.czv7x.mongodb.net/')
.then(()=>{
  console.log("Database connected")
})
.catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT  || 5000;


app.use(
  cors({
    origin: 'http://localhost:5173/',
    methods : ['GET','POST','DELETE','PUT'],
    allowedHeaders : [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',  
    ],
    credentials : true
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, ()=> console.log(`server is now running on port ${PORT}`))