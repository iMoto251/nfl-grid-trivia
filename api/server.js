const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

const app = express();

app.use(express.static(path.join(__dirname, '/public')))

const sqlite3 = require('sqlite3').verbose();
const dbFile = path.resolve(__dirname, 'database/players.sqlite')
//var dbFile = 'C:\\Users\\laneb\\Documents\\GitHub\\nfl-grid-trivia\\src\\server\\database\\players.sqlite';
var dbExists = fs.existsSync(dbFile);

if(!dbExists){
    fs.openSync(dbFile, 'w');
}
//const db = new sqlite3.Database(dbsource, sqlite3.OPEN_READONLY)

var db = new sqlite3.Database(dbFile);
app.use(cors());
app.use(express.json());

// app.get('/',(req,res) =>{
//     const body = req.body
//     console.log(body)

//     res.send("Good")
//     //res.send("Hello World!")
// })

let correctAnswers = []

app.post("/checkchoices", (req,res) => {
  correctAnswers = []
  //const body = req.body
  //console.log(body)

  //res.send(JSON.stringify("Good"))

  let sql = buildQuery(req.body)
  //console.log(sql)
  //let x;
  
  for(let i = 0;i<sql.length;i++){
    let answerArray = []
    if(sql[i] === '2 Colleges'){
      //console.log("Query not possible, 2 colleges")
    } else if(sql[i] === '2 Stats'){
      //console.log("Query not possible, 2 stats")
    } else {
      db.all(sql[i], [],(err,rows) =>{
        //x = rows
        //console.log(rows)
        if(rows.length < 5){
          //console.log("Less than 5")
          rows.forEach((row)=>{
            answerArray.push(row.name)
            //console.log(row.name)
          })
        } else {
          //console.log(rows)
          rows.forEach((row)=>{
            answerArray.push(row.name)
            //console.log(row.name)
          })
        }
      })
    }
    correctAnswers.push(answerArray)
  }
  res.send(JSON.stringify("QueryGood"))
  //return(res.send(JSON.stringify(x)))
})

app.post("/checkanswers", (req,res) =>{
  for(let i = 0;i<correctAnswers.length;i++){
    //console.log(correctAnswers[i].length)
    if(i === correctAnswers.length-1){
      
    }
  }
  var obj = {
    box1: correctAnswers[0].length,
    box2: correctAnswers[1].length,
    box3: correctAnswers[2].length,
    box4: correctAnswers[3].length,
    box5: correctAnswers[4].length,
    box6: correctAnswers[5].length,
    box7: correctAnswers[6].length,
    box8: correctAnswers[7].length,
    box9: correctAnswers[8].length
  }
  res.send(JSON.stringify(obj))

  return 0;
})

app.post("/testanswers", (req,res) =>{
  if(correctAnswers[req.body.box-1].includes(req.body.answer)){
    res.send(JSON.stringify("Correct"))
  } else {
    res.send(JSON.stringify("Incorrect"))
  }
  //console.log(correctAnswers[req.body.box-1])
  
})

function pickStatCat(selection){
  let statCat=''
  let statNum=''

  switch(selection){
    case "pass5000":
      statCat = 'bestPassing'
      statNum = '5000'
      break;
    case "pass4000":
      statCat = 'bestPassing'
      statNum = '4000'
      break;
    case "pass3000":
      statCat = 'bestPassing'
      statNum = '3000'
      break;
    case "pass35TD":
      statCat = 'bestPassingTD'
      statNum = '35'
      break;
    case "pass30TD":
      statCat = 'bestPassingTD'
      statNum = '30'
      break;
    case "pass25TD":
      statCat = 'bestPassingTD'
      statNum = '25'
      break;
    case "rush2000":
      statCat = 'bestRushing'
      statNum = '2000'
      break;
    case "rush1500":
      statCat = 'bestRushing'
      statNum = '1500'
      break;
    case "rush1250":
      statCat = 'bestRushing'
      statNum = '1250'
      break;
    case "rush1000":
      statCat = 'bestRushing'
      statNum = '1000'
      break;
    case "rush20TD":
      statCat = 'bestRushingTD'
      statNum = '20'
      break;
    case "rush15TD":
      statCat = 'bestRushingTD'
      statNum = '15'
      break;
    case "rush10TD":
      statCat = 'bestRushingTD'
      statNum = '10'
      break;
    case "rec1750":
      statCat = 'bestReceiving'
      statNum = '1750'
      break;
    case "rec1500":
      statCat = 'bestReceiving'
      statNum = '1500'
      break;
    case "rec1250":
      statCat = 'bestReceiving'
      statNum = '1250'
      break;
    case "rec1000":
      statCat = 'bestReceiving'
      statNum = '1000'
      break;
    case "rec15TD":
      statCat = 'bestReceivingTD'
      statNum = '15'
      break;
    case "rec10TD":
      statCat = 'bestReceivingTD'
      statNum = '10'
      break;
    case "recep110":
      statCat = 'bestReceptions'
      statNum = '110'
      break;
    case "recep100":
      statCat = 'bestReceptions'
      statNum = '100'
      break;
    case "careerPassYds50000":
      statCat = 'careerPassing'
      statNum = '50000'
      break;
    case "careerPassYds30000":
      statCat = 'careerPassing'
      statNum = '30000'
      break;
    case "careerPassYds20000":
      statCat = 'careerPassing'
      statNum = '20000'
      break;
    case "careerPassTD400":
      statCat = 'careerPassingTD'
      statNum = '400'
      break;
    case "careerPassTD300":
      statCat = 'careerPassingTD'
      statNum = '300'
      break;
    case "careerPassTD200":
      statCat = 'careerPassingTD'
      statNum = '200'
      break;
    case "careerRushYds10000":
      statCat = 'careerRushing'
      statNum = '10000'
      break;
    case "careerRushYds7500":
      statCat = 'careerRushing'
      statNum = '7500'
      break;
    case "careerRushYds5000":
      statCat = 'careerRushing'
      statNum = '5000'
      break;
    case "careerRushTD100":
      statCat = 'careerRushingTD'
      statNum = '100'
      break;
    case "careerRushTD75":
      statCat = 'careerRushingTD'
      statNum = '75'
      break;
    case "careerRushTD50":
      statCat = 'careerRushingTD'
      statNum = '50'
      break;
    case "careerRecYds12500":
      statCat = 'careerReceiving'
      statNum = '12500'
      break;
    case "careerRecYds10000":
      statCat = 'careerReceiving'
      statNum = '10000'
      break;
    case "careerRecYds7500":
      statCat = 'careerReceiving'
      statNum = '7500'
      break;
    case "careerRecTD100":
      statCat = 'careerReceivingTD'
      statNum = '100'
      break;
    case "careerRecTD75":
      statCat = 'careerReceivingTD'
      statNum = '75'
      break;
    case "careerRecTD50":
      statCat = 'careerReceivingTD'
      statNum = '50'
      break;
  }

  return[statCat, statNum]
}

function buildQuery(body){
  let playerBoxes = []

  //Box 1 Query
  if(nflTeams.includes(body.topleft)){ // NFL + Others
    if(nflTeams.includes(body.lefttop)){ // NFL + NFL
      let team1 = body.topleft
      let team2 = body.lefttop

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //NFL + Stat
      let nflteam = body.topleft
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //NFL + College
      let nflteam = body.topleft
      let collegeteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topleft)){//College + Others
    if(nflTeams.includes(body.lefttop)){ //College + NFL
      let collegeteam = body.topleft
      let nflteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //College + Stat
      let collegeteam = body.topleft
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topleft)){//Stat + Others
    if(nflTeams.includes(body.lefttop)){ // Stat + NFL
      let nflteam = body.lefttop
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //Stat + College
      let collegeteam = body.lefttop
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.lefttop)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 2 Query
  if(nflTeams.includes(body.topmiddle)){ // NFL + Others
    if(nflTeams.includes(body.lefttop)){ // NFL + NFL
      let team1 = body.topmiddle
      let team2 = body.lefttop

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //NFL + Stat
      let nflteam = body.topmiddle
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //NFL + College
      let nflteam = body.topmiddle
      let collegeteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topmiddle)){//College + Others
    if(nflTeams.includes(body.lefttop)){ //College + NFL
      let collegeteam = body.topmiddle
      let nflteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //College + Stat
      let collegeteam = body.topmiddle
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topmiddle)){//Stat + Others
    if(nflTeams.includes(body.lefttop)){ // Stat + NFL
      let nflteam = body.lefttop
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //Stat + College
      let collegeteam = body.lefttop
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.lefttop)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 3 Query
  if(nflTeams.includes(body.topright)){ // NFL + Others
    if(nflTeams.includes(body.lefttop)){ // NFL + NFL
      let team1 = body.topright
      let team2 = body.lefttop

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //NFL + Stat
      let nflteam = body.topright
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //NFL + College
      let nflteam = body.topright
      let collegeteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topright)){//College + Others
    if(nflTeams.includes(body.lefttop)){ //College + NFL
      let collegeteam = body.topright
      let nflteam = body.lefttop

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.lefttop)){ //College + Stat
      let collegeteam = body.topright
      let statCat = pickStatCat(body.lefttop)[0]
      let statNum = pickStatCat(body.lefttop)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topright)){//Stat + Others
    if(nflTeams.includes(body.lefttop)){ // Stat + NFL
      let nflteam = body.lefttop
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.lefttop)){ //Stat + College
      let collegeteam = body.lefttop
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.lefttop)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 4 Query
  if(nflTeams.includes(body.topleft)){ // NFL + Others
    if(nflTeams.includes(body.leftmiddle)){ // NFL + NFL
      let team1 = body.topleft
      let team2 = body.leftmiddle

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //NFL + Stat
      let nflteam = body.topleft
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //NFL + College
      let nflteam = body.topleft
      let collegeteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topleft)){//College + Others
    if(nflTeams.includes(body.leftmiddle)){ //College + NFL
      let collegeteam = body.topleft
      let nflteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //College + Stat
      let collegeteam = body.topleft
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topleft)){//Stat + Others
    if(nflTeams.includes(body.leftmiddle)){ // Stat + NFL
      let nflteam = body.leftmiddle
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //Stat + College
      let collegeteam = body.leftmiddle
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftmiddle)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 5 Query
  if(nflTeams.includes(body.topmiddle)){ // NFL + Others
    if(nflTeams.includes(body.leftmiddle)){ // NFL + NFL
      let team1 = body.topmiddle
      let team2 = body.leftmiddle

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //NFL + Stat
      let nflteam = body.topmiddle
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //NFL + College
      let nflteam = body.topmiddle
      let collegeteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topmiddle)){//College + Others
    if(nflTeams.includes(body.leftmiddle)){ //College + NFL
      let collegeteam = body.topmiddle
      let nflteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //College + Stat
      let collegeteam = body.topmiddle
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topmiddle)){//Stat + Others
    if(nflTeams.includes(body.leftmiddle)){ // Stat + NFL
      let nflteam = body.leftmiddle
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //Stat + College
      let collegeteam = body.leftmiddle
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftmiddle)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 6 Query
  if(nflTeams.includes(body.topright)){ // NFL + Others
    if(nflTeams.includes(body.leftmiddle)){ // NFL + NFL
      let team1 = body.topright
      let team2 = body.leftmiddle

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //NFL + Stat
      let nflteam = body.topright
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //NFL + College
      let nflteam = body.topright
      let collegeteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topright)){//College + Others
    if(nflTeams.includes(body.leftmiddle)){ //College + NFL
      let collegeteam = body.topright
      let nflteam = body.leftmiddle

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftmiddle)){ //College + Stat
      let collegeteam = body.topright
      let statCat = pickStatCat(body.leftmiddle)[0]
      let statNum = pickStatCat(body.leftmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topright)){//Stat + Others
    if(nflTeams.includes(body.leftmiddle)){ // Stat + NFL
      let nflteam = body.leftmiddle
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftmiddle)){ //Stat + College
      let collegeteam = body.leftmiddle
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftmiddle)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 7 Query
  if(nflTeams.includes(body.topleft)){ // NFL + Others
    if(nflTeams.includes(body.leftbottom)){ // NFL + NFL
      let team1 = body.topleft
      let team2 = body.leftbottom

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //NFL + Stat
      let nflteam = body.topleft
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //NFL + College
      let nflteam = body.topleft
      let collegeteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topleft)){//College + Others
    if(nflTeams.includes(body.leftbottom)){ //College + NFL
      let collegeteam = body.topleft
      let nflteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //College + Stat
      let collegeteam = body.topleft
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topleft)){//Stat + Others
    if(nflTeams.includes(body.leftbottom)){ // Stat + NFL
      let nflteam = body.leftbottom
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //Stat + College
      let collegeteam = body.leftbottom
      let statCat = pickStatCat(body.topleft)[0]
      let statNum = pickStatCat(body.topleft)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftbottom)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 8 Query
  if(nflTeams.includes(body.topmiddle)){ // NFL + Others
    if(nflTeams.includes(body.leftbottom)){ // NFL + NFL
      let team1 = body.topmiddle
      let team2 = body.leftbottom

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //NFL + Stat
      let nflteam = body.topmiddle
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //NFL + College
      let nflteam = body.topmiddle
      let collegeteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topmiddle)){//College + Others
    if(nflTeams.includes(body.leftbottom)){ //College + NFL
      let collegeteam = body.topmiddle
      let nflteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //College + Stat
      let collegeteam = body.topmiddle
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topmiddle)){//Stat + Others
    if(nflTeams.includes(body.leftbottom)){ // Stat + NFL
      let nflteam = body.leftbottom
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //Stat + College
      let collegeteam = body.leftbottom
      let statCat = pickStatCat(body.topmiddle)[0]
      let statNum = pickStatCat(body.topmiddle)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftbottom)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }

  //Box 9 Query
  if(nflTeams.includes(body.topright)){ // NFL + Others
    if(nflTeams.includes(body.leftbottom)){ // NFL + NFL
      let team1 = body.topright
      let team2 = body.leftbottom

      playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //NFL + Stat
      let nflteam = body.topright
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //NFL + College
      let nflteam = body.topright
      let collegeteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    }
  } else if(collegeTeams.includes(body.topright)){//College + Others
    if(nflTeams.includes(body.leftbottom)){ //College + NFL
      let collegeteam = body.topright
      let nflteam = body.leftbottom

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
    } else if(statCategories.includes(body.leftbottom)){ //College + Stat
      let collegeteam = body.topright
      let statCat = pickStatCat(body.leftbottom)[0]
      let statNum = pickStatCat(body.leftbottom)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //College + College
      playerBoxes.push('2 Colleges')
    }
  } else if(statCategories.includes(body.topright)){//Stat + Others
    if(nflTeams.includes(body.leftbottom)){ // Stat + NFL
      let nflteam = body.leftbottom
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
    } else if(collegeTeams.includes(body.leftbottom)){ //Stat + College
      let collegeteam = body.leftbottom
      let statCat = pickStatCat(body.topright)[0]
      let statNum = pickStatCat(body.topright)[1]

      playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
    } else if(statCategories.includes(body.leftbottom)){ //Stat + Stat
      playerBoxes.push('2 Stats')
    }
  } else {
    console.log("Invalid category")
  }


  return(playerBoxes)
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

const nflTeams = [
  "ARI",
  "ATL",
  "BAL",
  "BUF",
  "CAR",
  "CHI",
  "CIN",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GNB",
  "HOU",
  "IND",
  "JAX",
  "KAN",
  "LVR",
  "LAC",
  "LAR",
  "MIA",
  "MIN",
  "NWE",
  "NOR",
  "NYG",
  "NYJ",
  "PHI",
  "PIT",
  "SFO",
  "SEA",
  "TAM",
  "TEN",
  "WAS"
]

const statCategories = [
  "pass5000",
  "pass4000",
  "pass3000",
  "pass35TD",
  "pass30TD",
  "pass25TD",
  "rush2000",
  "rush1500",
  "rush1250",
  "rush1000",
  "rush20TD",
  "rush15TD",
  "rush10TD",
  "rec1750",
  "rec1500",
  "rec1250",
  "rec1000",
  "rec15TD",
  "rec10TD",
  "recep110",
  "recep100",
  "careerPassYds50000",
  "careerPassYds30000",
  "careerPassYds20000",
  "careerPassTD400",
  "careerPassTD300",
  "careerPassTD200",
  "careerRushYds10000",
  "careerRushYds7500",
  "careerRushYds5000",
  "careerRushTD100",
  "careerRushTD75",
  "careerRushTD50",
  "careerRecYds12500",
  "careerRecYds10000",
  "careerRecYds7500",
  "careerRecTD100",
  "careerRecTD75",
  "careerRecTD50"
]

const collegeTeams = [
  "Abilene Christian",
  "Adams St.",
  "Air Force",
  "Akron",
  "Ala-Birmingham",
  "Alabama",
  "Alabama A&M",
  "Alabama St.",
  "Albany (NY)",
  "Albany State (GA)",
  "Albion",
  "Alcorn St.",
  "Allegheny",
  "Allen",
  "Alma",
  "American Int.",
  "Amherst",
  "Anderson (IN)",
  "Angelo State (TX)",
  "Appalachian St.",
  "Arizona",
  "Arizona St.",
  "Ark-Pine Bluff",
  "Arkansas",
  "Arkansas St.",
  "Arkansas Tech",
  "Arkansas-Monticello",
  "Army",
  "Ashland",
  "Assumption",
  "Auburn",
  "Augsburg",
  "Augusta State (GA)",
  "Augustana (IL)",
  "Augustana (SD)",
  "Austin Peay St.",
  "Austria Technical",
  "Azusa Pacific",
  "BYU",
  "Baker",
  "Bakersfield JC",
  "Ball St.",
  "Bates",
  "Baylor",
  "Belgrade",
  "Belhaven",
  "Beloit",
  "Bemidji St.",
  "Benedictine",
  "Bentley College",
  "Berry",
  "Bethune-Cookman",
  "Bishop",
  "Black Hills St.",
  "Bloomsburg",
  "Bluffton",
  "Boise St.",
  "Boston Col.",
  "Boston Univ.",
  "Bowie St.",
  "Bowling Green",
  "Bradley",
  "British Columbia",
  "Brockport St.",
  "Brown",
  "Bryant",
  "Bucknell",
  "Buffalo",
  "Butler",
  "Butte JC (CA)",
  "C.W. Post",
  "Cal Poly-Pomona",
  "Cal Poly-San Luis Obispo",
  "Cal State-Bakersfield",
  "Cal State-Chico",
  "Cal State-Fullerton",
  "Cal State-Hayward",
  "Cal State-Northridge",
  "Calgary",
  "California",
  "California (PA)",
  "California Lutheran",
  "Cameron",
  "Canisius",
  "Carroll (MT)",
  "Carson-Newman",
  "Carthage",
  "Catawba",
  "Central Arkansas",
  "Central College (IA)",
  "Central Connecticut St.",
  "Central Florida",
  "Central Florida CC",
  "Central Michigan",
  "Central Missouri St.",
  "Central Oklahoma",
  "Central State (OH)",
  "Central Washington",
  "Centre",
  "Chadron St.",
  "Chapman",
  "Charleston (WV)",
  "Charleston Southern",
  "Charlotte",
  "Chattanooga",
  "Cheyney",
  "Cincinnati",
  "Clarion",
  "Clark (GA)",
  "Clemson",
  "Clinch Valley",
  "Coast Guard",
  "Coastal Carolina",
  "Coe College",
  "Colgate",
  "Colorado",
  "Colorado Col.",
  "Colorado Mesa",
  "Colorado St.",
  "Colorado State-Pueblo",
  "Columbia",
  "Compton CC (CA)",
  "Concordia (IL)",
  "Concordia (NE)",
  "Concordia (QB)",
  "Concordia-Moorhead (MN)",
  "Concordia-St.Paul (MN)",
  "Connecticut",
  "Cornell",
  "Corpus Christi",
  "Cortland St.",
  "Culver-Stockton",
  "Cumberlands",
  "Dana",
  "Dartmouth",
  "Davidson",
  "Dayton",
  "DePauw",
  "Deakin (Australia)",
  "Defiance",
  "Delaware",
  "Delaware St.",
  "Delaware Valley",
  "Delta St.",
  "Detroit Mercy",
  "Doane",
  "Drake",
  "Dubuque",
  "Duke",
  "Duquesne",
  "East Carolina",
  "East Central (OK)",
  "East Mississippi CC",
  "East Stroudsburg",
  "East Tennessee St.",
  "East. Illinois",
  "East. Kentucky",
  "East. Michigan",
  "East. Montana",
  "East. New Mexico",
  "East. Oregon",
  "East. Washington",
  "Edinboro",
  "Edward Waters",
  "Elizabeth City St.",
  "Elmhurst",
  "Elon",
  "Emporia St.",
  "Evangel (MO)",
  "Evansville",
  "Fairmont St.",
  "Fayetteville St.",
  "Ferris St.",
  "Ferrum",
  "Findlay",
  "Fisk",
  "Florida",
  "Florida A&M",
  "Florida Atlantic",
  "Florida International",
  "Florida St.",
  "Florida Tech",
  "Fordham",
  "Fort Hays St.",
  "Fort Lewis",
  "Fort Valley St.",
  "Framingham St.",
  "Franklin & Marshall",
  "Frederick College",
  "Fresno St.",
  "Frostburg St.",
  "Furman",
  "Garden City (KS)",
  "Gardner-Webb",
  "George Washington",
  "Georgetown (KY)",
  "Georgia",
  "Georgia Southern",
  "Georgia St.",
  "Georgia Tech",
  "Gettysburg",
  "Graceland College (IA)",
  "Grambling St.",
  "Grand Valley St.",
  "Greenville",
  "Grove City",
  "Gustavus Adolphus",
  "Hamline",
  "Hampton",
  "Harding",
  "Harvard",
  "Hastings",
  "Hawaii",
  "Heidelberg",
  "Henderson St.",
  "Hillsdale",
  "Hobart",
  "Hofstra",
  "Holy Cross",
  "Houston",
  "Houston Baptist",
  "Howard",
  "Howard Payne",
  "Humboldt St.",
  "ITESM Monterey",
  "Idaho",
  "Idaho St.",
  "Illinois",
  "Illinois St.",
  "Incarnate Word",
  "Indiana",
  "Indiana (PA)",
  "Indiana St.",
  "Iona",
  "Iowa",
  "Iowa St.",
  "Itawamba (MS)",
  "Jackson St.",
  "Jacksonville",
  "Jacksonville St.",
  "James Madison",
  "Jamestown",
  "John Carroll",
  "Johnson C. Smith",
  "Kansas",
  "Kansas St.",
  "Kent St.",
  "Kentucky",
  "Kentucky St.",
  "Kentucky Wesleyan",
  "King Alfred's (England)",
  "Knox",
  "Knoxville",
  "Kutztown (PA)",
  "LSU",
  "La Verne",
  "La-Monroe",
  "Lafayette",
  "Lakeland",
  "Lamar",
  "Lambuth",
  "Lane",
  "Langston",
  "Laval",
  "Lehigh",
  "Lenoir-Rhyne",
  "Lewis & Clark",
  "Liberty",
  "Limestone",
  "Lincoln (MO)",
  "Lindenwood",
  "Linfield",
  "Livingstone",
  "Lock Haven",
  "Long Beach CC",
  "Long Beach St.",
  "Los Angeles St.",
  "Louisiana",
  "Louisiana College",
  "Louisiana Tech",
  "Louisville",
  "Loyola (LA)",
  "Macalester",
  "Maine",
  "Malone",
  "Manitoba",
  "Marian",
  "Marist",
  "Marquette",
  "Mars Hill",
  "Marshall",
  "Mary Hardin-Baylor",
  "Maryland",
  "Massachusetts",
  "McGill",
  "McKendree University",
  "McMurry",
  "McNeese St.",
  "Md-Eastern Shore",
  "Memphis",
  "Menlo",
  "Mercer",
  "Merchant Marine",
  "Metro State",
  "Miami (FL)",
  "Miami (OH)",
  "Michigan",
  "Michigan St.",
  "Michigan Tech",
  "MidAmerica Nazarene University",
  "Middle Tenn. St.",
  "Midwestern St.",
  "Miles",
  "Millersville",
  "Millikin",
  "Millsaps",
  "Milton",
  "Minnesota",
  "Minnesota St.",
  "Minnesota-Duluth",
  "Minot St.",
  "Miss. Valley St.",
  "Mississippi",
  "Mississippi Col.",
  "Mississippi Delta CC",
  "Mississippi St.",
  "Missouri",
  "Missouri S&T",
  "Missouri Southern",
  "Missouri State",
  "Missouri Valley",
  "Missouri Western St.",
  "Monmouth",
  "Monmouth (IL)",
  "Montana",
  "Montana St.",
  "Montana Tech",
  "Montclair St.",
  "Montreal",
  "Moorhead State (MN)",
  "Moraine Valley CC (IL)",
  "Morehead St.",
  "Morehouse",
  "Morgan St.",
  "Morningside",
  "Morris Brown",
  "Mount San Antonio JC",
  "Mount Senario",
  "Mount Union",
  "Murray St.",
  "Muskingum",
  "NE Illinois",
  "NE State (OK)",
  "NW (IA)",
  "NW Missouri St.",
  "NW Oklahoma St.",
  "Navy",
  "Nebraska",
  "Nebraska Wesleyan",
  "Nebraska-Kearney",
  "Nebraska-Omaha",
  "Nevada",
  "New Hampshire",
  "New Haven",
  "New Mex. Highlands",
  "New Mexico",
  "New Mexico St.",
  "New York Tech",
  "Newberry",
  "Newport (Wales)",
  "Nicholls St.",
  "None",
  "Norfolk St.",
  "North Alabama",
  "North Carolina",
  "North Carolina A&T",
  "North Carolina Central",
  "North Carolina St.",
  "North Carolina-Pembroke",
  "North Central",
  "North Dakota",
  "North Dakota St.",
  "North Greenville",
  "North Park",
  "North Texas",
  "Northeast Mississippi CC",
  "Northeastern",
  "Northern Arizona",
  "Northern Colorado",
  "Northern Illinois",
  "Northern Iowa",
  "Northern Michigan",
  "Northern State Univ.",
  "Northern Virginia CC",
  "Northland (WI)",
  "Northwestern",
  "Northwestern St. (LA)",
  "Northwood",
  "Norwich",
  "Notre Dame",
  "Occidental",
  "Ohio",
  "Ohio Northern",
  "Ohio St.",
  "Ohio Wesleyan",
  "Oklahoma",
  "Oklahoma St.",
  "Old Dominion",
  "Oregon",
  "Oregon St.",
  "Oregon Tech",
  "Ottawa (KS)",
  "Otterbein",
  "Ouachita Baptist",
  "Pacific",
  "Pacific (OR)",
  "Pacific Lutheran",
  "Palomar (CA)",
  "Panhandle State (OK)",
  "Parsons",
  "Pasadena CC",
  "Penn St.",
  "Pennsylvania",
  "Philander Smith",
  "Phoenix College (JC)",
  "Pittsburg St.",
  "Pittsburgh",
  "Pittsburgh-Johnstown",
  "Plymouth St.",
  "Portland St.",
  "Prairie View A&M",
  "Presbyterian",
  "Pretoria",
  "Princeton",
  "Principia",
  "Puget Sound",
  "Purdue",
  "Queens (Canada)",
  "Redlands",
  "Regina",
  "Rensselaer Polytechnic Institute",
  "Rhode Island",
  "Rhodes",
  "Rice",
  "Richmond",
  "Robert Morris",
  "Rocky Mountain",
  "Rowan",
  "Rutgers",
  "S.F. Austin",
  "SE Missouri St.",
  "SE Oklahoma St.",
  "SMU",
  "SW Oklahoma St.",
  "Sacramento St.",
  "Sacred Heart",
  "Saginaw Valley St.",
  "Saint John's (MN)",
  "Salem",
  "Salisbury",
  "Sam Houston St.",
  "Samford",
  "San Diego",
  "San Diego St.",
  "San Francisco",
  "San Francisco St.",
  "San Jose St.",
  "Santa Clara",
  "Santa Rosa JC",
  "Savannah St.",
  "Seattle",
  "Shaw",
  "Shepherd",
  "Sherbrooke",
  "Shippensburg",
  "Simon Fraser",
  "Sioux Falls",
  "Slippery Rock",
  "Sonoma St.",
  "South Alabama",
  "South Carolina",
  "South Carolina St.",
  "South Dakota",
  "South Dakota St.",
  "South Florida",
  "Southeastern Louisiana",
  "Southern",
  "Southern Arkansas",
  "Southern Connecticut St.",
  "Southern Illinois",
  "Southern Miss",
  "Southern Oregon",
  "Southern Utah",
  "Springfield",
  "St. Augustine's",
  "St. Cloud St.",
  "St. Francis (PA)",
  "St. Francis Xavier (NS)",
  "St. John's (NY)",
  "St. Joseph's (IN)",
  "St. Joseph's (PA)",
  "St. Lawrence",
  "St. Leo",
  "St. Louis",
  "St. Mary's (CA)",
  "St. Mary's (Canada)",
  "St. Norbert",
  "St. Paul's",
  "St. Thomas",
  "Stanford",
  "Stetson",
  "Stillman",
  "Stony Brook",
  "Syracuse",
  "TCU",
  "Tabor",
  "Tampa",
  "Tarkio",
  "Tarleton St.",
  "Taylor",
  "Temple",
  "Tennessee",
  "Tennessee St.",
  "Tennessee Tech",
  "Texas",
  "Texas A&M",
  "Texas A&M-Commerce",
  "Texas A&M-Kingsville",
  "Texas Southern",
  "Texas St.",
  "Texas Tech",
  "Texas-Arlington",
  "Texas-El Paso",
  "Texas-San Antonio",
  "The Citadel",
  "Thiel",
  "Tiffin",
  "Toledo",
  "Toronto",
  "Towson",
  "Trinity (CT)",
  "Trinity (IL)",
  "Trinity (TX)",
  "Trinity Valley CC (TX)",
  "Troy",
  "Truman St.",
  "Tufts",
  "Tulane",
  "Tulsa",
  "Tusculum",
  "Tuskegee",
  "U.S. International",
  "UC Davis",
  "UC Irvine",
  "UC Riverside",
  "UC Santa Barbara",
  "UCLA",
  "UNLV",
  "USC",
  "UT Martin",
  "Union (KY)",
  "Union (NY)",
  "University of Alberta",
  "Upper Iowa",
  "Upsala",
  "Utah",
  "Utah St.",
  "VMI",
  "Valdosta St.",
  "Valencia CC (FL)",
  "Valparaiso",
  "Vanderbilt",
  "Ventura College",
  "Villanova",
  "Virginia",
  "Virginia Commonwealth",
  "Virginia St.",
  "Virginia Tech",
  "Virginia Union",
  "Wabash",
  "Wagner",
  "Wake Forest",
  "Wake Technical CC",
  "Walla Walla CC (WA)",
  "Washburn",
  "Washington",
  "Washington (MO)",
  "Washington St.",
  "Wayne State (MI)",
  "Wayne State (NE)",
  "Waynesburg",
  "Webber International",
  "Weber St.",
  "Wesley",
  "West Alabama",
  "West Chester",
  "West Florida",
  "West Georgia",
  "West Liberty St.",
  "West Texas A&M",
  "West Virginia",
  "West Virginia St.",
  "West Virginia Tech",
  "West Virginia Wesleyan",
  "Western Carolina",
  "Western Illinois",
  "Western Kentucky",
  "Western Michigan",
  "Western New Mexico",
  "Western Ontario",
  "Western Oregon",
  "Western St. (CO)",
  "Western Washington",
  "Westminster (PA)",
  "Westminster (UT)",
  "Wheaton",
  "Whittier",
  "Whitworth",
  "Wichita St.",
  "Widener",
  "Wiley",
  "Willamette",
  "William & Mary",
  "William Jewell",
  "William Paterson",
  "William Penn",
  "Williams",
  "Wingate",
  "Winona St.",
  "Winston-Salem St.",
  "Wisconsin",
  "Wisconsin-Eau Claire",
  "Wisconsin-LaCrosse",
  "Wisconsin-Milwaukee",
  "Wisconsin-Platteville",
  "Wisconsin-Stevens Point",
  "Wisconsin-Stout",
  "Wisconsin-Superior",
  "Wisconsin-Whitewater",
  "Wittenberg",
  "Wofford",
  "Wooster",
  "Wyoming",
  "Xavier (OH)",
  "Yale",
  "Yankton",
  "York",
  "Youngstown St."
]