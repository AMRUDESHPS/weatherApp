
const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index", {weather: null, err: null});
});

app.get("/weather",async (req, res)=>{
    const city = req.query.city;
    const APIKey = "******************";

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    let weather;
    let err = null;

    try{
        const response = await axios.get(APIUrl);
        weather = response.data;
        console.log("its info : "+weather);
    }catch(err){
        weather = null;
        err = "Error, Please try again";
    }
    res.render("index", {weather, err});
});

app.listen("3000",()=>{
    console.log("App/Server running on port 3000");
})
