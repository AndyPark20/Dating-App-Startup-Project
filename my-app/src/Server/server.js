
require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const jsonMiddleWare = require('express-json');


app.use(cors());
app.use(jsonMiddleWare());


async function test (req,res){
  try{
    const data = await fetch("http://itsthisforthat.com/api.php?json");
    const dataResult = await data.json();
    console.log(dataResult)
  }catch(err){
    console.log(err)
  }
}


test();

app.listen(process.env.PORT,()=>{
  console.log(`express server listening on port ${process.env.PORT}`);
})
