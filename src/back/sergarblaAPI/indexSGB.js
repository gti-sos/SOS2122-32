const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";
const RMA_BASE_API_URL = "/api/v1/ending-stats";


var endingStats = [];
app.get(BASE_API_URL + "/ending-stats",(req, res)=>{
    
    var year = req.query.year;
    var from = req.query.from;
    var to = req.query.to;

    //Comprobamos query

    for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    }

    //Comprobamos si from es mas pequeño o igual a to
    if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        return;
    }

    db.find({},function(err, newRegis){

        if(err){
            res.sendStatus(500, "ERROR EN CLIENTE");
            return;
        }

        // Apartado para búsqueda por año
        
        if(year != null){
            var newRegis = newRegis.filter((reg)=>
            {
                return (reg.year == year);
            });
            if (newRegis==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }
        }

        // Apartado para from y to
        
        if(from != null && to != null){
            newRegis = newRegis.filter((reg)=>
            {
                return (reg.year >= from && reg.year <=to);
            });

            if (newRegis==0){
                res.sendStatus(404, "NO EXISTE");
                return;
            }    

            
        }
        // RESULTADO

        if(req.query.limit != undefined || req.query.offset != undefined){
            newRegis = paginacion(req,newRegis);
        }
        newRegis.forEach((element)=>{
            delete element._id;
        });
        res.send(JSON.stringify(newRegis,null,2));
    })
});

var initialStats = [
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
        country:"Switzerland",
        year : 2016,
        women : 97.900,
        men : 96,
        average : 96.950

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
    },
    {
        country:"Spain",
        year : 2011,
        women : 96.2,
        men : 96.1,
        average : 96.2
    }
];

module.exports = (app) =>{
    app.use(bodyParser.json());


    //Documentacion
    app.get(RMA_BASE_API_URL+"/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/20237623/UVyoVHPy");
    });

    //LoadInitialData

    app.get(RMA_BASE_API_URL + "/ending-stats/loadInitialData", (req,res) => {


        if(repeatersStats.length === 0){
            initialStats.forEach((a)=>{
                repeatersStats.push(a);
            });
        }
        res.send(JSON.stringify(repeatersStats,null,2));
        
    });

    //Busqueda por pais

    app.get(RMA_BASE_API_URL+"/ending-stats/:country", (req, res) => {
        var Country = req.params.country;
        filtered = repeatersStats.filter((e) => {
            return (e.country == Country);
        });
        if (filtered == 0) {
            res.sendStatus(404, "NOT FOUND");
        }
        else {
            res.send(JSON.stringify(filtered, null, 2));
        }
    })


    //Busqueda por pais y año
    app.get(RMA_BASE_API_URL+"/ending-stats/:country/:year", (req,res) => {
        var Country = req.params.country;
        var Year = req.params.year;
        filtered = repeatersStats.filter( (e) => {
            return ((e.country == Country) && (e.year == Year));
        });
        if(filtered == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            res.send(JSON.stringify(filtered[0],null,2));
        }
    });

    //Busqueda general
    
    app.get(BASE_API_URL+"/ending-stats", (req,res) => {

        if(endingStats == []){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.send(JSON.stringify(endingStats,null,2));
        }
        
        res.sendStatus(200,"OK");
    
        //paginacion
        if (req.query.limit != undefined || req.query.offset != undefined) {
            filteredList = paginacion(req, filteredList);
        }
        filteredList.forEach((element) => {
            delete element._id;
        });
        res.send(JSON.stringify(filteredList, null, 2));
    });





//Crear un nuevo objeto
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

//Editar objeto

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

//Borrar todos los datos
app.delete(BASE_API_URL+"/ending-stats", (req,res)=>{
    endingStats = []
    res.sendStatus(200,"OK");
});

//Borrar un objeto dado un pais

app.delete(BASE_API_URL+"/ending-stats/:country/:year", (req,res)=>{
    var Country = req.params.country;  
    var Year = req.params.year; 

    db.find({country: Country, year: parseInt(Year)}, {}, (err, filteredList)=>{

        if (err){
            res.sendStatus(500,"ERROR EN CLIENTE");
            return;
        }
        if(filteredList==0){
            res.sendStatus(404,"NOT FOUND");
            return;
        }
        db.remove({country: Country, year: parseInt(Year)}, {}, (err, rem)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
        
            res.sendStatus(200,"OK");
            return;
            
        });
    });
});

};