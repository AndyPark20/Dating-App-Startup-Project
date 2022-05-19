require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const jsonMiddleWare = require("express-json");

app.use(cors());
app.use(jsonMiddleWare());


//Server to by pass CORS issue with itsthisforthat API to retrieve business idea data.
app.get("/api/bizIdea", async (req, res, next) => {
  try {
    const data = await fetch("http://itsthisforthat.com/api.php?json");
    const dataResult = await data.json();
    if(dataResult){
      res.status(201).json(dataResult)
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
