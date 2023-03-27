const { response } = require("express")
const express = require("express")

const app=express()
const https=require("https")
const bodyParser=require("body-parser")


app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html") 
})

app.post("/",(req,res)=>{
    let query=req.body.cityName
    let key ="35deabced749ce34686ceaf0e43d41f0"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&unit=metric&appid="+key
    https.get(url,(response)=>{
    response.on("data",(data)=>{
        const weatherData = JSON.parse(data)
        let temp = weatherData.main.temp
        let desc= weatherData.weather[0].description
        let ic = weatherData.weather[0].icon
        res.write("<p> The weather is currently "+desc+"</p>")
        res.write("<h1> Tempreature is "+query+" is "+temp+"</h1>") 
        res.write("<img src='http://openweathermap.org/img/wn/"+ ic+ "@2x.png'>")
        res.send()      
})
})
})




app.listen(3000,()=>{
    console.log("Sever in on 3000")
    
})