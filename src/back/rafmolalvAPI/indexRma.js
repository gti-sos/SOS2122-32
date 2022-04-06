const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v1";
const RMA_BASE_API_URL = "/api/v1/repeaters-stats";


var repeatersStats = [];

var initialStats = [
    {
        country: "Albanian",
        year: 2011,
        women: 0.725,
        men: 1.005,
        average: 0.865

    },

    {
        country: "Chile",
        year: 2015,
        women: 2.665,
        men: 4.501,
        average: 3.583

    },

    {
        country: "Belgium",
        year: 2013,
        women: 2.532,
        men: 2.682,
        average: 2.6

    },
    {
        country: "Belgium",
        year: 2016,
        women: 2.532,
        men: 2.682,
        average: 2.6

    },

    {
        country: "Ireland",
        year: 2005,
        women: 0.299,
        men: 0.36,
        average: 0.330

    },

    {
        country: "Argentina",
        year: 2013,
        women: 2.283,
        men: 3.39,
        average: 2.837
    }
];

module.exports = (app, db) => {
    app.use(bodyParser.json());


    //Documentacion
    app.get(RMA_BASE_API_URL + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/20237623/UVyoVHPy");
    });

    //LoadInitialData

    app.get(RMA_BASE_API_URL + "/loadInitialData", (req, res) => {

        db.find({}, function (err, docs) {

            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else {
                db.remove({}, { multi: true }, (err, num) => {
                    if (err) {
                        res.sendStatus(500, "ERROR IN CLIENT");
                        return;
                    }
                    return;
                });

                initialStats.forEach((x) => {
                    db.insert(x);
                });
                res.sendStatus(200, "OK");
            }
        });
    });

    //funcion para comprobar query

    function compruebaQuery(e) {
        if (e.length == 0) {
            return true;
        }
        else {
            for (var i = 0; i < e.length; i++) {
                var query = e[i];
                if (query != "year" && query != "from" && query != "to" && query != "limit" && query != "offset") {
                    return false;
                }
            }
        }
    };


    //Busqueda general

    app.get(RMA_BASE_API_URL, (req, res) => {

        var year = req.query.year;
        var offset = req.query.offset;
        var limit = req.query.limit;
        var from = req.query.from;
        var to = req.query.to;

        //comprobamos query
        if (compruebaQuery(Object.keys(req.query)) == false) {
            res.sendStatus(400, "BAD REQUEST");
        }

        //si son correctas   
        else {
            // si existe from o to
            if (from != null || to != null) {
                if (from > to) { //comprobamos si from es mayor que to
                    res.sendStatus(400, "BAD REQUEST");
                }
                else {
                    // existen ambos
                    if (from != null && to != null) {
                            db.find({ $and: [{ year: { $gte: parseInt(from) } }, { year: { $lte: parseInt(to) } }] }, function (err, docs) {
                                if (err) {
                                    res.sendStatus(500, "INTERNAL SERVER ERROR");
                                }
                                else {
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                        delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        
                    }
                    //existe to pero no from
                    else if (from == null && to != null) {
                        
                            db.find({ $or: [{ year: { $lte: parseInt(to) } }] }, function (err, docs) {
                                if (err) {
                                    res.sendStatus(500, "INTERNAL SERVER ERROR");
                                }
                                else {
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                        delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        
                       
                    }
                    //EXISTE EL FROM PERO NO EL TO
                    else {
                        // NO HAY OFFSET Y LIMIT
                            db.find({ $or: [{ year: { $gte: parseInt(from) } }] }, function (err, docs) {
                                if (err) {
                                    res.sendStatus(500, "INTERNAL SERVER ERROR");
                                }
                                else {
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                        delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        
                       
                        
                    }
                }
            }
            //no hay ni from ni to
            else{ 
    
                if(year == null){
                    //ni offset ni limit
                    if(offset == undefined && limit == undefined){
                        db.find({}, function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    //offset y no limit
                    else if(offset != undefined && limit == undefined){
                        db.find({}).skip(offset).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    //limit y no offset
                    else if(offset == undefined && limit != undefined){
                        db.find({}).limit(limit).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    //offset y limit
                    else{
                        db.find({}).limit(limit).skip(offset).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                }
                else{ 
                    if(offset == undefined && limit == undefined){
                        db.find({year: parseInt(year)}, function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    
                }
            }
        }

    });



    //Busqueda por pais

    app.get(RMA_BASE_API_URL+"/:country", (req, res) => {
        var Country = req.params.country;
         db.find({country: Country},function(err, docs){

            if(err){
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }

            else{
                if(docs == 0){
                    res.sendStatus(404, "NOT FOUND")
                }
                else{
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy,null,2));
                }
            }

        });
    });


    //Busqueda por pais y año
    app.get(RMA_BASE_API_URL + "/:country/:year", (req, res) => {
        var Country = req.params.country;
        var Year = req.params.year;
         db.find({country: Country, year:parseInt(Year)},function(err, docs){

            if(err){
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }

            else{
                if(docs == 0){
                    res.sendStatus(404, "NOT FOUND")
                }
                else{
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy,null,2));
                }
            }

        });
    });






    //Crear un nuevo objeto
    app.post(BASE_API_URL + "/repeaters-stats", (req, res) => {
        if (req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length == 5) {
            result = repeatersStats.filter((h) => {
                return (JSON.stringify(h, null, 2) === JSON.stringify(req.body, null, 2));
            });
            if (result != 0) {
                res.sendStatus(409, "CONFLICT");
            } else {
                repeatersStats.push(req.body);
                res.sendStatus(201, "CREATED");
            }
        } else {
            res.sendStatus(400, "BAD REQUEST");
        }
    });

    app.post(BASE_API_URL + "/repeaters-stats/:name", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    app.put(BASE_API_URL + "/repeaters-stats", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    //Editar objeto

    app.put(BASE_API_URL + "/repeaters-stats/:name", (req, res) => {
        if (req.body.country && parseInt(req.body.year) && parseFloat(req.body.men) && parseFloat(req.body.women) && parseFloat(req.body.average) && Object.keys(req.body).length == 5) {
            if (req.params.name == req.body.country) {
                repeatersStats = repeatersStats.map((h) => {
                    if (h.country == req.params.name) {
                        return (req.body);
                    } else {
                        return h;
                    }
                })
                res.sendStatus(201, "CREATED");
            }
            else {
                res.sendStatus(400, "BAD REQUEST");
            }
        } else {
            res.sendStatus(400, "BAD REQUEST");
        }
    });

    //Borrar todos los datos
    app.delete(BASE_API_URL + "/repeaters-stats", (req, res) => {
        repeatersStats = []
        res.sendStatus(200, "OK");
    });

    //Borrar un objeto dado un pais

    app.delete(BASE_API_URL + "/repeaters-stats/:name", (req, res) => {
        repeatersStats = repeatersStats.filter((h) => {
            return (h.country != req.params.name)
        })
        res.sendStatus(200, "OK");
    });

};