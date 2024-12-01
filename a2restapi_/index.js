var express = require("express");
var bodyParser = require("body-parser");

var model = require('./model/db.js');  //

var cors = require('cors')
var app = express();

app.use(bodyParser.json());

// serves files in public folder
app.use(express.static('public'));
app.use(cors());

//
// routes
//

// /teams
app.route('/teams').get(function(req,res){
  model.getTeams(req,res);
});
// /players

app.route('/players').get(function(req,res){
  model.getPlayers(req,res);
});

app.route('/playersWN').get(function(req,res){
  model.getPlayersWN(req,res);
});

app.route('/results').get(function(req,res){
  model.getResults(req,res);
}).put(function(req,res){
  var data = req.body;
  model.updateResults(req,res,data);
});

app.route('/results/:id').get(function(req,res){
  model.getResultsById(req,res);
}).delete(function(req,res){
  model.deleteResult(req,res);
});

app.route('/login/').post(function(req,res){
  var data = req.body;
  model.login(req,res,data);
})

  
var myServer = app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
