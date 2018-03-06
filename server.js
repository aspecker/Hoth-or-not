const bodyParser = require ('body-parser');
const express = require ('express');

var app = express ();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require ('./app/routing/apiroutes.js')(app);
require ('./app/routing/htmlroutes.js')(app);

app.listen(PORT, function () {
    console.log('Listening on '+PORT);
});