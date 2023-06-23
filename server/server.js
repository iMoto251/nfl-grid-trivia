const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

const app = express();

const sqlite3 = require('sqlite3').verbose();
var dbFile = 'C:\\Users\\laneb\\Documents\\GitHub\\nfl-grid-trivia\\server\\database\\players.sqlite';
var dbExists = fs.existsSync(dbFile);

if(!dbExists){
    fs.openSync(dbFile, 'w');
}
//const db = new sqlite3.Database(dbsource, sqlite3.OPEN_READONLY)

var db = new sqlite3.Database(dbFile);



app.use(cors());
app.use(express.json());

app.get('/',(req,res) =>{
    const body = req.body
    console.log(body)
    //res.send("Hello World!")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

// app.post("/post", (req, res) => {
//     console.log("Connected to React");
//     res.redirect("/");
//     //let x = db.run("select playerTeams.name from playerTeams INNER JOIN players ON players.id=playerTeams.id where playerTeams.playedLVR='True' and players.college='Texas';")
//     let sql = `select playerTeams.name from playerTeams INNER JOIN players ON players.id=playerTeams.id where playerTeams.playedKAN='True' and playerTeams.playedNOR='True';`
//     let x;
//     db.all(sql, [],(err,rows) =>{
//         if(rows.length < 5){

//         } else {
//             let x = rows;
//         }
//         rows.forEach((row)=>{
//             console.log(row.name)
//         })
        
//     })

//     //console.log(x)

    
//     //let x  = db.run("select * from players;")
//     //console.log(x)
//   });

  app.post("/check1", (req, res) => {
    // let gridTop = res.document.querySelector("#topleft");
    // let gridLeft = res.document.querySelector("#lefttop")
    // console.log(gridTop + ' ' + gridLeft)
    //res.redirect("/");
    res.send("Hello World!")
  })

  app.post("/check2", (req, res) => {

  })