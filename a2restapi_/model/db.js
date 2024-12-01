var mysql = require('mysql');

///////////////////////////////////////////////////////////////////////////////////////////

// Setup MySQL connection
// timezone is very NB

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gaanfl2024',
  timezone: 'utc+0',
  //remove or change to your port or default 3306
  port: '3305'
});

connection.connect(function(err){
	if(err) throw err;
	console.log(`Sucessfully connected to MySQL database gaaNFL2024`);
});

///////////////////////////////////////////////////////////////////////////////////////////


exports.getTeams = function(req,res){
  connection.query('SELECT * FROM teams ORDER BY name', function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.getPlayers = function(req,res){
  connection.query('SELECT * FROM players', function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.getPlayersWN = function(req,res){
  connection.query("SELECT players.id, players.name, players.squadNumber, players.age, players.matches, teams.name as 'teamName' FROM players, teams WHERE players.teamID = teams.id ORDER by teams.name, name;", function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.getResults = function(req,res){
  connection.query('SELECT * FROM results ORDER BY division, date ASC;', function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.getResultsById = function(req,res){

  connection.query(`SELECT * FROM results WHERE division = ${req.params.id}`, function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.updateResults = function(req,res,data){

  if(data.team1Score.charAt(0) === "-"){
    data.team1Score = `0${data.team1Score}`
  }else if(data.team1Score.charAt(0) === "-"){
    data.team2Score = `0${data.team2Score}`
  }

  //sets the scores and points values to update individual tables
  data.team1Goals = String(data.team1Score).split("-")[0];
  data.team1Points = String(data.team1Score).split("-")[1];
  data.team2Goals = String(data.team2Score).split("-")[0];
  data.team2Points = String(data.team2Score).split("-")[1];
  
  connection.query(`UPDATE results SET team1Score = '${data.team1Score}', team1Goals = '${data.team1Goals}',`+
   `team1Points = '${data.team1Points}', team2Score = '${data.team2Score}', team2Goals = '${data.team2Goals}',`+
   `team2Points = '${data.team2Points}' WHERE id = ${data.id};`, function(err, rows, fields){
    if (err) throw err;

      res.status(200);
      res.send("200");
  });
}

exports.deleteResult = function(req,res){

  connection.query(`DELETE FROM results WHERE id = ${req.params.id}`, function(err, rows, fields){
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
}

exports.login = function(req,res,data){

  connection.query(`SELECT * FROM users WHERE email = '${data.email}' and password = '${data.password}'`, function(err, rows,fields){
    if(err) throw err;
    
    if(rows.length >= 1){
      res.status(200);
      res.send("200");
    }else{
      res.status(401);
      res.send("401");
    }
  });
}