const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";

var endingStats = [];
module.exports = (app) =>{

function aux(list,h,req){
    end = h.filter(i=>{
        if(req.country && list[0]==req.country){
            return(i.country==req.country);
        }else if(req.year && list[0]==req.year){
            return(i.year==req.year);
        }else if(req.men && list[0]==req.men){
            return(i.men==req.men);
        }else if(req.women && list[0]==req.women){
            return(i.women==req.women);
        }else if(req.average && list[0]==req.average){
            return(i.average==req.average);
        }else{
            return h;
        }
    });
    list.shift();
    if(list == 0){
        return end;
    }else{
        return aux(list,end,req); 
    }
}

app.get(BASE_API_URL+"/ending-stats", (req,res)=>{
    if(req.query.country || req.query.year || req.query.men || req.query.women || req.query.average){
        var list = [req.query.country, req.query.year, req.query.men, req.query.women, req.query.average];
        list = list.filter(i=>{
            return(i!=undefined);
        });
        if(list.length != Object.keys(req.query).length){
            res.sendStatus(400,"BAD REQUEST");
        }else{
        var result = JSON.stringify(aux(list,endingStats,req.query),null,2);
        if(result == JSON.stringify([],null,2)){
            res.sendStatus(404,"NOT FOUND");
        }else{
        res.send(result);
        }
    }
}else if(req.query.offset || req.query.limit || req.query.from || req.query.to){
    var list = [req.query.offset, req.query.limit,req.query.from, req.query.to];
    list = list.filter(i=>{
        return(i!=undefined);
    });
    if(list.length != Object.keys(req.query).length){
        res.sendStatus(400,"BAD REQUEST");
    }
    else if(req.query.from && req.query.to && req.query.limit && req.query.offset){
        endingStats2 = endingStats.filter(h=>{
            return(h.year >= req.query.from && h.year<=req.query.to);
        });
        res.send(JSON.stringify(endingStats2,null,2));
    }
    else if(req.query.offset&&req.query.limit){
        res.send(JSON.stringify(endingStats.slice(req.query.offset,parseInt(req.query.offset)+parseInt(req.query.limit)),null,2));
    }
    else if(req.query.offset && !req.query.limit){
        res.send(JSON.stringify(endingStats.slice(req.query.offset),null,2))
    }
    else res.send(JSON.stringify(endingStats.slice(0,req.query.limit),null,2))
}
else if(JSON.stringify(req.query,null,2) != JSON.stringify({},null,2)){
    console.log(req.query.from);
    console.log(JSON.stringify("{}",null,2));
    res.sendStatus(400,"BAD REQUEST");
}else{
res.send(JSON.stringify(endingStats,null,2));
}
});

app.get(BASE_API_URL+"/ending-stats/:country/:year", (req,res)=>{
    endingStats2 = endingStats.filter(i=>{
        return(i.country==req.params.country && i.year==req.params.year);
    });
    if(0==endingStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(endingStats2[0],null,2));
    }
});

app.put(BASE_API_URL+"/ending-stats/:country/:year", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.country==req.body.country && req.params.year==req.body.year && JSON.stringify(endingStats,null,2).includes(req.body.country)){
        endingStats = endingStats.map((h)=>{
        if(h.country==req.params.country&&h.year==req.params.year){
            return(req.body);
        }else{
            return h;
        }
    })
    res.sendStatus(201,"CREATED");
}
    else if(req.params.country != req.body.country && req.params.year !=req.body.year){
    res.sendStatus(400,"BAD REQUEST");
    }else{
        res.sendStatus(404,"NOT FOUND");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.delete(BASE_API_URL+"/ending-stats", (req,res)=>{
    endingStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/ending-stats/:country/:year", (req,res)=>{
    endingStats1 = endingStats.filter((h)=>{
        if(h.country != req.params.country){
            return h;
        }else if(h.year != req.params.year){
                return h;
        }
    })
    if(endingStats.length == endingStats1.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        endingStats=endingStats1;
        res.sendStatus(200,"OK");
    }
});

app.delete(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    endingStats2 = endingStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    if(endingStats.length == endingStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        endingStats= endingStats2;
        res.sendStatus(200,"OK");
    }
});

app.get(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    var endingStats1 = [
        {
            country:"Albanian",
            year : 2011,
            women : 94.4,
            men : 91.7,
            average : 93.050
    
        },
        {
            country:"Argentina",
            year : 2013,
            women : 101.200,
            men : 102.1,
            average : 101.650
        },
    
        {
            country:"Chile",
            year : 2015,
            women :96.800,
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
            country:"China",
            year : 2018,
            women : 90.7,
            men : 89.4,
            average : 90.05
    
        },
        {
            country:"Greece",
            year : 2011,
            women : 91.900,
            men : 94.4,
            average : 93.150
    
        },
        {
            country:"Spain",
            year : 2011,
            women : 96.2,
            men : 96.1,
            average : 96.2
    
        }
    
        
    ];

    endingName = endingStats.filter((h)=>{
        return(h.country==req.params.name)
    });

    if(req.params.name == "loadInitialData" && endingStats==0){
        endingStats = endingStats1;
        res.sendStatus(200, "OK")
    } else if(endingName == 0 && req.params.name != "docs"){
        res.sendStatus(404, "NOT FOUND");
    } else if(req.params.name == "docs"){
        res.redirect("https://documenter.getpostman.com/view/20237276/UVyoUxSu");
    } 
    else{
        res.send(JSON.stringify(endingName[0],null,2));
    }
});

app.post(BASE_API_URL+"/ending-stats", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    result = endingStats.filter((h)=>{
        if(req.body.country == h.country && req.body.year==h.year){
            return h;
        }else{
        return(JSON.stringify(h,null,2)===JSON.stringify(req.body,null,2));
        }
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
    console.log(JSON.stringify(endingStats,null,2).includes(req.body.country,null,2));
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.name==req.body.country && JSON.stringify(endingStats,null,2).includes(req.body.country)){
        endingStats = endingStats.map((h)=>{
        if(h.country==req.params.name){
            return(req.body);
        }else{
            return h;
        }
    })
    res.sendStatus(201,"CREATED");
}
    else if(req.params.name != req.body.country){
    res.sendStatus(400,"BAD REQUEST");
    }else{
        res.sendStatus(404,"NOT FOUND");
    }
}else{
    res.sendStatus(400,"BAD REQUEST");
}
});

app.delete(BASE_API_URL+"/ending-stats", (req,res)=>{
    endingStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/ending-stats/:name", (req,res)=>{
    endingStats2 = endingStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    if(endingStats.length == endingStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        endingStats=endingStats2;
        res.sendStatus(200,"OK");
    }
});
}