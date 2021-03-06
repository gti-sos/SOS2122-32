const bodyParser = require("body-parser");
const BASE_API_URL = "/api/v2";
const RMA_BASE_API_URL = "/api/v2/repeaters-stats";
const request = require('request');
const cors = require('cors'); 
const express = require("express");
const app = express();
app.use(cors());
//Proxy

var paths='/remoteAPI';
var apiServerHost = 'http://sos2122-32.herokuapp.com/api/v2/repeaters-stats';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});


var repeatersStats = [];

var initialStats = [
    {
        country: "albanian",
        year: 2011,
        women: 0.725,
        men: 1.005,
        average: 0.865

    },

    {
        country: "chile",
        year: 2015,
        women: 2.665,
        men: 4.501,
        average: 3.583

    },

    {
        country: "belgium",
        year: 2013,
        women: 2.532,
        men: 2.682,
        average: 2.6

    },
    {
        country: "belgium",
        year: 2016,
        women: 2.532,
        men: 2.682,
        average: 2.6

    },

    {
        country: "ireland",
        year: 2005,
        women: 0.299,
        men: 0.36,
        average: 0.330

    },

    {
        country: "argentina",
        year: 2013,
        women: 2.283,
        men: 3.39,
        average: 2.837
    }
];
module.exports.register = (app, db) => {
    app.use(bodyParser.json());

    //Documentacion
    app.get(RMA_BASE_API_URL + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/20237623/UyrAFxCX");
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
                    //to pero no from
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
                    //from pero no to
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
            else {

                if (year == null) {
                    //ni offset ni limit
                    if (offset == undefined && limit == undefined) {
                        db.find({}, function (err, docs) {
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
                    //offset y no limit
                    else if (offset != undefined && limit == undefined) {
                        db.find({}).skip(offset).exec(function (err, docs) {
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
                    //limit y no offset
                    else if (offset == undefined && limit != undefined) {
                        db.find({}).limit(limit).exec(function (err, docs) {
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
                    //offset y limit
                    else {
                        db.find({}).limit(limit).skip(offset).exec(function (err, docs) {
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
                else {
                    if (offset == undefined && limit == undefined) {
                        db.find({ year: parseInt(year) }, function (err, docs) {
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
        }

    });



    //Busqueda por pais

    app.get(RMA_BASE_API_URL + "/:country", (req, res) => {
        var Country = req.params.country;
        db.find({ country: Country }, function (err, docs) {

            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }

            else {
                if (docs == 0) {
                    res.sendStatus(404, "NOT FOUND")
                }
                else {
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy, null, 2));
                }
            }

        });
    });


    //Busqueda por pais y a??o
    app.get(RMA_BASE_API_URL + "/:country/:year", (req, res) => {
        var Country = req.params.country;
        var Year = req.params.year;
        db.find({ country: Country, year: parseInt(Year) }, function (err, docs) {

            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }

            else {
                if (docs == 0) {
                    res.sendStatus(404, "NOT FOUND")
                }
                else {
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy, null, 2));
                }
            }

        });
    });





    function comprobacion_parametros(req) {
        return (req.body.country == null |
            req.body.year == null |
            req.body.women == null |
            req.body.men == null |
            req.body.average == null |
            req.body.country === "" |
            req.body.year === "" |
            req.body.women === "" |
            req.body.men === ""|
            req.body.average === "");
    };

    //Crear un nuevo objeto
    app.post(BASE_API_URL + "/repeaters-stats", (req, res) => {


        if (comprobacion_parametros(req)) {
            res.sendStatus(400, "BAD REQUEST");
        }
        else {
            db.find({}, function (err, registro) {
                if (err) {
                    res.sendStatus(500, "INTERNAL SERVER ERROR");
                }

                registro = registro.filter((reg) => {
                    return (req.body.country == reg.country && req.body.year == reg.year)
                })
                if (registro.length != 0) {
                    res.sendStatus(409, "CONFLICT");
                } else {
                    db.insert(req.body);
                    res.sendStatus(201, "CREATED");
                }

            })


        }

    });

    app.post(BASE_API_URL + "/repeaters-stats/:name", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    app.put(BASE_API_URL + "/repeaters-stats", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    //Editar objeto

    app.put(BASE_API_URL + "/repeaters-stats/:country/:year", (req, res) => {

        if (comprobacion_parametros(req)) {
            res.sendStatus(400, "BAD REQUEST");
        }

        else{
            var n_country = req.params.country;
            var n_year = req.params.year;
            var n_body = req.body;

            if(n_country != n_body.country || n_year != n_body.year){
                res.sendStatus(400, "BAD REQUEST");
            }
            else{
                db.find({country: n_country, year: parseInt(n_year)}, function(err,docs){
                    if(err){
                        res.sendStatus(500,"INTERNAL SERVER ERROR");
                    }
                    else{
                        if(docs==0){
                            res.sendStatus(404, "NOT FOUND");
                        }
                        else{
                            db.update({country: n_country, year: parseInt(n_year)},
                            { $set: {
                                "women": n_body.women,
                                "men": n_body.men,
                                "average": n_body.average
                            }},function(err,newDocs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    res.sendStatus(200, "OK");
                                }
                            });
                        }
                    }
                })
            }
        }

    });

    //Borrar todos los datos
    app.delete(BASE_API_URL + "/repeaters-stats/", (req, res) => {
        db.remove({}, { multi: true }, (err, numRegRemoved) => {
            if (err) {
                console.error("ERROR deleting DB repeaters in DELETE: " + err);
                res.sendStatus(500);
            } else {
                if (numRegRemoved == 0) {
                    console.error("repeaters-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }

        });
    });

    //Borrar un objeto dado un pais

    app.delete(RMA_BASE_API_URL + "/:country/:year", (req, res) => {
        var countryR = req.params.country;
        var yearR = req.params.year;
        db.find({ country: countryR, year: parseInt(yearR) }, {}, (err, filteredList) => {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            if (filteredList == 0) {
                res.sendStatus(404, "NOT FOUND");
                return;
            }
            db.remove({ country: countryR, year: parseInt(yearR) }, {}, (err, numRemoved) => {
                if (err) {
                    res.sendStatus(500, "ERROR EN CLIENTE");
                    return;
                }

                res.sendStatus(200, "DELETED");
                return;

            });
        });
    });
};
