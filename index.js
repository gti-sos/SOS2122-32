const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

//######################   API Rafael Molino Alvarez  ###############################//
var repeatersStats = [
    {
        country:"Albanian",
        year : 2011,
        women : 0.725,
        men : 1.005,
        average : 0.865

    },

    {
        country:"Spain",
        year : 2010,
        women : 2.1,
        men : 2.986,
        average : 2.5
    }
];

app.get(BASE_API_URL+"/repeatersStats", (req,res)=>{

    res.send(JSON.stringify(repeatersStats,null,2));
});

app.post(BASE_API_URL+"/repeatersStats", (req,res)=>{

    repeatersStats.push(req.body);

    res.sendStatus(201,"CREATED");
});

//######################   API Javier Hidalgo García  ###############################//


app.use("/", express.static('public'));


app.listen(port, ()=> {
    console.log(`Server ready at port ${port}`);
});
