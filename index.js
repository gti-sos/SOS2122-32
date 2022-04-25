const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/19904658/UVyoVdQr";

const Datastore = require("nedb");


//######################   API Rafael Molino Alvarez  ###############################//
const backendRma = require("./src/back/rafmolalvAPI/indexRma")
const backendRmaV2 = require("./src/back/rafmolalvAPI/indexRmaV2")
db_repeaters = new Datastore();

backendRma.register(app,db_repeaters);
backendRmaV2.register(app,db_repeaters);

//######################   API Javier Hidalgo García  ###############################//
const backendJHG = require("./src/back/javhidgarAPI/indexJHG.js")
db_housework = new Datastore();
backendJHG(app,db_housework);

//######################   API Sergio García Blanco  ###############################//
app.get(BASE_API_URL+ "/ending-stats/docs",(req,res)=>{
    res.redirect(API_DOC_PORTAL); 

});

var endingStats = [];

app.get(BASE_API_URL+"/ending-stats", (req,res)=>{
    res.send(JSON.stringify(endingStats,null,2));
});

app.get(BASE_API_URL + "/ending-stats/loadInitialData", (req, res)=>{
    var iniData = [
        {
            country:"Albanian",
            year : 2011,
            women : 94.400,
            men : 91.7,
            average : 93.050
    
        },
    
        {
            country:"Chile",
            year : 2015,
            women : 96.800,
            men : 97.1,
            average : 96.950
    
        },
    
        {
            country:"Belgium",
            year : 2013,
            women : 98.3,
            men : 98.5,
            average : 98.4
    
        },
    
        {
            country:"Ireland",
            year : 2016,
            women : 100.400,
            men : 99,
            average : 99.700
    
        },
    
        {
            country:"Argentina",
            year : 2013,
            women : 101.200,
            men : 102.1,
            average : 101.650
        }
    ];
    iniData.forEach((e) => {
        endingStats.push(e);
    });
    res.send(JSON.stringify(endingStats,null,2));

});

app.get(BASE_API_URL+ "/ending-stats",(req,res)=>{
    res.send(JSON.stringify(endingStats,null,2)); 

});
app.get(BASE_API_URL+"/ending-stats/:country", (req,res)=>{
    var endingCountry = req.params.country;
    filteredEnding = endingStats.filter((ending)=>{
        return (ending.country == endingCountry);
    });

    if(filteredEnding == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredEnding[0],null,2));
    }
});
function error(ending){
    return (Object.keys(ending.body).length != 5 ||
    ending.body.country == null ||
    ending.body.year == null ||
    ending.body.women == null ||
    ending.body.men == null ||
    ending.body.average == null);
}

app.post(BASE_API_URL+ "/ending-stats",(req,res)=>{
    if (error(req)){
        res.sendStatus(400, "BAD REQUEST")
    }
    else {
        filteredEnding = endingStats.filter((ending) => {
            return (ending.country == req.body.country
                && ending.year == req.body.year
                && ending.women == req.body.women
                && ending.men == req.body.men
                && ending.average == req.body.average);
        });
        
        existente = endingStats.filter((ending) => {
            return (ending.year == req.body.year && ending.country == req.body.country);
        })

        if (existente != 0){
            res.sendStatus(409, "CONFLICT");
        }else{
            endingStats.push(req.body);
            res.sendStatus(201, "CREATED");
        }
    } 
});
app.post(BASE_API_URL+"/ending-stats/:country",(req,res)=>{
    res.sendStatus(405,"METHOD NOT FOUND"); 
});
app.delete(BASE_API_URL+"/ending-stats", (req,res)=>{
    endingStats = [];
    res.sendStatus(200,"OK");
});
app.delete(BASE_API_URL+"/ending-stats/:country", (req,res)=>{
    var endingCountry = req.params.country;
    endingStats = endingStats.filter((ending)=>{
        return (ending.country != endingCountry);
    });
    res.sendStatus(200,"OK");
});
app.put(BASE_API_URL+"/ending-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});
app.put(BASE_API_URL+"/ending-stats/:country/:year",(req,res)=>{
    if(req.body.country == null |
        req.body.year == null | 
        req.body.women == null | 
        req.body.men == null | 
        req.body.average == null){
        res.sendStatus(400,"BAD REQUEST");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;
        var index = endingStats.findIndex((ending) =>{
            return (ending.country == country && ending.year == year)
        })
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var update_endingStats = {...body};
            endingStats[index] = update_endingStats;
            
            res.sendStatus(200,"UPDATED");
        }
    }

});


//######################   API ****  ###############################//



app.use("/", express.static('public'));


app.listen(port, ()=> {
    console.log(`Server ready at port ${port}`);
});
