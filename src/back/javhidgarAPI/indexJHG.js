const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";

var houseworkStats = [];
module.exports = (app) =>{

    function aux(list,h,req){
        house = h.filter(i=>{
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
            return house;
        }else{
            return aux(list,house,req); 
        }
    }

app.get(BASE_API_URL+"/housework-stats", (req,res)=>{
    if(req.query.country || req.query.year || req.query.men || req.query.women || req.query.average){
        var list = [req.query.country, req.query.year, req.query.men, req.query.women, req.query.average];
        list = list.filter(i=>{
            return(i!=undefined);
        });
        if(list.length != Object.keys(req.query).length){
            res.sendStatus(400,"BAD REQUEST");
        }else{
        var result = JSON.stringify(aux(list,houseworkStats,req.query),null,2);
        if(result == JSON.stringify([],null,2)){
            res.sendStatus(404,"NOT FOUND");
        }else{
        res.send(result);
        }
    }
    }else if(req.query.offset || req.query.limit){
        var list = [req.query.offset, req.query.limit];
        list = list.filter(i=>{
            return(i!=undefined);
        });
        if(list.length != Object.keys(req.query).length){
            res.sendStatus(400,"BAD REQUEST");
        }
        else if(req.query.offset&&req.query.limit){
            res.send(JSON.stringify(houseworkStats.slice(req.query.offset,parseInt(req.query.offset)+parseInt(req.query.limit)),null,2));
        }
        else if(req.query.offset && !req.query.limit){
            res.send(JSON.stringify(houseworkStats.slice(req.query.offset),null,2))
        }
        else res.send(JSON.stringify(houseworkStats.slice(0,req.query.limit),null,2))
    }
    else if(JSON.stringify(req.query,null,2) != JSON.stringify({},null,2)){
        console.log(JSON.stringify("{}",null,2));
        res.sendStatus(400,"BAD REQUEST");
    }else{
    res.send(JSON.stringify(houseworkStats,null,2));
    }
});

app.get(BASE_API_URL+"/housework-stats/:country/:year", (req,res)=>{
    houseworkStats2 = houseworkStats.filter(i=>{
        return(i.country==req.params.country && i.year==req.params.year);
    });
    if(0==houseworkStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(houseworkStats2[0],null,2));
    }
});

app.put(BASE_API_URL+"/housework-stats/:country/:year", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    if(req.params.country==req.body.country && req.params.year==req.body.year && JSON.stringify(houseworkStats,null,2).includes(req.body.country)){
    houseworkStats = houseworkStats.map((h)=>{
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

app.delete(BASE_API_URL+"/housework-stats", (req,res)=>{
    houseworkStats = []
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/housework-stats/:country/:year", (req,res)=>{
    houseworkStats1 = houseworkStats.filter((h)=>{
        if(h.country != req.params.country){
            return h;
        }else if(h.year != req.params.year){
                return h;
        }
    })
    if(houseworkStats.length == houseworkStats1.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        houseworkStats=houseworkStats1;
        res.sendStatus(200,"OK");
    }
});

app.delete(BASE_API_URL+"/housework-stats/:name", (req,res)=>{
    houseworkStats2 = houseworkStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    if(houseworkStats.length == houseworkStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        houseworkStats= houseworkStats2;
        res.sendStatus(200,"OK");
    }
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
    } else if(houseworkName == 0 && req.params.name != "docs"){
        res.sendStatus(404, "NOT FOUND");
    } else if(req.params.name == "docs"){
        res.redirect("https://documenter.getpostman.com/view/20237276/UVyoUxSu");
    } 
    else{
        res.send(JSON.stringify(houseworkName[0],null,2));
    }
});

app.post(BASE_API_URL+"/housework-stats", (req,res)=>{
    if(req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length==5){
    result = houseworkStats.filter((h)=>{
        if(req.body.country == h.country && req.body.year==h.year){
            return h;
        }else{
        return(JSON.stringify(h,null,2)===JSON.stringify(req.body,null,2));
        }
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
    else if(req.params.name != req.body.country){
    res.sendStatus(400,"BAD REQUEST");
    }else{
        res.sendStatus(404,"NOT FOUND");
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
    houseworkStats2 = houseworkStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    if(houseworkStats.length == houseworkStats2.length){
        res.sendStatus(404,"NOT FOUND");
    }else{
        houseworkStats=houseworkStats2;
        res.sendStatus(200,"OK");
    }
});
}