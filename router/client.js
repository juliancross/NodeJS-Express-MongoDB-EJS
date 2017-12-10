var express = require('express');
var mongodb = require('mongodb');


var app = express();

//ACCUEIL
app.get('/', function(req, res, next) {
    res.render('index', {
        sayHi: () => "Hello",
        nom: 'World'
    })
});


///LOAD/////
app.post('/welcome', function(req, res, next) {
    let mail = req.body.mail;
    let password = req.body.password;
    if (mail === 'toto' && password === "toto") {
        res.render('welcome', {
            mail: mail
        });
    } else if (mail === 'titi' && password === "titi") {
        res.redirect('/list');
    } else {
        res.redirect('/');
    }
});

//RECORD DATABASE///
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/yourDB';

app.post('/recordDB', function(req, res, next) {
    console.log(req);
    var users = {
        name: req.body.name,
        surName: req.body.surName,
        mail: req.body.mail,
        password: req.body.password,
    }
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log(err)
        } else
            db.collection('users').insert(users, function(err, data) {
                if (err) {
                    res.send(err)
                } else
                    res.redirect('/record');
            })
        db.close();
    })
});


app.get('/record', function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log(err)
            } else {
                db.collection('users').find().toArray(function(err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render('record', {
                            result: data,
                        })
                    }
                })
            }
            db.close();
        })
    })
    /////
    // LOAD WITH DATABASE ////////
app.post('/logginDB', function(req, res, next) {
    let mail = req.body.mail;
    let password = req.body.password;
    let flag = false;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Nous pouvons pas se connecter au serveur')
        } else {
            db.collection('users').find().toArray(function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    for (var i = 0; i < data.length; i++) {
                        var mail1 = data[i].mail;
                        var password1 = data[i].password;
                        if (mail === mail1 && password === password1) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        console.log(mail);
                        res.render('welcome', {
                            mail: () => {
                                var x = mail.slice(0, 5)
                                return x
                            }
                        });
                        console.log('mickey');
                    } else {
                        res.redirect('/');
                        console.log('dingo');
                    }
                }
            })
        }
    })
});

// PARAMS ////////
app.get('/params', function(req, res, next) {
    console.log(req.query);
    res.render("params", {
        qs: req.query
    });
});


//CONNECTION DB WITH PARAMS
app.get('/dbParams', function(req, res) {
    let mail = req.query.mail;
    let password = req.query.password;
    let flag = false;
    MongoClient.connect(url, function(err, db) {
        db.collection('users').find().toArray(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                for (var i = 0; i < data.length; i++) {
                    var mail1 = data[i].mail;
                    var password1 = data[i].password;
                    if (mail === mail1 && password === password1) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    console.log('ok');
                    res.render('logParam', {});
                } else {
                    res.redirect('/');
                    console.log('pas ok');
                }
            }
        });
    })
});






































var todoItems = [{
    id: 1,
    desc: 'Note'
}];
app.post('/add', function(req, res, next) {
    console.log(req);
    var newItem = req.body.newItem;
    todoItems.push({
        id: todoItems.length + 1,
        desc: newItem
    })
    res.redirect('/list');
});

////////////////MONGO
// var MongoClient = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017/testDB';

app.get('/list', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Nous pouvons pas se connecter au serveur')
        } else {
            db.collection('students').find().toArray(function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('list', {
                        result: data,
                        items: todoItems
                    })
                }
            })
        }
        db.close();
    })
})


// //export du Module
module.exports = app;