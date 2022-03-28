const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

//######################   API Rafael Molino Alvarez  ###############################//
var repeatersStats = [];

app.get(BASE_API_URL+"/repeaters-stats", (req,res)=>{
    res.send(JSON.stringify(repeatersStats,null,2));
});

app.get(BASE_API_URL+"/repeaters-stats/:name", (req,res)=>{
    var repeatersStats1 = [
        {
            country:"Albanian",
            year : 2011,
            women : 0.725,
            men : 1.005,
            average : 0.865
    
        },
    
        {
            country:"Chile",
            year : 2015,
            women : 2.665,
            men : 4.501,
            average : 3.583
    
        },
    
        {
            country:"Belgium",
            year : 2013,
            women : 2.532,
            men : 2.682,
            average : 2.6
    
        },
    
        {
            country:"Ireland",
            year : 2005,
            women : 0.299,
            men : 0.36,
            average : 0.330
    
        },
    
        {
            country:"Argentina",
            year : 2013,
            women : 2.283,
            men : 3.39,
            average : 2.837
        }
    ];

    repeatersName = repeatersStats.filter((h)=>{
        return(h.country==req.params.name)
    });

    if(req.params.name == "loadInitialData" && repeatersStats==0){
        repeatersStats = repeatersStats1;
        res.sendStatus(200, "OK")
    } else if(repeatersName == 0){
        res.sendStatus(404, "NOT FOUND");
    } else{
        res.send(JSON.stringify(repeatersName,null,2));
    }
});

app.post(BASE_API_URL+"/repeaters-stats", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    result = repeatersStats.filter((h)=>{
        return(JSON.stringify(h,null,2)===JSON.stringify(req.body,null,2));
    });
    if(result != 0){
        res.sendStatus(409,"CONFLICT");
    }else{
        repeatersStats.push(req.body);
        res.sendStatus(201,"CREATED");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.post(BASE_API_URL+"/repeaters-stats/:name", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/repeaters-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/repeaters-stats/:name", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.name==req.body.country){
        repeatersStats = repeatersStats.map((h)=>{
        if(h.country==req.params.name){
            return(req.body);
        }else{
            return h;
        }
    })
    res.sendStatus(201,"CREATED");
}
    else{
    res.sendStatus(400,"BAD REQUEST");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.delete(BASE_API_URL+"/repeaters-stats", (req,res)=>{
    houseworkStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/repeaters-stats/:name", (req,res)=>{
    repeatersStats = repeatersStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    res.sendStatus(200,"OK");
});

//######################   API Javier Hidalgo García  ###############################//
var houseworkStats = [];

app.get(BASE_API_URL+"/housework-stats", (req,res)=>{
    res.send(JSON.stringify(houseworkStats,null,2));
});

app.get(BASE_API_URL+"/housework-stats/:name", (req,res)=>{
    var houseworkStats1 = [
        {
            country:"Albanian",
            year : 2011,
            women : 21.7,
            men : 3.47,
            average : 12.58
    
        },
    
        {
            country:"Chile",
            year : 2015,
            women : 20.1,
            men : 9.85,
            average : 14.98
    
        },
    
        {
            country:"Belgium",
            year : 2013,
            women : 16.04,
            men : 10.06,
            average : 13.05
    
        },
    
        {
            country:"Ireland",
            year : 2005,
            women : 20.55,
            men : 8.95,
            average : 14.75
    
        },
    
        {
            country:"Argentina",
            year : 2013,
            women : 21.7,
            men : 3.47,
            average : 12.58
        }
    ];

    houseworkName = houseworkStats.filter((h)=>{
        return(h.country==req.params.name)
    });

    if(req.params.name == "loadInitialData" && houseworkStats==0){
        houseworkStats = houseworkStats1;
        res.sendStatus(200, "OK")
    } else if(houseworkName == 0){
        res.sendStatus(404, "NOT FOUND");
    } else{
        res.send(JSON.stringify(houseworkName,null,2));
    }
});

app.post(BASE_API_URL+"/housework-stats", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    result = houseworkStats.filter((h)=>{
        return(JSON.stringify(h,null,2)===JSON.stringify(req.body,null,2));
    });
    if(result != 0){
        res.sendStatus(409,"CONFLICT");
    }else{
        houseworkStats.push(req.body);
        res.sendStatus(201,"CREATED");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.post(BASE_API_URL+"/housework-stats/:name", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/housework-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/housework-stats/:name", (req,res)=>{
    console.log(JSON.stringify(houseworkStats,null,2).includes(req.body.country,null,2));
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.name==req.body.country && JSON.stringify(houseworkStats,null,2).includes(req.body.country)){
    houseworkStats = houseworkStats.map((h)=>{
        if(h.country==req.params.name){
            return(req.body);
        }else{
            return h;
        }
    })
    res.sendStatus(201,"CREATED");
}
    else if(!JSON.stringify(houseworkStats,null,2).includes(req.body.country)){
    res.sendStatus(404,"NOT FOUND");
    }else{
        res.sendStatus(400,"BAD REQUEST");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.delete(BASE_API_URL+"/housework-stats", (req,res)=>{
    houseworkStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/housework-stats/:name", (req,res)=>{
    houseworkStats = houseworkStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    res.sendStatus(200,"OK");
});

//######################   API Sergio García Blanco  ###############################//
var endingStats = [];

app.get(BASE_API_URL+"/ending-stats", (req,res)=>{
    res.send(JSON.stringify(endingStats,null,2));
});

app.get(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    var endingStats1 = [
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

    endingName = endingStats.filter((h)=>{
        return(h.country==req.params.name)
    });

    if(req.params.name == "loadInitialData" && endingStats==0){
        endingStats = endingStats1;
        res.sendStatus(200, "OK")
    } else if(endingStats == 0){
        res.sendStatus(404, "NOT FOUND");
    } else{
        res.send(JSON.stringify(endingStats,null,2));
    }
});

app.post(BASE_API_URL+"/ending-stats", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    result = endingStats.filter((h)=>{
        return(JSON.stringify(h,null,2)===JSON.stringify(req.body,null,2));
    });
    if(result != 0){
        res.sendStatus(409,"CONFLICT");
    }else{
        endingStats.push(req.body);
        res.sendStatus(201,"CREATED");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.post(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/ending-stats", (req,res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

app.put(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.name==req.body.country){
        endingStats = endingStats.map((h)=>{
        if(h.country==req.params.name){
            return(req.body);
        }else{
            return h;
        }
    })
    res.sendStatus(201,"CREATED");
}
    else{
    res.sendStatus(400,"BAD REQUEST");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.delete(BASE_API_URL+"/ending-stats", (req,res)=>{
    houseworkStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    houseworkStats = houseworkStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    res.sendStatus(200,"OK");
});

//######################   API ****  ###############################//



app.use("/", express.static('public'));


app.listen(port, ()=> {
    console.log(`Server ready at port ${port}`);
});
