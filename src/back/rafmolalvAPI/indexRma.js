const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";
const RMA_BASE_API_URL = "/api/v1/repeaters-stats";


var repeatersStats = [];

var initialStats = [
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
        country:"Belgium",
        year : 2016,
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

module.exports = (app) =>{
    app.use(bodyParser.json());


    //Documentacion
    app.get(RMA_BASE_API_URL+"/docs",(req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/20237623/UVyoVHPy");
    });

    //LoadInitialData

    app.get(RMA_BASE_API_URL + "/loadInitialData", (req,res) => {


        if(repeatersStats.length === 0){
            initialStats.forEach((a)=>{
                repeatersStats.push(a);
            });
        }
        res.send(JSON.stringify(repeatersStats,null,2));
        
    });

    //Busqueda por pais

    app.get(RMA_BASE_API_URL+"/:country", (req, res) => {
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
    app.get(RMA_BASE_API_URL+"/:country/:year", (req,res) => {
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
    
    app.get(BASE_API_URL+"/repeaters-stats", (req,res) => {

        if(repeatersStats == []){
            res.sendStatus(404,"NOT FOUND");
        }else{
            res.send(JSON.stringify(repeatersStats,null,2));
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

//Editar objeto

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

//Borrar todos los datos
app.delete(BASE_API_URL+"/repeaters-stats", (req,res)=>{
    repeatersStats = []
    res.sendStatus(200,"OK");
});

//Borrar un objeto dado un pais

app.delete(BASE_API_URL+"/repeaters-stats/:name", (req,res)=>{
    repeatersStats = repeatersStats.filter((h)=>{
        return(h.country!=req.params.name)
    })
    res.sendStatus(200,"OK");
});

};