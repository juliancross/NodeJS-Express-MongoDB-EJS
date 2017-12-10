const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const client = require('./router/client');


const app = express();

//Configure App
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + 'views'));
// Use middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

//Router
app.use(client);

const port = process.env.PORT || 8884;
app.listen(port, function() {
    console.log("Vous êtes sur le port 8884...");
})