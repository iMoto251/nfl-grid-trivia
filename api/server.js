const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs')

    const app = express();

app.use(express.static(path.join(__dirname, '/public')))

const sqlite3 = require('sqlite3').verbose();
const dbFile = path.resolve(__dirname, 'database/players.sqlite')
    var dbExists = fs.existsSync(dbFile);

if (!dbExists) {
    fs.openSync(dbFile, 'w');
}

var db = new sqlite3.Database(dbFile);
app.use(cors());
app.use(express.json());

let correctAnswers = []
let logos = []

let gridSets = 0

// app.post("/dailyGame", (req,res) =>{
//   console.log("Daily Choices")

// })

app.post("/checkchoices", (req, res) => {
    correctAnswers = []
    getLogo(req.body)
    let sql = buildQuery(req.body)

        for (let i = 0; i < sql.length; i++) {
            let answerArray = []
            db.all(sql[i], [], (err, rows) => {
                if (rows === undefined) {
                    answerArray.push()
                } else {
                    rows.forEach((row) => {
                        answerArray.push(row.name)
                    })
                }
            })
            correctAnswers.push(answerArray)
        }

        var obj = {
        queryGood: "QueryGood",
        logo1: logos[0],
        logo2: logos[1],
        logo3: logos[2],
        logo4: logos[3],
        logo5: logos[4],
        logo6: logos[5],
    }
    res.send(JSON.stringify(obj))
})

app.post("/checkanswers", (req, res) => {
    for (let i = 0; i < correctAnswers.length; i++) {
        if (i === correctAnswers.length - 1) {}
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
    gridSets += 1
    console.log("Total Grids played: " + gridSets)
    return 0;
})

app.post("/testanswers", (req, res) => {

    if (correctAnswers[req.body.box - 1].includes(req.body.answer)) {
        res.send(JSON.stringify("Correct"))
    } else {
        res.send(JSON.stringify("Incorrect"))
    }
})

function pickStatCat(selection) {
    let statCat = ''
        let statNum = ''

        switch (selection) {
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

        return [statCat, statNum]
}

function buildQuery(body) {
    let playerBoxes = []

    //Box 1 Query
    if (nflTeams.includes(body.topleft || body.mobiletopleft)) { // NFL + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // NFL + NFL
            let team1 = body.topleft || body.mobiletopleft
            let team2 = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //NFL + Stat
            let nflteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //NFL + College
            let nflteam = body.topleft || body.mobiletopleft
            let collegeteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let nflteam = body.topleft || body.mobiletopleft
            let conference = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topleft || body.mobiletopleft)) { //College + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { //College + NFL
            let collegeteam = body.topleft || body.mobiletopleft
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topleft || body.mobiletopleft)) { //Stat + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // Stat + NFL
            let nflteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //Stat + College
            let collegeteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum1 = pickStatCat(body.topleft || body.mobiletopleft)[1]
            let statCat2 = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum2 = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
            //playerBoxes.push('2 Stats')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)){ //Stat + College Conference
            let conference = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topleft || body.mobiletopleft)) {
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let conference = body.topleft || body.mobiletopleft
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 2 Query
    if (nflTeams.includes(body.topmiddle || body.mobiletopmiddle)) { // NFL + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // NFL + NFL
            let team1 = body.topmiddle || body.mobiletopmiddle
            let team2 = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //NFL + Stat
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //NFL + College
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let collegeteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let conference = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topmiddle || body.mobiletopmiddle)) { //College + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { //College + NFL
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topmiddle || body.mobiletopmiddle)) { //Stat + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // Stat + NFL
            let nflteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //Stat + College
            let collegeteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]
            let statCat2 = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum2 = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)){ //Stat + College Conference
            let conference = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topmiddle || body.mobiletopmiddle)) {
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let conference = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 3 Query
    if (nflTeams.includes(body.topright || body.mobiletopright)) { // NFL + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // NFL + NFL
            let team1 = body.topright || body.mobiletopright
                let team2 = body.lefttop || body.mobilelefttop

                playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //NFL + Stat
            let nflteam = body.topright || body.mobiletopright
                let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
                let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

                playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //NFL + College
            let nflteam = body.topright || body.mobiletopright
                let collegeteam = body.lefttop || body.mobilelefttop

                playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let nflteam = body.topright || body.mobiletopright
            let conference = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topright || body.mobiletopright)) { //College + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { //College + NFL
            let collegeteam = body.topright || body.mobiletopright
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topright || body.mobiletopright)) { //Stat + Others
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) { // Stat + NFL
            let nflteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //Stat + College
            let collegeteam = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum1 = pickStatCat(body.topright || body.mobiletopright)[1]
            let statCat2 = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum2 = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)){ //Stat + College Conference
            let conference = body.lefttop || body.mobilelefttop
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topright || body.mobiletopright)) {
        if (nflTeams.includes(body.lefttop || body.mobilelefttop)) {//NFL + College Conference
            let conference = body.topright || body.mobiletopright
            let nflteam = body.lefttop || body.mobilelefttop

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobilelefttop)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.lefttop || body.mobilelefttop)[0]
            let statNum = pickStatCat(body.lefttop || body.mobilelefttop)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.lefttop || body.mobilelefttop)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.lefttop || body.mobilelefttop)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 4 Query
    if (nflTeams.includes(body.topleft || body.mobiletopleft)) { // NFL + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // NFL + NFL
            let team1 = body.topleft || body.mobiletopleft
            let team2 = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + Stat
            let nflteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + College
            let nflteam = body.topleft || body.mobiletopleft
            let collegeteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topleft || body.mobiletopleft
            let conference = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topleft || body.mobiletopleft)) { //College + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + NFL
            let collegeteam = body.topleft || body.mobiletopleft
            let nflteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + Stat
        let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topleft || body.mobiletopleft)) { //Stat + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // Stat + NFL
            let nflteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + College
            let collegeteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum1 = pickStatCat(body.topleft || body.mobiletopleft)[1]
            let statCat2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)){ //Stat + College Conference
            let conference = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topleft || body.mobiletopleft)) {
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let conference = body.topleft || body.mobiletopleft
            let nflteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftmiddle)) { //College + Stat
            let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 5 Query
    if (nflTeams.includes(body.topmiddle || body.mobiletopmiddle)) { // NFL + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // NFL + NFL
            let team1 = body.topmiddle || body.mobiletopmiddle
                let team2 = body.leftmiddle || body.mobileleftmiddle

                playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + Stat
            let nflteam = body.topmiddle || body.mobiletopmiddle
                let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
                let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

                playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + College
            let nflteam = body.topmiddle || body.mobiletopmiddle
                let collegeteam = body.leftmiddle || body.mobileleftmiddle

                playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let conference = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topmiddle || body.mobiletopmiddle)) { //College + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + NFL
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topmiddle || body.mobiletopmiddle)) { //Stat + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // Stat + NFL
            let nflteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + College
            let collegeteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]
            let statCat2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)){ //Stat + College Conference
            let conference = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topmiddle || body.mobiletopmiddle)) {
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let conference = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftmiddle)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 6 Query
    if (nflTeams.includes(body.topright || body.mobiletopright)) { // NFL + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // NFL + NFL
            let team1 = body.topright || body.mobiletopright
            let team2 = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + Stat
            let nflteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //NFL + College
            let nflteam = body.topright || body.mobiletopright
            let collegeteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topright || body.mobiletopright
            let conference = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topright || body.mobiletopright)) { //College + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + NFL
            let collegeteam = body.topright || body.mobiletopright
                let nflteam = body.leftmiddle || body.mobileleftmiddle

                playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
                let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
                let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

                playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topright || body.mobiletopright)) { //Stat + Others
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { // Stat + NFL
            let nflteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + College
            let collegeteam = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftmiddle || body.mobileleftmiddle)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum1 = pickStatCat(body.topright || body.mobiletopright)[1]
            let statCat2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum2 = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)){ //Stat + College Conference
            let conference = body.leftmiddle || body.mobileleftmiddle
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topright || body.mobiletopright)) {
        if (nflTeams.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let conference = body.topright || body.mobiletopright
            let nflteam = body.leftmiddle || body.mobileleftmiddle

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftmiddle)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[0]
            let statNum = pickStatCat(body.leftmiddle || body.mobileleftmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftmiddle || body.mobileleftmiddle)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 7 Query
    if (nflTeams.includes(body.topleft || body.mobiletopleft)) { // NFL + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // NFL + NFL
            let team1 = body.topleft || body.mobiletopleft
            let team2 = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + Stat
            let nflteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + College
            let nflteam = body.topleft || body.mobiletopleft
            let collegeteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topleft || body.mobiletopleft
            let conference = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topleft || body.mobiletopleft)) { //College + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + NFL
            let collegeteam = body.topleft || body.mobiletopleft
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topleft || body.mobiletopleft)) { //Stat + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // Stat + NFL
            let nflteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + College
            let collegeteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum1 = pickStatCat(body.topleft || body.mobiletopleft)[1]
            let statCat2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)){ //Stat + College Conference
            let conference = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topleft || body.mobiletopleft)[0]
            let statNum = pickStatCat(body.topleft || body.mobiletopleft)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topleft || body.mobiletopleft)) {
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) {//NFL + College Conference
            let conference = body.topleft || body.mobiletopleft
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topleft || body.mobiletopleft
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 8 Query
    if (nflTeams.includes(body.topmiddle || body.mobiletopmiddle)) { // NFL + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // NFL + NFL
            let team1 = body.topmiddle || body.mobiletopmiddle
            let team2 = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + Stat
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + College
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let collegeteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topmiddle || body.mobiletopmiddle
            let conference = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topmiddle || body.mobiletopmiddle)) { //College + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + NFL
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topmiddle || body.mobiletopmiddle)) { //Stat + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // Stat + NFL
            let nflteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + College
            let collegeteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum1 = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]
            let statCat2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)){ //Stat + College Conference
            let conference = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topmiddle || body.mobiletopmiddle)[0]
            let statNum = pickStatCat(body.topmiddle || body.mobiletopmiddle)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topmiddle || body.mobiletopmiddle)) {
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) {//NFL + College Conference
            let conference = body.topmiddle || body.mobiletopmiddle
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topmiddle || body.mobiletopmiddle
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    //Box 9 Query
    if (nflTeams.includes(body.topright || body.mobiletopright)) { // NFL + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // NFL + NFL
            let team1 = body.topright || body.mobiletopright
            let team2 = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT name FROM playerTEAMS where played${team1}='True' and played${team2}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + Stat
            let nflteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //NFL + College
            let nflteam = body.topright || body.mobiletopright
            let collegeteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (collegeConferences.includes(body.leftmiddle || body.mobileleftmiddle)) {//NFL + College Conference
            let nflteam = body.topright || body.mobiletopright
            let conference = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        }
    } else if (collegeTeams.includes(body.topright || body.mobiletopright)) { //College + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + NFL
            let collegeteam = body.topright || body.mobiletopright
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerTeams ON players.id=playerTeams.id WHERE players.college='${collegeteam}' and playerTeams.played${nflteam}='True';`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('2 Colleges')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('College and Conference')
        }
    } else if (statCategories.includes(body.topright || body.mobiletopright)) { //Stat + Others
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) { // Stat + NFL
            let nflteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.played${nflteam}='True' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + College
            let collegeteam = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (statCategories.includes(body.leftbottom || body.mobileleftbottom)) { //Stat + Stat
            let statCat1 = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum1 = pickStatCat(body.topright || body.mobiletopright)[1]
            let statCat2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum2 = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT name FROM playerStats WHERE ${statCat1}>${statNum1} AND ${statCat2}>${statNum2}`)
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)){ //Stat + College Conference
            let conference = body.leftbottom || body.mobileleftbottom
            let statCat = pickStatCat(body.topright || body.mobiletopright)[0]
            let statNum = pickStatCat(body.topright || body.mobiletopright)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerStats ON playerStats.id=players.id WHERE playerStats.${statCat}>${statNum} and collegeConferences.conference='${conference}';`)
        }
    } else if(collegeConferences.includes(body.topright || body.mobiletopright)) {
        if (nflTeams.includes(body.leftbottom || body.mobileleftbottom)) {//NFL + College Conference
            let conference = body.topright || body.mobiletopright
            let nflteam = body.leftbottom || body.mobileleftbottom

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN collegeConferences ON players.college=collegeConferences.team INNER JOIN playerTeams ON playerTeams.id=players.id WHERE playerTeams.played${nflteam}='True' and collegeConferences.conference='${conference}';`)
        } else if (statCategories.includes(body.lefttop || body.mobileleftbottom)) { //College + Stat
            let collegeteam = body.topright || body.mobiletopright
            let statCat = pickStatCat(body.leftbottom || body.mobileleftbottom)[0]
            let statNum = pickStatCat(body.leftbottom || body.mobileleftbottom)[1]

            playerBoxes.push(`SELECT players.name FROM players INNER JOIN playerStats ON players.id=playerStats.id WHERE players.college='${collegeteam}' and playerStats.${statCat}>${statNum};`)
        } else if (collegeTeams.includes(body.leftbottom || body.mobileleftbottom)) { //College + College
            playerBoxes.push('College and Conference')
        } else if (collegeConferences.includes(body.leftbottom || body.mobileleftbottom)) {
            playerBoxes.push('2 Conferences')
        }
    } else {
        console.log("Invalid category")
    }

    return (playerBoxes)
}

function getLogo(body) {
    logos = []
    let teamArr = [
        body.topleft || body.mobiletopleft,
        body.topmiddle || body.mobiletopmiddle,
        body.topright || body.mobiletopright,
        body.lefttop || body.mobilelefttop,
        body.leftmiddle || body.mobileleftmiddle,
        body.leftbottom || body.mobileleftbottom
    ]

    for (let i = 0; i < teamArr.length; i++) {
        logos.push(logoSelectionFunction(teamArr[i]))
    }

}

function logoSelectionFunction(team) {
    let logo = ''

        switch (team) {
        case "ACC":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Atlantic_Coast_Conference_logo.svg/2560px-Atlantic_Coast_Conference_logo.svg.png"
                break;
        case "American":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/American_Athletic_Conference_logo.svg/1200px-American_Athletic_Conference_logo.svg.png"
                break;
        case "Big 12":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Big_12_Conference_%28cropped%29_logo.svg/1200px-Big_12_Conference_%28cropped%29_logo.svg.png"
                break;
        case "Big Ten":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Big_Ten_Conference_logo.svg/2560px-Big_Ten_Conference_logo.svg.png"
                break;
        case "CUSA":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Conference_USA_logo_%282013-2023%29.svg/2560px-Conference_USA_logo_%282013-2023%29.svg.png"
                break;
        case "Independent":
            logo = "https://sportsfly.cbsistatic.com/fly-0514/bundles/sportsmediacss/images/conference-logos/ncaaf/IA.svg"
                break;
        case "MAC":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mid-American_Conference_logo.svg/160px-Mid-American_Conference_logo.svg.png"
                break;
        case "Mountain West":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mountain_West_Conference_logo.svg/1200px-Mountain_West_Conference_logo.svg.png"
                break;
        case "Pac 12":
            logo = "https://loodibee.com/wp-content/uploads/Pac-12_logo.png"
                break;
        case "SEC":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Southeastern_Conference_logo.svg/2048px-Southeastern_Conference_logo.svg.png"
                break;
        case "Sun Belt":
            logo = "https://1000logos.net/wp-content/uploads/2022/02/Sun-Belt-Conference-logo.png"
                break;
        case "Other":
            logo = "https://npr.brightspotcdn.com/legacy/sites/ketr/files/202003/NCAA-D2.jpg"
                break;
        case "ARI":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/ARI.svg"
                break;
        case "ATL":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/ATL.svg"
                break;
        case "BAL":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/BAL.svg"
                break;
        case "BUF":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/BUF.svg"
                break;
        case "CAR":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/CAR.svg"
                break;
        case "CHI":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/CHI.svg"
                break;
        case "CIN":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/CIN.svg"
                break;
        case "CLE":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/CLE.svg"
                break;
        case "DAL":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/DAL.svg"
                break;
        case "DEN":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/DEN.svg"
                break;
        case "DET":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/DET.svg"
                break;
        case "GNB":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/GB.svg"
                break;
        case "HOU":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/HOU.svg"
                break;
        case "IND":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/IND.svg"
                break;
        case "JAX":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/JAX.svg"
                break;
        case "KAN":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/KC.svg"
                break;
        case "LVR":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/LV.svg"
                break;
        case "LAC":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/LAC.svg"
                break;
        case "LAR":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/LA.svg"
                break;
        case "MIA":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/MIA.svg"
                break;
        case "MIN":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/MIN.svg"
                break;
        case "NWE":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/NE.svg"
                break;
        case "NOR":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/NO.svg"
                break;
        case "NYG":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/NYG.svg"
                break;
        case "NYJ":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/NYJ.svg"
                break;
        case "PHI":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/PHI.svg"
                break;
        case "PIT":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/PIT.svg"
                break;
        case "SFO":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/SF.svg"
                break;
        case "SEA":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/SEA.svg"
                break;
        case "TAM":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/TB.svg"
                break;
        case "TEN":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/TEN.svg"
                break;
        case "WAS":
            logo = "https://static.www.nfl.com/league/api/clubs/logos/WAS.svg"
                break;
        case "pass5000":
            logo = "5000 Yard Passing Season"
                break;
        case "pass4000":
            logo = "4000 Yard Passing Season"
                break;
        case "pass3000":
            logo = "3000 Yard Passing Season"
                break;
        case "pass35TD":
            logo = "35 Passing TD Season"
                break;
        case "pass30TD":
            logo = "30 Passing TD Season"
                break;
        case "pass25TD":
            logo = "25 Passing TD Season"
                break;
        case "rush2000":
            logo = "2000 Yard Rushing Season"
                break;
        case "rush1500":
            logo = "1500 Yard Rushing Season"
                break;
        case "rush1250":
            logo = "1250 Yard Rushing Season"
                break;
        case "rush1000":
            logo = "1000 Yard Rushing Season"
                break;
        case "rush20TD":
            logo = "20 Rushing TD Season"
                break;
        case "rush15TD":
            logo = "15 Rushing TD Season"
                break;
        case "rush10TD":
            logo = "10 Rushing TD Season"
                break;
        case "rec1750":
            logo = "1750 Yard Receiving Season"
                break;
        case "rec1500":
            logo = "1500 Yard Receiving Season"
                break;
        case "rec1250":
            logo = "1250 Yard Receiving Season"
                break;
        case "rec1000":
            logo = "1000 Yard Receiving Season"
                break;
        case "rec15TD":
            logo = "15 Receiving TD Season"
                break;
        case "rec10TD":
            logo = "10 Receiving TD Season"
                break;
        case "recep110":
            logo = "110 Reception Season"
                break;
        case "recep100":
            logo = "100 Reception Season"
                break;
        case "careerPassYds50000":
            logo = "50000 Career Passing Yards"
                break;
        case "careerPassYds30000":
            logo = "30000 Career Passing Yards"
                break;
        case "careerPassYds20000":
            logo = "20000 Career Passing Yards"
                break;
        case "careerPassTD400":
            logo = "400 Career Passing TD"
                break;
        case "careerPassTD300":
            logo = "300 Career Passing TD"
                break;
        case "careerPassTD200":
            logo = "200 Career Passing TD"
                break;
        case "careerRushYds10000":
            logo = "10000 Career Rushing Yards"
                break;
        case "careerRushYds7500":
            logo = "7500 Career Rushing Yards"
                break;
        case "careerRushYds5000":
            logo = "5000 Career Rushing Yards"
                break;
        case "careerRushTD100":
            logo = "100 Career Rushing TD"
                break;
        case "careerRushTD75":
            logo = "75 Career Rushing RD"
                break;
        case "careerRushTD50":
            logo = "50 Career Rushing TD"
                break;
        case "careerRecYds12500":
            logo = "12500 Career Receiving Yards"
                break;
        case "careerRecYds10000":
            logo = "10000 Career Receiving Yards"
                break;
        case "careerRecYds7500":
            logo = "7500 Career Receiving Yards"
                break;
        case "careerRecTD100":
            logo = "100 Career Receiving TD"
                break;
        case "careerRecTD75":
            logo = "75 Career Receiving TD"
                break;
        case "careerRecTD50":
            logo = "50 Career Receiving TD"
                break;
        case "Abilene Christian":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Abilene_Christian_University_seal.svg/1200px-Abilene_Christian_University_seal.svg.png"
                break;
        case "Adams St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Adams_State_Grizzlies_logo.svg/922px-Adams_State_Grizzlies_logo.svg.png"
                break;
        case "Air Force":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Air_Force_Falcons_logo.svg/1200px-Air_Force_Falcons_logo.svg.png"
                break;
        case "Akron":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/University_of_Akron_logo.svg/180px-University_of_Akron_logo.svg.png"
                break;
        case "Ala-Birmingham":
            logo = "https://1000logos.net/wp-content/uploads/2020/01/UAB-Blazers-Logo-1996.png"
                break;
        case "Alabama":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alabama_Crimson_Tide_logo.svg/2048px-Alabama_Crimson_Tide_logo.svg.png"
                break;
        case "Alabama A&M":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Alabama_A%26M_Bulldogs_logo.svg/1200px-Alabama_A%26M_Bulldogs_logo.svg.png"
                break;
        case "Alabama St.":
            logo = "https://logos-world.net/wp-content/uploads/2020/06/Alabama-State-Hornets-Logo.png"
                break;
        case "Albany (NY)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Albany_Great_Danes_logo.svg/2560px-Albany_Great_Danes_logo.svg.png"
                break;
        case "Albany State (GA)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Albany_State_Golden_Rams_wordmark.svg/1200px-Albany_State_Golden_Rams_wordmark.svg.png"
                break;
        case "Albion":
            logo = "https://upload.wikimedia.org/wikipedia/commons/d/df/Albion_College_Logo_Purple.png"
                break;
        case "Alcorn St.":
            logo = "https://alcornsports.com/images/logos/site/site.png"
                break;
        case "Allegheny":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/alleghenysports.com/images/responsive_2022/logo_main.png"
                break;
        case "Allen":
            logo = "https://www.allencollege.edu/images/allen/logo.png"
                break;
        case "Alma":
            logo = "https://pbs.twimg.com/profile_images/1109198560967446528/1iNptTrB_400x400.png"
                break;
        case "American Int.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/American_International_Yellow_Jackets_logo.svg/1200px-American_International_Yellow_Jackets_logo.svg.png"
                break;
        case "Amherst":
            logo = "https://www.amherst.edu/system/files/media/Mammoth-Soho-Lockup-Purple-Stomp_0.png&__=1518708585"
                break;
        case "Anderson (IN)":
            logo = "https://anderson.edu/wp-content/uploads/AU_logo_H_OBW-1.svg"
                break;
        case "Angelo State (TX)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Angelo_State_University_logo.svg/1280px-Angelo_State_University_logo.svg.png"
                break;
        case "Appalachian St.":
            logo = "https://uc.appstate.edu/sites/default/files/logos/app-state-block-a-logo-600px.png"
                break;
        case "Arizona":
            logo = "https://seeklogo.com/images/U/university-of-arizona-a-logo-0B223BEA9A-seeklogo.com.png"
                break;
        case "Arizona St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/ASU_Athletics_Logo.svg/2560px-ASU_Athletics_Logo.svg.png"
                break;
        case "Ark-Pine Bluff":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/University_of_Arkansas_at_Pine_Bluff_logo.svg/220px-University_of_Arkansas_at_Pine_Bluff_logo.svg.png"
                break;
        case "Arkansas":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Arkansas_Razorbacks_logo.svg/1200px-Arkansas_Razorbacks_logo.svg.png"
                break;
        case "Arkansas St.":
            logo = "https://www.astate.edu/dotAsset/77d4c5d2-0fc0-4535-8ea6-5e1009050298.png"
                break;
        case "Arkansas Tech":
            logo = "https://www.atu.edu/marcomm/logo/athletic/state-wordmark/ATU_Athletic_State_Wordmark_Full_Color.png"
                break;
        case "Arkansas-Monticello":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ark-monticello_logo_from_NCAA.svg/800px-Ark-monticello_logo_from_NCAA.svg.png"
                break;
        case "Army":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Army_West_Point_logo.svg/1200px-Army_West_Point_logo.svg.png"
                break;
        case "Ashland":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Ashland_Eagles_logo.svg/1200px-Ashland_Eagles_logo.svg.png"
                break;
        case "Assumption":
            logo = "https://dlmrue3jobed1.cloudfront.net/uploads/school/AssumptionUniversity/au_horizontal_blue_301.png"
                break;
        case "Auburn":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Auburn_Tigers_logo.svg/250px-Auburn_Tigers_logo.svg.png?20180711232340"
                break;
        case "Augsburg":
            logo = "https://athletics.augsburg.edu/images/logos/site/site.png"
                break;
        case "Augusta State (GA)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Augusta_State_University_Logo.gif/200px-Augusta_State_University_Logo.gif"
                break;
        case "Augustana (IL)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Augustana_College_wordmark.svg/220px-Augustana_College_wordmark.svg.png"
                break;
        case "Augustana (SD)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Augustana_University_wordmark.svg/220px-Augustana_University_wordmark.svg.png"
                break;
        case "Austin Peay St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Austin_Peay_Athletics_logo.svg/150px-Austin_Peay_Athletics_logo.svg.png"
                break;
        case "Austria Technical":
            logo = "https://upload.wikimedia.org/wikipedia/commons/5/59/TU-Logo-Austria_CMYK.png"
                break;
        case "Azusa Pacific":
            logo = "https://cdn.freebiesupply.com/logos/large/2x/azusa-pacific-university-logo-png-transparent.png"
                break;
        case "BYU":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/BYU_Cougars_logo.svg/2560px-BYU_Cougars_logo.svg.png"
                break;
        case "Baker":
            logo = "https://upload.wikimedia.org/wikipedia/en/3/3b/Baker_University_Wildcats_logo.png"
                break;
        case "Bakersfield JC":
            logo = "https://do-prod-webteam-drupalfiles.s3-us-west-2.amazonaws.com/bcedu/s3fs-public/BC-athletics-logo.png"
                break;
        case "Ball St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Ball_State_Cardinals_logo.svg/1200px-Ball_State_Cardinals_logo.svg.png"
                break;
        case "Bates":
            logo = "https://www.bates.edu/communications/files/2013/01/bates-bobcat-primary3-ko.jpg"
                break;
        case "Baylor":
            logo = "https://upload.wikimedia.org/wikipedia/commons/b/b0/2018_Baylor_Athletics_Logo.png"
                break;
        case "Belgrade":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Belgrade_University_coa.svg/1200px-Belgrade_University_coa.svg.png"
                break;
        case "Belhaven":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Belhaven_Blazers_logo.svg/1200px-Belhaven_Blazers_logo.svg.png"
                break;
        case "Beloit":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Beloit_Logo.png/200px-Beloit_Logo.png"
                break;
        case "Bemidji St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Bemidji_State_Beavers_logo.svg/1200px-Bemidji_State_Beavers_logo.svg.png"
                break;
        case "Benedictine":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Benedictine_Ravens_logo.svg/1200px-Benedictine_Ravens_logo.svg.png"
                break;
        case "Bentley College":
            logo = "https://d2f5upgbvkx8pz.cloudfront.net/sites/default/files/inline-files/Bentley_Logo_Shield_Only_Orange.png"
                break;
        case "Berry":
            logo = "https://www.berry.edu/marketing/brand/_logos/Crestmark_st_281Blue_RGB_600.png"
                break;
        case "Bethune-Cookman":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bethune%E2%80%93Cookman_Wildcats_logo.svg/1200px-Bethune%E2%80%93Cookman_Wildcats_logo.svg.png"
                break;
        case "Bishop":
            logo = "https://www.bishopscollege.lk/wp-content/uploads/2018/07/logo-final.png"
                break;
        case "Black Hills St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Black_Hills_State_University_seal.svg/1200px-Black_Hills_State_University_seal.svg.png"
                break;
        case "Bloomsburg":
            logo = "https://www.bloomu.edu/sites/default/files/2021-10/07BU_head.eps_newbrandcolors-01.png"
                break;
        case "Bluffton":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Bluffton_University_logo.svg/440px-Bluffton_University_logo.svg.png"
                break;
        case "Boise St.":
            logo = "https://logos-world.net/wp-content/uploads/2020/06/Boise-State-Broncos-Logo.png"
                break;
        case "Boston Col.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Boston_College_Eagles_logo.svg/640px-Boston_College_Eagles_logo.svg.png"
                break;
        case "Boston Univ.":
            logo = "https://upload.wikimedia.org/wikipedia/en/1/15/Boston_University_Terriers_logo.svg"
                break;
        case "Bowie St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Bowie_State_University.svg/1200px-Bowie_State_University.svg.png"
                break;
        case "Bowling Green":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Bowling_Green_Falcons_logo.svg/1200px-Bowling_Green_Falcons_logo.svg.png"
                break;
        case "Bradley":
            logo = "https://www.bradley.edu/dotAsset/6e607b04-3f8c-414f-b49c-8e7778147424.png"
                break;
        case "British Columbia":
            logo = "https://brand3.sites.olt.ubc.ca/files/2018/09/5NarrowLogo_ex_768.png"
                break;
        case "Brockport St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/e/ef/Brockp_Gold_Eagles_logo.png"
                break;
        case "Brown":
            logo = "https://1000logos.net/wp-content/uploads/2022/05/Brown-University-Seal.png"
                break;
        case "Bryant":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Bryant_Bulldogs_logo.svg/1200px-Bryant_Bulldogs_logo.svg.png"
                break;
        case "Bucknell":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Bucknell_Bison_logo.svg/1200px-Bucknell_Bison_logo.svg.png"
                break;
        case "Buffalo":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Buffalo_Bulls_Athletic_Logo.svg/1200px-Buffalo_Bulls_Athletic_Logo.svg.png"
                break;
        case "Butler":
            logo = "https://upload.wikimedia.org/wikipedia/en/0/06/Butler_Bulldogs_logo.svg"
                break;
        case "Butte JC (CA)":
            logo = "https://www.butte.edu/_sm180/assets/img/butte-college-header-logo-2x.png"
                break;
        case "C.W. Post":
            logo = "https://d2jyir0m79gs60.cloudfront.net/college/logos/LIU_Post.png"
                break;
        case "Cal Poly-Pomona":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Cal_Poly_Pomona_Broncos_logo.svg/800px-Cal_Poly_Pomona_Broncos_logo.svg.png"
                break;
        case "Cal Poly-San Luis Obispo":
            logo = "https://collegiatewaterpolo.org/wp-content/uploads/2017/08/Cal-Poly-State-W.png"
                break;
        case "Cal State-Bakersfield":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Cal_State_Bakersfield_Roadrunners_logo.svg/1200px-Cal_State_Bakersfield_Roadrunners_logo.svg.png"
                break;
        case "Cal State-Chico":
            logo = "https://www.csuchico.edu/style-guide/visual/_images/institutional-wildcat.jpg"
                break;
        case "Cal State-Fullerton":
            logo = "https://logos-world.net/wp-content/uploads/2020/06/Cal-State-Fullerton-Titans-Logo.png"
                break;
        case "Cal State-Hayward":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/eastbaypioneers.com/images/responsive_2020/logo_secondary.svg"
                break;
        case "Cal State-Northridge":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/CSUN_Matadors_logo.svg/1200px-CSUN_Matadors_logo.svg.png"
                break;
        case "Calgary":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/UofCCoat.svg/800px-UofCCoat.svg.png"
                break;
        case "California":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/California_Golden_Bears_logo.svg/1200px-California_Golden_Bears_logo.svg.png"
                break;
        case "California (PA)":
            logo = "https://calvulcans.com/images/logos/site/site.png"
                break;
        case "California Lutheran":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cal-lutheran_logo_from_NCAA.svg/1200px-Cal-lutheran_logo_from_NCAA.svg.png"
                break;
        case "Cameron":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Cameron_Aggies_logo.svg/1200px-Cameron_Aggies_logo.svg.png"
                break;
        case "Canisius":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Canisius_Golden_Griffins.svg/800px-Canisius_Golden_Griffins.svg.png"
                break;
        case "Carroll (MT)":
            logo = "https://www.commonapp.org/static/2715deb92ca83c8858b382e8974e56f6/carroll-college-montana_361.jpg"
                break;
        case "Carson-Newman":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Carson%E2%80%93Newman_Eagles_logo.svg/1200px-Carson%E2%80%93Newman_Eagles_logo.svg.png"
                break;
        case "Carthage":
            logo = "https://athletics.carthage.edu/images/logos/site/site.png"
                break;
        case "Catawba":
            logo = "https://static.wixstatic.com/media/7383ad_f89e5ea6ed4f44dd98bbe7b7baec92c1~mv2.png/v1/fill/w_400,h_400,al_c,q_85,usm_1.20_1.00_0.01,enc_auto/CBH%20Logo.png"
                break;
        case "Central Arkansas":
            logo = "https://uca.edu/wp-content/uploads/2018/05/ucasports-logo-300x230.png"
                break;
        case "Central College (IA)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Central-ia_logo_from_NCAA.svg/2048px-Central-ia_logo_from_NCAA.svg.png"
                break;
        case "Central Connecticut St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Central_Connecticut_Blue_Devils_logo.svg/1200px-Central_Connecticut_Blue_Devils_logo.svg.png"
                break;
        case "Central Florida":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/UCF_Knights_logo.svg/1200px-UCF_Knights_logo.svg.png"
                break;
        case "Central Florida CC":
            logo = "https://upload.wikimedia.org/wikipedia/commons/6/65/College_of_Central_Florida_Logo.gif"
                break;
        case "Central Michigan":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Central_Michigan_Chippewas_logo.svg/1200px-Central_Michigan_Chippewas_logo.svg.png"
                break;
        case "Central Missouri St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Central_Missouri_Athletics_logo.svg/640px-Central_Missouri_Athletics_logo.svg.png"
                break;
        case "Central Oklahoma":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/University_of_Central_Oklahoma_logo.svg/2304px-University_of_Central_Oklahoma_logo.svg.png"
                break;
        case "Central State (OH)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Central_State_University_seal.svg/1200px-Central_State_University_seal.svg.png"
                break;
        case "Central Washington":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Central_Washington_Wildcats_logo.svg/800px-Central_Washington_Wildcats_logo.svg.png"
                break;
        case "Centre":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Centre_Colonels_logo.svg/2560px-Centre_Colonels_logo.svg.png"
                break;
        case "Chadron St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Chadron_State_Eagles_logo.svg/1200px-Chadron_State_Eagles_logo.svg.png"
                break;
        case "Chapman":
            logo = "https://brand.chapman.edu/wp-content/uploads/2020/05/CU-Master-Brand-2018.png"
                break;
        case "Charleston (WV)":
            logo = "https://pbs.twimg.com/profile_images/1288129260138434560/H2fRq4He_400x400.jpg"
                break;
        case "Charleston Southern":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Charleston_Southern_Buccaneers_logo.svg/1200px-Charleston_Southern_Buccaneers_logo.svg.png"
                break;
        case "Charlotte":
            logo = "https://charlotte49ers.com/images/2020/6/23/C_Charlotte_RGB_7484.png?width=2000"
                break;
        case "Chattanooga":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Chattanooga_Mocs_logo.svg/1200px-Chattanooga_Mocs_logo.svg.png"
                break;
        case "Cheyney":
            logo = "https://upload.wikimedia.org/wikipedia/en/4/4c/Cheyney_University_shield.png"
                break;
        case "Cincinnati":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cincinnati_Bearcats_logo.svg/1200px-Cincinnati_Bearcats_logo.svg.png"
                break;
        case "Clarion":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Clarion_Golden_Eagles_logo.svg/1200px-Clarion_Golden_Eagles_logo.svg.png"
                break;
        case "Clark (GA)":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/b5/ClarkAtlantaPanthers_logo.png"
                break;
        case "Clemson":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/1200px-Clemson_Tigers_logo.svg.png"
                break;
        case "Clinch Valley":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Uva-wise_logo_from_NCAA.svg/2048px-Uva-wise_logo_from_NCAA.svg.png"
                break;
        case "Coast Guard":
            logo = "https://upload.wikimedia.org/wikipedia/en/4/49/Coats_Guard_Academy_Bears_Logo.png"
                break;
        case "Coastal Carolina":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Coastal_Carolina_Chanticleers_logo.svg/1200px-Coastal_Carolina_Chanticleers_logo.svg.png"
                break;
        case "Coe College":
            logo = "https://static.hudl.com/users/temp/18261377_139e995fce96404583ad1a280b042f80.jpg"
                break;
        case "Colgate":
            logo = "https://www.colgate.edu/sites/default/files/2020-10/Col_Athletics_C_RGB_500_0.png"
                break;
        case "Colorado":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Colorado_Buffaloes_logo.svg/1200px-Colorado_Buffaloes_logo.svg.png"
                break;
        case "Colorado Col.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Colorado_College_Tigers_logo.svg/1200px-Colorado_College_Tigers_logo.svg.png"
                break;
        case "Colorado Mesa":
            logo = "https://marvel-b1-cdn.bc0a.com/f00000000088522/www.coloradomesa.edu/marketing/images/maverick-athletic-interlocking.png"
                break;
        case "Colorado St.":
            logo = "https://brand.colostate.edu/wp-content/uploads/sites/47/2019/01/CSU-Ram-357.png"
                break;
        case "Colorado State-Pueblo":
            logo = "https://upload.wikimedia.org/wikipedia/en/6/60/CSU-Pueblo_Athletics.png"
                break;
        case "Columbia":
            logo = "https://collegeconnectionathletics.com/wp-content/uploads/2020/07/1200px-Columbia_Lions_logo.svg.png"
                break;
        case "Compton CC (CA)":
            logo = "https://www.compton.edu/_resources/images/logo.png"
                break;
        case "Concordia (IL)":
            logo = "https://bvmsports.com/wp-content/uploads/2021/12/20190923213936_246_mascotOrig.png"
                break;
        case "Concordia (NE)":
            logo = "https://www.cune.edu/download_file/view/3799/5355"
                break;
        case "Concordia (QB)":
            logo = "https://www.cune.edu/application/themes/icarus/bulldog/images/block-c.png"
                break;
        case "Concordia-Moorhead (MN)":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/concordia-mhead.svg"
                break;
        case "Concordia-St.Paul (MN)":
            logo = "https://cspbears.com/images/logos/site/site.png"
                break;
        case "Connecticut":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Connecticut_Huskies_logo.svg/1200px-Connecticut_Huskies_logo.svg.png"
                break;
        case "Cornell":
            logo = "https://upload.wikimedia.org/wikipedia/commons/f/fd/Cornell-college_logo_from_NCAA.svg"
                break;
        case "Corpus Christi":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Arms_of_Corpus_Christi_College%2C_Cambridge.svg/140px-Arms_of_Corpus_Christi_College%2C_Cambridge.svg.png"
                break;
        case "Cortland St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Cortland_Red_Dragons_Logo.svg/1200px-Cortland_Red_Dragons_Logo.svg.png"
                break;
        case "Culver-Stockton":
            logo = "https://content.sportslogos.net/news/2012/06/headerLogoLeft1.png"
                break;
        case "Cumberlands":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/cumberlands.sidearmsports.com/images/responsive_2021/logo-primary.svg"
                break;
        case "Dana":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Dana_College.png/220px-Dana_College.png"
                break;
        case "Dartmouth":
            logo = "https://logos-download.com/wp-content/uploads/2019/11/Dartmouth_College_Logo.png"
                break;
        case "Davidson":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Davidson_Wildcats_logo.svg/800px-Davidson_Wildcats_logo.svg.png"
                break;
        case "Dayton":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Dayton_Flyers_logo.svg/1200px-Dayton_Flyers_logo.svg.png"
                break;
        case "DePauw":
            logo = "https://upload.wikimedia.org/wikipedia/en/7/7b/DePauw_Tigers_logo.png"
                break;
        case "Deakin (Australia)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Deakin_University_Logo_2017.svg/800px-Deakin_University_Logo_2017.svg.png"
                break;
        case "Defiance":
            logo = "https://www.defiance.edu/information/images/yellow-jacket-mascot.png"
                break;
        case "Delaware":
            logo = "https://1000logos.net/wp-content/uploads/2022/01/Delaware-Blue-Hens-Logo-2009.png"
                break;
        case "Delaware St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Delaware_State_University_logo.svg/250px-Delaware_State_University_logo.svg.png"
                break;
        case "Delaware Valley":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/delaware-valley.svg"
                break;
        case "Delta St.":
            logo = "https://gostatesmen.com/common/controls/image_handler.aspx?thumb_id=15&image_path=/images/2020/3/18/NEW_Statesman_Head_no_wire.png"
                break;
        case "Detroit Mercy":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/University_of_Detroit_Mercy_new_logo.svg/175px-University_of_Detroit_Mercy_new_logo.svg.png"
                break;
        case "Doane":
            logo = "https://bloximages.chicago2.vip.townnews.com/journalstar.com/content/tncms/assets/v3/editorial/e/5f/e5f49b35-b082-5cae-8d32-12a3428c8d55/5aee6bf60bc3b.image.png?resize=494%2C500"
                break;
        case "Drake":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Drake_Bulldogs_logo.svg/1200px-Drake_Bulldogs_logo.svg.png"
                break;
        case "Dubuque":
            logo = "https://udspartans.com/images/logos/site/site.png"
                break;
        case "Duke":
            logo = "https://1000logos.net/wp-content/uploads/2017/11/Duke-University-Logo.png"
                break;
        case "Duquesne":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Duquesne_Dukes_logo.svg/1200px-Duquesne_Dukes_logo.svg.png"
                break;
        case "East Carolina":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/East_Carolina_Pirates_logo.svg/800px-East_Carolina_Pirates_logo.svg.png"
                break;
        case "East Central (OK)":
            logo = "https://ecutigers.com/images/logos/site/site.png"
                break;
        case "East Mississippi CC":
            logo = "https://www.eastms.edu/about/visual-identity/logos/emcc-logo-cc-200px.png"
                break;
        case "East Stroudsburg":
            logo = "https://esuwarriors.com/images/logos/site/site.png"
                break;
        case "East Tennessee St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/East_Tennessee_State_Buccaneers_logo.svg/640px-East_Tennessee_State_Buccaneers_logo.svg.png"
                break;
        case "East. Illinois":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Eastern_Illinois_Panthers_logo.svg/1200px-Eastern_Illinois_Panthers_logo.svg.png"
                break;
        case "East. Kentucky":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Eastern_Kentucky_Colonels_logo.svg/1200px-Eastern_Kentucky_Colonels_logo.svg.png"
                break;
        case "East. Michigan":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Eastern_Michigan_Eagles_logo.svg/1200px-Eastern_Michigan_Eagles_logo.svg.png"
                break;
        case "East. Montana":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/MSUB_logo_13-Aug-2019.png/640px-MSUB_logo_13-Aug-2019.png"
                break;
        case "East. New Mexico":
            logo = "https://goeasternathletics.com/images/logos/site/site.png"
                break;
        case "East. Oregon":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/EOUWordmark.png/200px-EOUWordmark.png"
                break;
        case "East. Washington":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Eastern_Washington_Eagles_logo.svg/1200px-Eastern_Washington_Eagles_logo.svg.png"
                break;
        case "Edinboro":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Edinboro_Fighting_Scots_logo.svg/1200px-Edinboro_Fighting_Scots_logo.svg.png"
                break;
        case "Edward Waters":
            logo = "https://ewutigerpride.com/images/logos/site/site.png"
                break;
        case "Elizabeth City St.":
            logo = "https://www.ecsu.edu/images/cam/VikingColor.png"
                break;
        case "Elmhurst":
            logo = "https://elmhurstbluejays.com/images/logos/Elmhurst.png"
                break;
        case "Elon":
            logo = "https://1000logos.net/wp-content/uploads/2019/12/Elon-Phoenix-Logo-2000.png"
                break;
        case "Emporia St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Emporia_State_Hornets_logo.svg/1280px-Emporia_State_Hornets_logo.svg.png"
                break;
        case "Evangel (MO)":
            logo = "https://www.evangel.edu/wp-content/uploads/2021/12/EU_Mascot_hero-valor.jpg"
                break;
        case "Evansville":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Evansville_Athletics_logo.svg/800px-Evansville_Athletics_logo.svg.png"
                break;
        case "Fairmont St.":
            logo = "https://www.fairmontstate.edu/_images/urm/logos/stacked/maroon/fairmont_state_university_stacked_maroon_logo.png"
                break;
        case "Fayetteville St.":
            logo = "https://fsubroncos.com/images/logos/site/site.png"
                break;
        case "Ferris St.":
            logo = "https://www.ferris.edu/administration/advance/standards/logos/thumbnails/13-BulldogFullColor.png"
                break;
        case "Ferrum":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/ferrumpanthers.com/responsive_2022/images/logo_main.png"
                break;
        case "Findlay":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Findlay_Oilers_logo.svg/1200px-Findlay_Oilers_logo.svg.png"
                break;
        case "Fisk":
            logo = "https://www.al.com/resizer/qkwVD0gspo6VxAgG-YBC5_W1-iw=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width2048/img/spotnews/photo/fisk-univ-logo-seal-1866png-5f79e50a650ff538.png"
                break;
        case "Florida":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_gator_logo.svg/1200px-Florida_Gators_gator_logo.svg.png"
                break;
        case "Florida A&M":
            logo = "https://1000logos.net/wp-content/uploads/2021/06/Florida-AM-Rattlers-logo.png"
                break;
        case "Florida Atlantic":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Florida_Atlantic_Owls_logo.svg/1200px-Florida_Atlantic_Owls_logo.svg.png"
                break;
        case "Florida International":
            logo = "https://upload.wikimedia.org/wikipedia/en/1/1d/FIU_Panthers_logo.svg"
                break;
        case "Florida St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Florida_State_Seminoles_logo.svg/1200px-Florida_State_Seminoles_logo.svg.png"
                break;
        case "Florida Tech":
            logo = "https://www.fit.edu/marketing-and-communications/marcomm-toolbox/logos-and-marks/Panther-logo_vert_color.png"
                break;
        case "Fordham":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/bb/Fordham_Rams_logo.svg"
                break;
        case "Fort Hays St.":
            logo = "https://marvel-b1-cdn.bc0a.com/f00000000215549/www.fhsu.edu/university-marketing/images/logos/2-color-fhsu-victor-e-tiger.png"
                break;
        case "Fort Lewis":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Fort_Lewis_Skyhawks_logo.svg/1200px-Fort_Lewis_Skyhawks_logo.svg.png"
                break;
        case "Fort Valley St.":
            logo = "https://fvsusports.com/images/logos/site/site.png"
                break;
        case "Framingham St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/3/30/FraminghamUniversityLogo.png"
                break;
        case "Franklin & Marshall":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Franklin_%26_Marshall_College_Logo_Horizontal.svg/220px-Franklin_%26_Marshall_College_Logo_Horizontal.svg.png"
                break;
        case "Frederick College":
            logo = "https://static.wixstatic.com/media/c161cc_c4a9b4ec88a8402491a408fe8152626a.jpg/v1/fill/w_552,h_510,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/c161cc_c4a9b4ec88a8402491a408fe8152626a.jpg"
                break;
        case "Fresno St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Fresno_State_Bulldogs_logo.svg/640px-Fresno_State_Bulldogs_logo.svg.png"
                break;
        case "Frostburg St.":
            logo = "https://www.frostburg.edu/creative-services/_files/logos/athleticslogo.jpg"
                break;
        case "Furman":
            logo = "https://www.furman.edu/wp-content/uploads/2019/01/DiamondF/PNG/Diamond%20F-RGB.png"
                break;
        case "Garden City (KS)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/9/9e/GCCC_Athletics_logo.png"
                break;
        case "Gardner-Webb":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Gardner%E2%80%93Webb_Runnin%27_Bulldogs_logo.svg/800px-Gardner%E2%80%93Webb_Runnin%27_Bulldogs_logo.svg.png"
                break;
        case "George Washington":
            logo = "https://e7.pngegg.com/pngimages/908/630/png-clipart-george-washington-university-george-washington-colonials-men-s-basketball-charles-e-smith-center-college-logo-wa-thumbnail.png"
                break;
        case "Georgetown (KY)":
            logo = "https://www.georgetowncollege.edu/sites/default/files/Tiger-stack-words%20%281%29.png"
                break;
        case "Georgia":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Georgia_Athletics_logo.svg/1280px-Georgia_Athletics_logo.svg.png"
                break;
        case "Georgia Southern":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Georgia_Southern_Eagles_logo.svg/800px-Georgia_Southern_Eagles_logo.svg.png"
                break;
        case "Georgia St.":
            logo = "https://commkit.gsu.edu/files/2023/03/gsu-with-pantherhead.png"
                break;
        case "Georgia Tech":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Georgia_Tech_Yellow_Jackets_logo.svg/1200px-Georgia_Tech_Yellow_Jackets_logo.svg.png"
                break;
        case "Gettysburg":
            logo = "https://www.gettysburg.edu/main/images/apple-touch-icon-152x152.png"
                break;
        case "Graceland College (IA)":
            logo = "https://my.graceland.edu/ICS/icsfs/mm/yellowjackets.png?target=92ad2c48-3f26-416b-a9b9-7238b6120467"
                break;
        case "Grambling St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Grambling_State_Tigers_logo.svg/1200px-Grambling_State_Tigers_logo.svg.png"
                break;
        case "Grand Valley St.":
            logo = "https://seeklogo.com/images/G/grand-valley-state-university-logo-8E1D66D7EE-seeklogo.com.png"
                break;
        case "Greenville":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/greenville.svg"
                break;
        case "Grove City":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Grove-city_logo_from_NCAA.svg/2048px-Grove-city_logo_from_NCAA.svg.png"
                break;
        case "Gustavus Adolphus":
            logo = "https://static.wixstatic.com/media/7383ad_9fe67936506547e19ad5985ef14c8142~mv2.png/v1/fill/w_1500,h_1500,al_c/Gustavus%20Adolphus%20College.png"
                break;
        case "Hamline":
            logo = "https://hamlineathletics.com/images/logos/site/site.png"
                break;
        case "Hampton":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Hampton_Pirates_logo.svg/1200px-Hampton_Pirates_logo.svg.png"
                break;
        case "Harding":
            logo = "https://hardingsports.com/images/logos/site/site.png"
                break;
        case "Harvard":
            logo = "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png"
                break;
        case "Hastings":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/HastingsCollege_crimson_logo.svg/1200px-HastingsCollege_crimson_logo.svg.png"
                break;
        case "Hawaii":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Hawaii_Warriors_logo.svg/640px-Hawaii_Warriors_logo.svg.png"
                break;
        case "Heidelberg":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/heidelberg.svg"
                break;
        case "Henderson St.":
            logo = "https://www.hsu.edu/static/images/site-logo.png"
                break;
        case "Hillsdale":
            logo = "https://www.hillsdale.net/gcdn/presto/2022/08/09/NHDN/48adae15-66c3-4fec-b562-4fb18298418c-Icon_Head_2pmsWhite.png"
                break;
        case "Hobart":
            logo = "https://upload.wikimedia.org/wikipedia/en/2/28/Hobart_Statesmen_Logo.png"
                break;
        case "Hofstra":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Hofstra_Pride_logo.svg/1200px-Hofstra_Pride_logo.svg.png"
                break;
        case "Holy Cross":
            logo = "https://upload.wikimedia.org/wikipedia/commons/f/f5/Holy_Cross_Crusaders_logo.svg"
                break;
        case "Houston":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Houston_Cougars_primary_logo.svg/1200px-Houston_Cougars_primary_logo.svg.png"
                break;
        case "Houston Baptist":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Houston_Baptist_Huskies_logo.svg/200px-Houston_Baptist_Huskies_logo.svg.png"
                break;
        case "Howard":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/b4/Howard_Bison_logo.svg"
                break;
        case "Howard Payne":
            logo = "https://www.hputx.edu/wp-content/uploads/2021/09/HPU-Buzzsaw-redesign.jpg"
                break;
        case "Humboldt St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/0/0f/Humboldt_state_logo.jpeg"
                break;
        case "ITESM Monterey":
            logo = "https://theglobalamericans.org/wp-content/uploads/2020/06/ITESM-Logo.png"
                break;
        case "Idaho":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Idaho_Vandals_logo.svg/1200px-Idaho_Vandals_logo.svg.png"
                break;
        case "Idaho St.":
            logo = "https://www.isu.edu/media/libraries/marketing-and-communications/brand/ISU-stacked.png"
                break;
        case "Illinois":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Illinois_Fighting_Illini_logo.svg/1200px-Illinois_Fighting_Illini_logo.svg.png"
                break;
        case "Illinois St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Illinois_State_Athletics_logo.svg/1200px-Illinois_State_Athletics_logo.svg.png"
                break;
        case "Incarnate Word":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Incarnate_Word_Cardinals_logo.svg/800px-Incarnate_Word_Cardinals_logo.svg.png"
                break;
        case "Indiana":
            logo = "https://upload.wikimedia.org/wikipedia/commons/4/47/Indiana_Hoosiers_logo.svg"
                break;
        case "Indiana (PA)":
            logo = "https://upload.wikimedia.org/wikipedia/en/6/6f/IUP_Crimson_Hawks_logo.svg"
                break;
        case "Indiana St.":
            logo = "https://bloximages.chicago2.vip.townnews.com/tribstar.com/content/tncms/assets/v3/editorial/0/55/055ed266-5d92-11ea-ace3-2b0a2f44a481/5e5ec57078ba9.image.png?resize=574%2C500"
                break;
        case "Iona":
            logo = "https://content.sportslogos.net/logos/32/711/full/iona_gaels_logo_secondary_2003_sportslogosnet-1037.png"
                break;
        case "Iowa":
            logo = "https://1000logos.net/wp-content/uploads/2021/06/Iowa-Hawkeyes-logo.png"
                break;
        case "Iowa St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Iowa_State_Cyclones_logo.svg/1200px-Iowa_State_Cyclones_logo.svg.png"
                break;
        case "Itawamba (MS)":
            logo = "https://apply.iccms.edu/portals/5/images/icc-vertical-logo-full-color-rgb.png"
                break;
        case "Jackson St.":
            logo = "https://e7.pngegg.com/pngimages/123/940/png-clipart-jackson-state-university-jackson-state-tigers-football-university-of-south-alabama-john-carroll-university-college-life-miscellaneous-blue.png"
                break;
        case "Jacksonville":
            logo = "https://media.yourobserver.com/img/photos/2022/05/06/194452_standard_t900x600.png?d666c25c0ae2036b31e9e5deb97c48b6f611244c"
                break;
        case "Jacksonville St.":
            logo = "https://content.sportslogos.net/logos/32/716/full/jacksonville_state_gamecocks_logo_secondary_1994_sportslogosnet-7499.png"
                break;
        case "James Madison":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/James_Madison_University_Athletics_logo.svg/2560px-James_Madison_University_Athletics_logo.svg.png"
                break;
        case "Jamestown":
            logo = "https://www.uj.edu/app/uploads/2022/06/Picture1-300x260.png"
                break;
        case "John Carroll":
            logo = "https://assets-global.website-files.com/5cc1d2afad50d9167e419ad0/620eaf7f30ee530d4195a005_6157288f65738661d5f3a16d_john%2520carroll.png"
                break;
        case "Johnson C. Smith":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Johnson_C._Smith_Golden_Bulls_logo.svg/1200px-Johnson_C._Smith_Golden_Bulls_logo.svg.png"
                break;
        case "Kansas":
            logo = "https://brand.ku.edu/sites/brand/files/images/2020/KUMarks_Jayhawk.png"
                break;
        case "Kansas St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Kansas_State_Wildcats_logo.svg/640px-Kansas_State_Wildcats_logo.svg.png"
                break;
        case "Kent St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Kent_State_athletic_logo.svg/1200px-Kent_State_athletic_logo.svg.png"
                break;
        case "Kentucky":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kentucky_Wildcats_logo.svg/2503px-Kentucky_Wildcats_logo.svg.png"
                break;
        case "Kentucky St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/KSUThorobredslogo.svg/1200px-KSUThorobredslogo.svg.png"
                break;
        case "Kentucky Wesleyan":
            logo = "https://www.owensboroliving.com/wp-content/uploads/2016/08/Wesleyan-3.jpg"
                break;
        case "King Alfred's (England)":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/b8/University_of_Winchester_coat-of-arms.jpg"
                break;
        case "Knox":
            logo = "https://prairiefire.knox.edu//images/2016/9/12/14263987_10154083344688731_102754187469787541_n71.jpg"
                break;
        case "Knoxville":
            logo = "https://www.focusquest.com/wp-content/uploads/2022/01/image_2022-01-05_123100-300x300.png"
                break;
        case "Kutztown (PA)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Kutztown_Golden_Bears_logo.svg/1200px-Kutztown_Golden_Bears_logo.svg.png"
                break;
        case "LSU":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/LSU_Athletics_logo.svg/2560px-LSU_Athletics_logo.svg.png"
                break;
        case "La Verne":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/la-verne.svg"
                break;
        case "La-Monroe":
            logo = "https://upload.wikimedia.org/wikipedia/en/c/c9/Louisiana-Monroe_Warhawks_logo.svg"
                break;
        case "Lafayette":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Lafayette_Leopards_logo.svg/1200px-Lafayette_Leopards_logo.svg.png"
                break;
        case "Lakeland":
            logo = "https://d2jyir0m79gs60.cloudfront.net/college/logos/Lakeland_College.png"
                break;
        case "Lamar":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Lamar_Cardinals_logo.svg/1200px-Lamar_Cardinals_logo.svg.png"
                break;
        case "Lambuth":
            logo = "https://www.baseball-almanac.com/images/lambuth.jpg"
                break;
        case "Lane":
            logo = "https://golcdragons.com/images/assets/logo.png"
                break;
        case "Langston":
            logo = "https://langstonsports.com/images/logos/site/site.png"
                break;
        case "Laval":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Ulaval_Shield.svg/1200px-Ulaval_Shield.svg.png"
                break;
        case "Lehigh":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/LehighMountainHawks.svg/1200px-LehighMountainHawks.svg.png"
                break;
        case "Lenoir-Rhyne":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/03/Lenoir%E2%80%93Rhyne-Bears-Logo-PNG.png"
                break;
        case "Lewis & Clark":
            logo = "https://lcpioneers.com/images/logos/site/site.png"
                break;
        case "Liberty":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Liberty_Flames_logo.svg/200px-Liberty_Flames_logo.svg.png"
                break;
        case "Limestone":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Limestone_Saints_logo.svg/1200px-Limestone_Saints_logo.svg.png"
                break;
        case "Lincoln (MO)":
            logo = "https://lubluetigers.com/images/logos/site/site.png"
                break;
        case "Lindenwood":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Lindenwood_Lions_logo.svg/200px-Lindenwood_Lions_logo.svg.png"
                break;
        case "Linfield":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/linfield.svg"
                break;
        case "Livingstone":
            logo = "https://thisislivingstone.com/wp-content/uploads/2018/01/Bear_NoType_embed.png"
                break;
        case "Lock Haven":
            logo = "https://www.golhu.com/images/logos/site/site.png"
                break;
        case "Long Beach CC":
            logo = "https://www.lbcc.edu/sites/main/files/imagecache/pod/main-images/lbcc_viking_logo.jpg?1577830849"
                break;
        case "Long Beach St.":
            logo = "https://s.yimg.com/cv/apiv2/default/ncaab/20190610/500x500/long-beach-st_wbgs.png"
                break;
        case "Los Angeles St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/CSU%2C_Los_Angeles_seal.svg/140px-CSU%2C_Los_Angeles_seal.svg.png"
                break;
        case "Louisiana":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Ragin_Cajuns_logo.svg/1200px-Ragin_Cajuns_logo.svg.png"
                break;
        case "Louisiana College":
            logo = "https://lcuniversity.edu/wp-content/uploads/2019/10/mascotlogo.png"
                break;
        case "Louisiana Tech":
            logo = "https://brand.latech.edu/wp-content/uploads/sites/13/2021/03/favicon-300x300-1.png"
                break;
        case "Louisville":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Louisville_Cardinals_logo.svg/800px-Louisville_Cardinals_logo.svg.png"
                break;
        case "Loyola (LA)":
            logo = "https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/lono.sidearmsports.com/images/responsive_2022/lono_logo.svg"
                break;
        case "Macalester":
            logo = "https://zsyst.com/wp-content/uploads/2020/12/Macalester-College-Logo.png"
                break;
        case "Maine":
            logo = "https://upload.wikimedia.org/wikipedia/en/d/d3/Maine_Black_Bears_logo.svg"
                break;
        case "Malone":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/malonepioneers.com/images/responsive_2021/primary-logo.png"
                break;
        case "Manitoba":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Manitoba_Bisons_Logo.svg/1200px-Manitoba_Bisons_Logo.svg.png"
                break;
        case "Marian":
            logo = "https://e7.pngegg.com/pngimages/601/949/png-clipart-marian-university-university-of-indianapolis-marian-knights-football-huntington-university-lindenwood-university-belleville-others.png"
                break;
        case "Marist":
            logo = "https://1000logos.net/wp-content/uploads/2021/06/Marist-Red-Foxes-logo.png"
                break;
        case "Marquette":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Marquette_Golden_Eagles_logo.svg/1200px-Marquette_Golden_Eagles_logo.svg.png"
                break;
        case "Mars Hill":
            logo = "https://coloropedia.com/wp-content/uploads/2021/12/mhc-lions-logo.png"
                break;
        case "Marshall":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Marshall_University_logo.svg/1200px-Marshall_University_logo.svg.png"
                break;
        case "Mary Hardin-Baylor":
            logo = "https://cruathletics.com/images/logos/site/site.png"
                break;
        case "Maryland":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Maryland_Terrapins_logo.svg/1200px-Maryland_Terrapins_logo.svg.png"
                break;
        case "Massachusetts":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/UMass_primary_logo.png/932px-UMass_primary_logo.png"
                break;
        case "McGill":
            logo = "https://upload.wikimedia.org/wikipedia/commons/7/76/Mcgill_university_coa.png"
                break;
        case "McKendree University":
            logo = "https://iwcoa.net/wp-content/uploads/2019/12/mckendree-bearcats-logo.png"
                break;
        case "McMurry":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/mcmurrysports.com/images/responsive_2021/head.svg"
                break;
        case "McNeese St.":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/McNeese-State-Cowboys-logo.png"
                break;
        case "Md-Eastern Shore":
            logo = "https://1000logos.net/wp-content/uploads/2021/06/Maryland-Eastern-Shore-Hawks-logo.png"
                break;
        case "Memphis":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Memphis_Tigers_logo.svg/800px-Memphis_Tigers_logo.svg.png"
                break;
        case "Menlo":
            logo = "https://upload.wikimedia.org/wikipedia/commons/a/aa/Menlo-college-symbol.png"
                break;
        case "Mercer":
            logo = "https://www.mercer.edu/wp-content/uploads/2019/04/cropped-android-chrome-512x512.png"
                break;
        case "Merchant Marine":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/United_States_Merchant_Marine_Academy_seal.svg/1200px-United_States_Merchant_Marine_Academy_seal.svg.png"
                break;
        case "Metro State":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/MSU_Denver_Roadrunners.svg/640px-MSU_Denver_Roadrunners.svg.png"
                break;
        case "Miami (FL)":
            logo = "https://1000logos.net/wp-content/uploads/2018/09/Miami-Hurricanes-Logo.png"
                break;
        case "Miami (OH)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Miami_Redhawks_logo.svg/1200px-Miami_Redhawks_logo.svg.png"
                break;
        case "Michigan":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/2560px-Michigan_Wolverines_logo.svg.png"
                break;
        case "Michigan St.":
            logo = "https://1000logos.net/wp-content/uploads/2017/10/michigan-state-logo.png"
                break;
        case "Michigan Tech":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Michigan-Tech-Huskies-logo.png"
                break;
        case "MidAmerica Nazarene University":
            logo = "https://mnusports.com/images/responsive_2020/main.svg"
                break;
        case "Middle Tenn. St.":
            logo = "https://goblueraiders.com/images/2022/11/2/MT_primary_nYkBz.png"
                break;
        case "Midwestern St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/5/56/Msu-texas-athletics-logo-800px_-_Copy.png"
                break;
        case "Miles":
            logo = "https://milesgoldenbears.com/images/logos/site/site.png"
                break;
        case "Millersville":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Millersville_Marauders_logo.svg/1200px-Millersville_Marauders_logo.svg.png"
                break;
        case "Millikin":
            logo = "https://athletics.millikin.edu/images/logos/site/site.png"
                break;
        case "Millsaps":
            logo = "https://upload.wikimedia.org/wikipedia/en/1/1c/MillsapsMajorsLogo.png"
                break;
        case "Milton":
            logo = "https://www.milton.edu/wp-content/uploads/2015/01/Milton-Mustangs.gif"
                break;
        case "Minnesota":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/University_of_Minnesota_Logo.svg/2560px-University_of_Minnesota_Logo.svg.png"
                break;
        case "Minnesota St.":
            logo = "https://dejpknyizje2n.cloudfront.net/gallery/minnesota-state-mankato-ncaa-logo-sticker-ncaa310-5472-29f1b2.png"
                break;
        case "Minnesota-Duluth":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Minnesota_Duluth_Bulldogs_logo.svg/800px-Minnesota_Duluth_Bulldogs_logo.svg.png"
                break;
        case "Minot St.":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/02/Minot-State-Beavers-Logo.png"
                break;
        case "Miss. Valley St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Mississippi_Valley_State_University_athletics_logo.svg/1200px-Mississippi_Valley_State_University_athletics_logo.svg.png"
                break;
        case "Mississippi":
            logo = "https://www.oxfordeagle.com/wp-content/uploads/sites/38/2021/12/Mississippi_Rebels_logo_PNG1.png?w=648"
                break;
        case "Mississippi Col.":
            logo = "https://mississippicollege-1ba9f.kxcdn.com/offices/marketing/application/files/thumbnails/thumb_400/3415/6960/3454/mc-arrowhead.png"
                break;
        case "Mississippi Delta CC":
            logo = "https://www.msdelta.edu/about/public-relations/graphic-standards/m-delta-logo.png"
                break;
        case "Mississippi St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Mississippi_State_Bulldogs_logo.svg/800px-Mississippi_State_Bulldogs_logo.svg.png"
                break;
        case "Missouri":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Missouri_Tigers_logo.svg/640px-Missouri_Tigers_logo.svg.png"
                break;
        case "Missouri S&T":
            logo = "https://brand.mst.edu/media/universityadvancement/brand/logos/athletics/spiritmarks/MINER_TYPE_FC.png"
                break;
        case "Missouri Southern":
            logo = "https://www.mssu.edu/_resources/includes/MSSU_Lion-LeftFacing.png"
                break;
        case "Missouri State":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Missouri-State-Bears-logo.png"
                break;
        case "Missouri Valley":
            logo = "https://play-lh.googleusercontent.com/RlLjKurJEtI-HBsMP5xghJW64r1tNVqLCq69r_D5r-3jBbsffda8me3Lcdq-HSq7aWo"
                break;
        case "Missouri Western St.":
            logo = "https://www.missouriwestern.edu/brand/wp-content/uploads/sites/143/2019/02/GRIFFON.png"
                break;
        case "Monmouth":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Monmouth_Hawks.svg/1200px-Monmouth_Hawks.svg.png"
                break;
        case "Monmouth (IL)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Monmouth-il_logo_from_NCAA.svg/2560px-Monmouth-il_logo_from_NCAA.svg.png"
                break;
        case "Montana":
            logo = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Montana_UM_logo.gif"
                break;
        case "Montana St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Montana_State_Bobcats_logo.svg/1200px-Montana_State_Bobcats_logo.svg.png"
                break;
        case "Montana Tech":
            logo = "https://upload.wikimedia.org/wikipedia/en/3/3d/Montanatechorediggerslogo.png"
                break;
        case "Montclair St.":
            logo = "https://www.montclair.edu/university-communications/wp-content/uploads/sites/144/2021/01/hawk-logo-color-2.svg"
                break;
        case "Montreal":
            logo = "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/UofMontreal_logo.jpg"
                break;
        case "Moorhead State (MN)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Minnesota_State%E2%80%93Moorhead_Dragons_logo.svg/640px-Minnesota_State%E2%80%93Moorhead_Dragons_logo.svg.png"
                break;
        case "Moraine Valley CC (IL)":
            logo = "https://partnershipfcc.org/wp-content/uploads/2022/04/512x512bb.jpeg"
                break;
        case "Morehead St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Morehead_State_Eagles_wordmark.svg/1200px-Morehead_State_Eagles_wordmark.svg.png"
                break;
        case "Morehouse":
            logo = "https://i.pinimg.com/originals/6a/de/06/6ade0672b59c0f4c894cf1813024fedc.png"
                break;
        case "Morgan St.":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Morgan-State-Bears-logo.png"
                break;
        case "Morningside":
            logo = "https://scontent.fmem1-2.fna.fbcdn.net/v/t39.30808-6/299808946_438841494968279_1116022041514523420_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_aaF8jzSOc8AX_OTwAT&_nc_ht=scontent.fmem1-2.fna&oh=00_AfBoGXSO42Av9qgU1l5mes_QPYECX0WLrSRUbrigpmz6uA&oe=64B62752"
                break;
        case "Morris Brown":
            logo = "https://morrisbrown.edu/wp-content/uploads/2022/05/Wolverine-Logo_V5-scaled.jpg"
                break;
        case "Mount San Antonio JC":
            logo = "https://static.hudl.com/users/prod/254593_fd273502b6174eb2894f57c311f3a539.jpg"
                break;
        case "Mount Senario":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/MountSenarioCollegeLogo.png/65px-MountSenarioCollegeLogo.png"
                break;
        case "Mount Union":
            logo = "https://athletics.mountunion.edu/images/responsive_2021/logo-secondary.svg"
                break;
        case "Murray St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Murray_State_Racers_logo.svg/1200px-Murray_State_Racers_logo.svg.png"
                break;
        case "Muskingum":
            logo = "https://www.muskingum.edu/sites/default/files/images/news/muskingum-university-athletics_2.jpg"
                break;
        case "NE Illinois":
            logo = "https://d2jyir0m79gs60.cloudfront.net/college/logos/Northeastern_Illinois_University.png"
                break;
        case "NE State (OK)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Northeastern_State_RiverHawks_logo.svg/1200px-Northeastern_State_RiverHawks_logo.svg.png"
                break;
        case "NW (IA)":
            logo = "https://assets.nwciowa.edu/mynwc/northwestern-raiders-primary.png"
                break;
        case "NW Missouri St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Northwest_Missouri_State_Bearcats_logo.svg/1200px-Northwest_Missouri_State_Bearcats_logo.svg.png"
                break;
        case "NW Oklahoma St.":
            logo = "https://riderangersride.com/images/logos/site/site.png"
                break;
        case "Navy":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Navy_Athletics_logo.svg/1200px-Navy_Athletics_logo.svg.png"
                break;
        case "Nebraska":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nebraska_Cornhuskers_logo%2C_1992%E2%80%932003.svg/987px-Nebraska_Cornhuskers_logo%2C_1992%E2%80%932003.svg.png"
                break;
        case "Nebraska Wesleyan":
            logo = "https://nwusports.com/images/logos/site/site.png"
                break;
        case "Nebraska-Kearney":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Nebraska%E2%80%93Kearney_Lopers_logo.svg/1200px-Nebraska%E2%80%93Kearney_Lopers_logo.svg.png"
                break;
        case "Nebraska-Omaha":
            logo = "https://www.unomaha.edu/university-communications/downloadables/durango-the-bull/uno-maverick-color.png"
                break;
        case "Nevada":
            logo = "https://1000logos.net/wp-content/uploads/2019/09/Nevada-Wolf-Pack-football-logo.jpg"
                break;
        case "New Hampshire":
            logo = "https://logos-world.net/wp-content/uploads/2020/07/New-Hampshire-Wildcats-Logo.png"
                break;
        case "New Haven":
            logo = "https://newhavenchargers.com/images/logos/site/site.png"
                break;
        case "New Mex. Highlands":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/64/New_Mexico_Highlands_Cowboys_logo.svg/1200px-New_Mexico_Highlands_Cowboys_logo.svg.png"
                break;
        case "New Mexico":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/New_Mexico_Lobos_logo.svg/1200px-New_Mexico_Lobos_logo.svg.png"
                break;
        case "New Mexico St.":
            logo = "https://brand.nmsu.edu/official-university-logo/NM-State-Pete-Color-1024x751.png"
                break;
        case "New York Tech":
            logo = "https://content.sportslogos.net/news/2019/06/BRAND_REVEALWebsite.png"
                break;
        case "Newberry":
            logo = "https://products.advanced-online.com/NWB/Large/6-25-F09801.jpg"
                break;
        case "Newport (Wales)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/University_of_Wales.svg/250px-University_of_Wales.svg.png"
                break;
        case "Nicholls St.":
            logo = "https://www.nicholls.edu/wp-content/uploads/2019/11/N_NICHOLLS_Flat_2C.jpg"
                break;
        case "None":
            logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JrnAJz9wXByolTEpjdlU_XRZKzCOrOyb4A&usqp=CAU"
                break;
        case "Norfolk St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Norfork_State_Spartans_logo.svg/800px-Norfork_State_Spartans_logo.svg.png"
                break;
        case "North Alabama":
            logo = "https://1000logos.net/wp-content/uploads/2019/11/North-Alabama-Lions-logo.png"
                break;
        case "North Carolina":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/North_Carolina_Tar_Heels_logo.svg/2560px-North_Carolina_Tar_Heels_logo.svg.png"
                break;
        case "North Carolina A&T":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/North_Carolina_A%26T_Aggies_logo.svg/1200px-North_Carolina_A%26T_Aggies_logo.svg.png"
                break;
        case "North Carolina Central":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/NCCU_Eagles_head_mark_logo.svg/1200px-NCCU_Eagles_head_mark_logo.svg.png"
                break;
        case "North Carolina St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/NC_State_Wolfpack_logo.svg/1200px-NC_State_Wolfpack_logo.svg.png"
                break;
        case "North Carolina-Pembroke":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/UNC_Pembroke_Braves_logo.svg/1200px-UNC_Pembroke_Braves_logo.svg.png"
                break;
        case "North Central":
            logo = "https://thenccaa.org/common/controls/image_handler.aspx?thumb_id=0&image_path=/images/2021/6/23/Rams_Logo.png"
                break;
        case "North Dakota":
            logo = "https://www.argusleader.com/gcdn/-mm-/c6a12319e8e28e9fe0011f851d969392e4456a35/c=0-82-792-529/local/-/media/2016/06/22/SiouxFalls/SiouxFalls/636021948831693086-ClkVOB-UsAAwj7B.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp"
                break;
        case "North Dakota St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/North_Dakota_State_Bison_logo.svg/1200px-North_Dakota_State_Bison_logo.svg.png"
                break;
        case "North Greenville":
            logo = "https://ngu.edu/wp-content/uploads/2021/02/ngu_sword_complete.png"
                break;
        case "North Park":
            logo = "https://athletics.northpark.edu/images/logos/site/site.png"
                break;
        case "North Texas":
            logo = "https://upload.wikimedia.org/wikipedia/en/a/a2/North_Texas_Mean_Green_logo.svg"
                break;
        case "Northeast Mississippi CC":
            logo = "https://www.nemcc.edu/public-information/assets/images/tiger_head_color.png"
                break;
        case "Northeastern":
            logo = "https://gonu.com/images/2018/8/14/HH_Black_01_2.jpg"
                break;
        case "Northern Arizona":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Northern-Arizona-Lumberjacks-Logo-2014.png"
                break;
        case "Northern Colorado":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Northern_Colorado_Bears_logo.svg/1200px-Northern_Colorado_Bears_logo.svg.png"
                break;
        case "Northern Illinois":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Northern_Illinois_Huskies_logo.svg/1200px-Northern_Illinois_Huskies_logo.svg.png"
                break;
        case "Northern Iowa":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Northern_Iowa_Panters_logo.svg/1200px-Northern_Iowa_Panters_logo.svg.png"
                break;
        case "Northern Michigan":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Northern_Michigan_Wildcats_logo.svg/1200px-Northern_Michigan_Wildcats_logo.svg.png"
                break;
        case "Northern State Univ.":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nsuwolvesathletics.com/images/responsive_2019/main_logo.svg"
                break;
        case "Northern Virginia CC":
            logo = "https://www.nvcc.edu/campus-auxiliary-services/_images/Nighthawk-Logo.png"
                break;
        case "Northland (WI)":
            logo = "https://northlandcollegesports.com/images/logos/site/site.png"
                break;
        case "Northwestern":
            logo = "https://1000logos.net/wp-content/uploads/2019/12/Northwestern-Wildcats-Logo-1981.png"
                break;
        case "Northwestern St. (LA)":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nsudemons.com/images/responsive/nsula_footer_logo.svg"
                break;
        case "Northwood":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/WH_FC_WB.svg/1200px-WH_FC_WB.svg.png"
                break;
        case "Norwich":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/norwichathletics.com/responsive_2022/images/svgs/logo_main%20(3).svg"
                break;
        case "Notre Dame":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Notre_Dame_Fighting_Irish_logo.svg/1200px-Notre_Dame_Fighting_Irish_logo.svg.png"
                break;
        case "Occidental":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/06/Occidental-College-Tigers-logo-1.png"
                break;
        case "Ohio":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Ohio-Bobcats-Logo.png"
                break;
        case "Ohio Northern":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/06/Ohio-Northern-University-Polar-Bears-logo-1.png"
                break;
        case "Ohio St.":
            logo = "https://1000logos.net/wp-content/uploads/2018/01/Ohio-State-Logo.png"
                break;
        case "Ohio Wesleyan":
            logo = "https://www.owu.edu/files/resources/medium_bishopbacker-2.png"
                break;
        case "Oklahoma":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Oklahoma_Sooners_logo.svg/1589px-Oklahoma_Sooners_logo.svg.png"
                break;
        case "Oklahoma St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Oklahoma_State_University_system_logo.svg/248px-Oklahoma_State_University_system_logo.svg.png"
                break;
        case "Old Dominion":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Old_Dominion_Athletics_logo.svg/640px-Old_Dominion_Athletics_logo.svg.png"
                break;
        case "Oregon":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Oregon_Ducks_logo.svg/1200px-Oregon_Ducks_logo.svg.png"
                break;
        case "Oregon St.":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Oregon-State-Beavers-logo.png"
                break;
        case "Oregon Tech":
            logo = "https://bloximages.newyork1.vip.townnews.com/kdrv.com/content/tncms/assets/v3/editorial/9/1f/91f181da-3cf4-11ed-bb82-cfbf5026b500/63308adfa0624.image.png?resize=400%2C182"
                break;
        case "Ottawa (KS)":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/ottawabraves.com/responsive_2022/images/svgs/logo_main.svg"
                break;
        case "Otterbein":
            logo = "https://otterbeincardinals.com/images/logos/site/site.png"
                break;
        case "Ouachita Baptist":
            logo = "https://upload.wikimedia.org/wikipedia/en/7/7c/Ouachita_Baptist_Tigers.png"
                break;
        case "Pacific":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Pacific_Tigers_logo.svg/1200px-Pacific_Tigers_logo.svg.png"
                break;
        case "Pacific (OR)":
            logo = "https://d2jyir0m79gs60.cloudfront.net/college/logos/Pacific_University.jpg"
                break;
        case "Pacific Lutheran":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/plu.sidearmsports.com/images/responsive_2022/PLU_stacked.png"
                break;
        case "Palomar (CA)":
            logo = "https://scontent.fmem1-2.fna.fbcdn.net/v/t39.30808-6/335257133_532921785681016_1992778012883976741_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OWt6I9hkcrQAX-Mygf5&_nc_ht=scontent.fmem1-2.fna&oh=00_AfCpg80US930pua4Ig4sYvrgAWse-siIbZyI3O7y42yODQ&oe=64C4F231"
                break;
        case "Panhandle State (OK)":
            logo = "https://opsuaggies.com/images/responsive/main_logo.png"
                break;
        case "Parsons":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Parsons_School_of_Design_Logo_-_Full.svg/2560px-Parsons_School_of_Design_Logo_-_Full.svg.png"
                break;
        case "Pasadena CC":
            logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSND4DCe_wYCHpB4RbgeP6gTr21zMGK9LlJWhwVMxg3oHMj8ecQDcYFrJpken-SmXIAG3s&usqp=CAU"
                break;
        case "Penn St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Penn_State_Nittany_Lions_logo.svg/640px-Penn_State_Nittany_Lions_logo.svg.png"
                break;
        case "Pennsylvania":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Penn_Quakers_logo.svg/1200px-Penn_Quakers_logo.svg.png"
                break;
        case "Philander Smith":
            logo = "https://www.firstpointusa.com/dashboard/uploads/colleges/1758/1575475575$1.png"
                break;
        case "Phoenix College (JC)":
            logo = "https://www.phoenixcollege.edu/themes/custom/pc/images/athletics.svg"
                break;
        case "Pittsburg St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Pittsburg_State_Gorilla_logo.svg/1200px-Pittsburg_State_Gorilla_logo.svg.png"
                break;
        case "Pittsburgh":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pitt_Panthers_wordmark.svg/1200px-Pitt_Panthers_wordmark.svg.png"
                break;
        case "Pittsburgh-Johnstown":
            logo = "https://pbs.twimg.com/media/FtpIjChXwAE8r_e.jpg"
                break;
        case "Plymouth St.":
            logo = "https://athletics.plymouth.edu/images/2018/11/27/Athletics_-_Secondary.png"
                break;
        case "Portland St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Portland_State_Vikings_logo.svg/1200px-Portland_State_Vikings_logo.svg.png"
                break;
        case "Prairie View A&M":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Prairie_View_A%26M_Panthers_logo.svg/1200px-Prairie_View_A%26M_Panthers_logo.svg.png"
                break;
        case "Presbyterian":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Presbyterian_College_logo.svg/1200px-Presbyterian_College_logo.svg.png"
                break;
        case "Pretoria":
            logo = "https://upload.wikimedia.org/wikipedia/commons/8/81/University_of_Pretoria_Coat_of_Arms.png"
                break;
        case "Princeton":
            logo = "https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg"
                break;
        case "Principia":
            logo = "https://resources.finalsite.net/images/f_auto,q_auto/v1634850328/principiacollegeedu/qhtf0svzz9z1xtsjetq4/PantherHead_Standard.png"
                break;
        case "Puget Sound":
            logo = "https://d2jyir0m79gs60.cloudfront.net/college/logos/University_of_Puget_Sound.gif"
                break;
        case "Purdue":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/2560px-Purdue_Boilermakers_logo.svg.png"
                break;
        case "Queens (Canada)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/QueensU_Crest.svg/1200px-QueensU_Crest.svg.png"
                break;
        case "Redlands":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/redlands.svg"
                break;
        case "Regina":
            logo = "https://pbs.twimg.com/profile_images/1671560219426471936/7we_Pfkh_400x400.jpg"
                break;
        case "Rensselaer Polytechnic Institute":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Rensselaer_at_Hartford_Seal.svg/1200px-Rensselaer_at_Hartford_Seal.svg.png"
                break;
        case "Rhode Island":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Rhode_Island_Rams_logo.svg/800px-Rhode_Island_Rams_logo.svg.png"
                break;
        case "k":
            logo = "https://products.advanced-online.com/ROD/Large/6-25-J09806C.jpg"
                break;
        case "Rice":
            logo = "https://1000logos.net/wp-content/uploads/2019/10/Rice-Owls-Logo-1997.png"
                break;
        case "Richmond":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Richmond_Spiders_logo.svg/800px-Richmond_Spiders_logo.svg.png"
                break;
        case "Robert Morris":
            logo = "https://www.rmu.edu/sites/default/files/images/rmu_logo_1.png"
                break;
        case "Rocky Mountain":
            logo = "https://gobattlinbears.com/images/logos/site/site.png"
                break;
        case "Rowan":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rowan_logo_from_NCAA.svg/2560px-Rowan_logo_from_NCAA.svg.png"
                break;
        case "Rutgers":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rutgers_Scarlet_Knights_logo.svg/2319px-Rutgers_Scarlet_Knights_logo.svg.png"
                break;
        case "S.F. Austin":
            logo = "https://www.sfasu.edu/docs/umc/spirit-logo-purple-rgb.png"
                break;
        case "SE Missouri St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Southeast_Missouri_State_Redhawks_logo.svg/800px-Southeast_Missouri_State_Redhawks_logo.svg.png"
                break;
        case "SE Oklahoma St.":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/se.sidearmsports.com/images/responsive_2020/se_logo_bison.svg"
                break;
        case "SMU":
            logo = "https://upload.wikimedia.org/wikipedia/commons/3/3b/SMU_script_logo.png?20150327005101"
                break;
        case "SW Oklahoma St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/9/95/SWOSU_logo.png"
                break;
        case "Sacramento St.":
            logo = "https://logos-world.net/wp-content/uploads/2020/07/Sacramento-State-Hornets-Logo.png"
                break;
        case "Sacred Heart":
            logo = "https://www.sacredheart.edu/media/shu-media/university-advancement/Big-Red-SHU-300x290.png"
                break;
        case "Saginaw Valley St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Saginaw_Valley_State_Cardinals_logo.svg/800px-Saginaw_Valley_State_Cardinals_logo.svg.png"
                break;
        case "Saint John's (MN)":
            logo = "https://gojohnnies.com/images/logos/site/site.png"
                break;
        case "Salem":
            logo = "https://pbs.twimg.com/profile_images/924357015664697344/HMHTGrzU_400x400.jpg"
                break;
        case "Salisbury":
            logo = "https://www.salisbury.edu/_images/SU-Vertical-Logo-Color.png"
                break;
        case "Sam Houston St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/SHSU_athletics_logo.svg/1200px-SHSU_athletics_logo.svg.png"
                break;
        case "Samford":
            logo = "https://coloropedia.com/wp-content/uploads/2021/12/samford-bulldogs-logo.png"
                break;
        case "San Diego":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/San_Diego_Toreros_logo.svg/1200px-San_Diego_Toreros_logo.svg.png"
                break;
        case "San Diego St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/San_Diego_State_Aztecs_logo.svg/1200px-San_Diego_State_Aztecs_logo.svg.png"
                break;
        case "San Francisco":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/San_Francisco_Dons_logo.svg/1200px-San_Francisco_Dons_logo.svg.png"
                break;
        case "San Francisco St.":
            logo = "https://www.logolynx.com/images/logolynx/84/844dcdf95f3151d731817cafbd4bc064.png"
                break;
        case "San Jose St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/San_Jose_State_Spartans_logo.svg/1200px-San_Jose_State_Spartans_logo.svg.png"
                break;
        case "Santa Clara":
            logo = "https://i.pinimg.com/originals/49/c9/52/49c9521d94ebe5f2a72f96ab3f06cdc2.jpg"
                break;
        case "Santa Rosa JC":
            logo = "https://bvmsports.com/wp-content/uploads/2022/10/Santa-Rose-JC-Bear-Cubs.png"
                break;
        case "Savannah St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Savannah_State_Tigers_logo.svg/1200px-Savannah_State_Tigers_logo.svg.png"
                break;
        case "Seattle":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Seattle_Redhawks_logo.svg/1200px-Seattle_Redhawks_logo.svg.png"
                break;
        case "Shaw":
            logo = "https://www.shawu.edu/uploadedImages/Athletics/Shaw-Athletics-Primary-logo.png"
                break;
        case "Shepherd":
            logo = "https://pbs.twimg.com/profile_images/1587154746145636361/xB4RK0K2_400x400.jpg"
                break;
        case "Sherbrooke":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/USherbrookeCoA.svg/1200px-USherbrookeCoA.svg.png"
                break;
        case "Shippensburg":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Shippensburg_Raiders_logo.svg/1200px-Shippensburg_Raiders_logo.svg.png"
                break;
        case "Simon Fraser":
            logo = "https://upload.wikimedia.org/wikipedia/en/0/0b/Simon_Fraser_University_coat_of_arms.png"
                break;
        case "Sioux Falls":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Sioux_Falls_Cougars_logo.svg/1200px-Sioux_Falls_Cougars_logo.svg.png"
                break;
        case "Slippery Rock":
            logo = "https://www.sru.edu//images/web/rocky1.png"
                break;
        case "Sonoma St.":
            logo = "https://stratcomm.sonoma.edu/sites/stratcomm/files/paw.png"
                break;
        case "South Alabama":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/south-ala.svg"
                break;
        case "South Carolina":
            logo = "https://sc.edu/about/offices_and_divisions/communications/images/toolbox/logos/grid_athletics_logo.png"
                break;
        case "South Carolina St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/South_Carolina_State_Bulldogs_logo.svg/200px-South_Carolina_State_Bulldogs_logo.svg.png"
                break;
        case "South Dakota":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/South_Dakota_Coyotes_logo.svg/800px-South_Dakota_Coyotes_logo.svg.png"
                break;
        case "South Dakota St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/South_Dakota_State_Jackrabbits_logo.svg/1200px-South_Dakota_State_Jackrabbits_logo.svg.png"
                break;
        case "South Florida":
            logo = "https://content.sportslogos.net/logos/34/837/full/south_florida_bulls_logo_secondary_20036111.png"
                break;
        case "Southeastern Louisiana":
            logo = "https://bloximages.chicago2.vip.townnews.com/livingstonparishnews.com/content/tncms/assets/v3/editorial/6/7a/67a839cc-e4c2-11eb-b1dc-03c290a91959/60ef13d5d7637.image.jpg?resize=500%2C500"
                break;
        case "Southern":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Southern_Jaguars_logo.svg/800px-Southern_Jaguars_logo.svg.png"
                break;
        case "Southern Arkansas":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Southern_Arkansas_Muleriders_logo.svg/1200px-Southern_Arkansas_Muleriders_logo.svg.png"
                break;
        case "Southern Connecticut St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Southern_Connecticut_Fighting_Owls_logo.svg/1200px-Southern_Connecticut_Fighting_Owls_logo.svg.png"
                break;
        case "Southern Illinois":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Southern_Illinois_Salukis_logo.svg/1200px-Southern_Illinois_Salukis_logo.svg.png"
                break;
        case "Southern Miss":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Southern_Miss_Athletics_logo.svg/1200px-Southern_Miss_Athletics_logo.svg.png"
                break;
        case "Southern Oregon":
            logo = "https://attachments-us1-cloud-deskpro-com.s3.amazonaws.com/files/39940/62929/62928531BZGCCZTNBAXTXZB0-SOU-Raider-Hawk-CMY-POS.jpg"
                break;
        case "Southern Utah":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Southern_Utah_Thunderbirds_logo.svg/1200px-Southern_Utah_Thunderbirds_logo.svg.png"
                break;
        case "Springfield":
            logo = "https://s3-us-west-2.amazonaws.com/scorestream-team-profile-pictures/274888/20190414220839_972_mascotOrig.png"
                break;
        case "St. Augustine's":
            logo = "https://www.st-aug.edu/wp-content/uploads/2021/01/SAU-lettermark-blue.png"
                break;
        case "St. Cloud St.":
            logo = "https://www.stcloudstate.edu/ucomm/_files/images/Huskies_175.png"
                break;
        case "St. Francis (PA)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Saint_Francis_Red_Flash_logo.svg/1200px-Saint_Francis_Red_Flash_logo.svg.png"
                break;
        case "St. Francis Xavier (NS)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/StFXCoatofArms.svg/1200px-StFXCoatofArms.svg.png"
                break;
        case "St. John's (NY)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/StJohns-Crest-Small.png/175px-StJohns-Crest-Small.png"
                break;
        case "St. Joseph's (IN)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Saint_Joseph%27s_Hawks_logo.svg/1200px-Saint_Joseph%27s_Hawks_logo.svg.png"
                break;
        case "St. Joseph's (PA)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Saint_Joseph%27s_Hawks_logo.svg/1200px-Saint_Joseph%27s_Hawks_logo.svg.png"
                break;
        case "St. Lawrence":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/St._Lawrence_Saints_logo.svg/1200px-St._Lawrence_Saints_logo.svg.png"
                break;
        case "St. Leo":
            logo = "https://saintleolions.com/common/controls/image_handler.aspx?thumb_id=0&image_path=/images/2020/4/27/SaintLeo_1009.png"
                break;
        case "St. Louis":
            logo = "https://www.slu.edu/marcom/tools-downloads/imgs/billiken/slu_billiken_rgb.jpg"
                break;
        case "St. Mary's (CA)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Saint_Mary%27s_College_Gaels_logo.svg/1200px-Saint_Mary%27s_College_Gaels_logo.svg.png"
                break;
        case "St. Mary's (Canada)":
            logo = "https://images.squarespace-cdn.com/content/v1/56a7b5951c1210756e3465c1/1622642571013-8Y3V3ZRN7EIDO857PZ1E/husky-logo.png"
                break;
        case "St. Norbert":
            logo = "https://athletics.snc.edu/images/logos/site/site.png"
                break;
        case "St. Paul's":
            logo = "https://spup.edu.ph/wp-content/uploads/2019/05/Untitled-1.png"
                break;
        case "St. Thomas":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/st-thomas-fl.svg"
                break;
        case "Stanford":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/800px-Stanford_Cardinal_logo.svg.png"
                break;
        case "Stetson":
            logo = "https://upload.wikimedia.org/wikipedia/en/1/17/Stetson_Hatters_logo_%282018%29.png"
                break;
        case "Stillman":
            logo = "https://gostillman.com/images/logos/site/site.png"
                break;
        case "Stony Brook":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Stony_Brook_Seawolves_logo.svg/1200px-Stony_Brook_Seawolves_logo.svg.png"
                break;
        case "Syracuse":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Syracuse_Orange_logo.svg/1515px-Syracuse_Orange_logo.svg.png"
                break;
        case "TCU":
            logo = "https://1000logos.net/wp-content/uploads/2017/11/TCU-Logo.png"
                break;
        case "Tabor":
            logo = "https://pbs.twimg.com/profile_images/822203178103910400/eNFvnw2t_400x400.jpg"
                break;
        case "Tampa":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Tampa_Spartans_logo.svg/1200px-Tampa_Spartans_logo.svg.png"
                break;
        case "Tarkio":
            logo = "https://thetarkiosportsalmanac.weebly.com/uploads/2/5/6/9/25695860/633436_orig.png"
                break;
        case "Tarleton St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tarleton_TonTexas.svg/200px-Tarleton_TonTexas.svg.png"
                break;
        case "Taylor":
            logo = "https://www.taylor.edu/img/brand/trojan-head-3color.png"
                break;
        case "Temple":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Temple_T_logo.svg/1200px-Temple_T_logo.svg.png"
                break;
        case "Tennessee":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tennessee_Volunteers_logo.svg/2048px-Tennessee_Volunteers_logo.svg.png"
                break;
        case "Tennessee St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Tennessee_State_Athletics_logo.svg/1200px-Tennessee_State_Athletics_logo.svg.png"
                break;
        case "Tennessee Tech":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Tennessee_Tech_Golden_Eagles_logo.svg/1200px-Tennessee_Tech_Golden_Eagles_logo.svg.png"
                break;
        case "Texas":
            logo = "https://brand.utexas.edu/wp-content/uploads/2017/05/Athletics_Bevo_Silhouette.svg"
                break;
        case "Texas A&M":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Texas_A%26M_University_logo.svg/1246px-Texas_A%26M_University_logo.svg.png"
                break;
        case "Texas A&M-Commerce":
            logo = "https://upload.wikimedia.org/wikipedia/en/f/f8/Texas_A%26M%E2%80%93Commerce_Lions_logo.svg"
                break;
        case "Texas A&M-Kingsville":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Texas_A%26M%E2%80%93Kingsville_Javelinas_wordmark.svg/2560px-Texas_A%26M%E2%80%93Kingsville_Javelinas_wordmark.svg.png"
                break;
        case "Texas Southern":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Texas_Southern_Tigers_logo.svg/1200px-Texas_Southern_Tigers_logo.svg.png"
                break;
        case "Texas St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Texas_State_Bobcats_logo.svg/1200px-Texas_State_Bobcats_logo.svg.png"
                break;
        case "Texas Tech":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Texas_Tech_Athletics_logo.svg/1749px-Texas_Tech_Athletics_logo.svg.png"
                break;
        case "Texas-Arlington":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/UT_Arlington_Mavericks_logo.svg/1200px-UT_Arlington_Mavericks_logo.svg.png"
                break;
        case "Texas-El Paso":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/UTEP_Miners_logo.svg/1200px-UTEP_Miners_logo.svg.png"
                break;
        case "Texas-San Antonio":
            logo = "https://www.utsa.edu/today/images/graphics/newrr.jpg"
                break;
        case "The Citadel":
            logo = "https://i.pinimg.com/736x/4d/a3/16/4da31666504740dfed3a03677ed76f5d.jpg"
                break;
        case "Thiel":
            logo = "https://thielathletics.com/images/logos/site/site.png"
                break;
        case "Tiffin":
            logo = "https://upload.wikimedia.org/wikipedia/en/8/83/Tiffin_Dragons_Logo.png"
                break;
        case "Toledo":
            logo = "https://utrockets.com/images/2023/3/30/Primary_Logo_for_Dark_Background.png?width=1000"
                break;
        case "Toronto":
            logo = "https://seekvectorlogo.com/wp-content/uploads/2018/02/university-of-toronto-vector-logo.png"
                break;
        case "Towson":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Towson_Tigers_logo.svg/1200px-Towson_Tigers_logo.svg.png"
                break;
        case "Trinity (CT)":
            logo = "https://upload.wikimedia.org/wikipedia/en/8/83/Trinity_College_Bantams_Logo.png"
                break;
        case "Trinity (IL)":
            logo = "https://tiutrojans.com/images/logos/site/site.png"
                break;
        case "Trinity (TX)":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/trinity-tx.svg"
                break;
        case "Trinity Valley CC (TX)":
            logo = "https://bloximages.chicago2.vip.townnews.com/athensreview.com/content/tncms/assets/v3/editorial/3/2a/32a3c822-c492-11eb-b7d6-7f2efdae9d76/60b91333245e0.image.png"
                break;
        case "Troy":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Troy_Trojans_logo.svg/1200px-Troy_Trojans_logo.svg.png"
                break;
        case "Truman St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Truman_Bulldogs_logo.svg/640px-Truman_Bulldogs_logo.svg.png"
                break;
        case "Tufts":
            logo = "https://upload.wikimedia.org/wikipedia/en/2/22/Tufts_Jumbos_logo.png"
                break;
        case "Tulane":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Tulane_Green_Wave_logo.svg/1200px-Tulane_Green_Wave_logo.svg.png"
                break;
        case "Tulsa":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tulsa_Golden_Hurricane_logo.svg/800px-Tulsa_Golden_Hurricane_logo.svg.png"
                break;
        case "Tusculum":
            logo = "https://static.hudl.com/users/temp/6972305_12c1ad6aabc941558296f183bc2e12a0.jpg"
                break;
        case "Tuskegee":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Tuskegee_Golden_Tigers_logo.svg/1200px-Tuskegee_Golden_Tigers_logo.svg.png"
                break;
        case "U.S. International":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Tuskegee_Golden_Tigers_logo.svg/1200px-Tuskegee_Golden_Tigers_logo.svg.png"
                break;
        case "UC Davis":
            logo = "https://cdn.freebiesupply.com/logos/large/2x/uc-davis-aggies-6-logo-png-transparent.png"
                break;
        case "UC Irvine":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/UC_Irvine_Anteaters_logo.svg/1200px-UC_Irvine_Anteaters_logo.svg.png"
                break;
        case "UC Riverside":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/UC_Riverside_Highlanders_logo.svg/1200px-UC_Riverside_Highlanders_logo.svg.png"
                break;
        case "UC Santa Barbara":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/UC_Santa_Barbara_Gauchos_logo.svg/1200px-UC_Santa_Barbara_Gauchos_logo.svg.png"
                break;
        case "UCLA":
            logo = "https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo-1964.png"
                break;
        case "UNLV":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/UNLV_Rebels_wordmark.svg/1200px-UNLV_Rebels_wordmark.svg.png"
                break;
        case "USC":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/USC_Trojans_logo.svg/1373px-USC_Trojans_logo.svg.png"
                break;
        case "UT Martin":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/UT_Martin_Skyhawks_logo.svg/1200px-UT_Martin_Skyhawks_logo.svg.png"
                break;
        case "Union (KY)":
            logo = "https://lirp.cdn-website.com/62fe7d2a/dms3rep/multi/opt/UNION+LOGO+A+Color+%281%29-1920w.png"
                break;
        case "Union (NY)":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgd/union-ny.svg"
                break;
        case "University of Alberta":
            logo = "https://pbs.twimg.com/profile_images/1676306975553101824/GndPpEjO_400x400.jpg"
                break;
        case "Upper Iowa":
            logo = "https://s3.amazonaws.com/dm-e-prod/images/nonprofits/122778logo1553613574.png"
                break;
        case "Upsala":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Uppsala_University_logo.svg/1200px-Uppsala_University_logo.svg.png"
                break;
        case "Utah":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Utah_Utes_logo.svg/2242px-Utah_Utes_logo.svg.png"
                break;
        case "Utah St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Utah_State_Aggies_logo.svg/2560px-Utah_State_Aggies_logo.svg.png"
                break;
        case "VMI":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/VMI_Keydets_logo.svg/1200px-VMI_Keydets_logo.svg.png"
                break;
        case "Valdosta St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Valdosta_State_Blazers_logo.svg/1200px-Valdosta_State_Blazers_logo.svg.png"
                break;
        case "Valencia CC (FL)":
            logo = "https://valenciacollege.edu/brand/images/mascot/vc-mascot-stacked-signature-rev.jpg"
                break;
        case "Valparaiso":
            logo = "https://marvel-b1-cdn.bc0a.com/f00000000181213/www.valpo.edu/marcom/files/2014/07/Athletic_ValpoShield_Vert_Full_Brown_Web.png"
                break;
        case "Vanderbilt":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Vanderbilt_Commodores_logo.svg/1051px-Vanderbilt_Commodores_logo.svg.png"
                break;
        case "Ventura College":
            logo = "https://app.streamlineathletes.com/assets/programs/1620/ventura-college_logo.png"
                break;
        case "Villanova":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Villanova_Wildcats_logo.svg/1200px-Villanova_Wildcats_logo.svg.png"
                break;
        case "Virginia":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Virginia_Cavaliers_sabre.svg/2560px-Virginia_Cavaliers_sabre.svg.png"
                break;
        case "Virginia Commonwealth":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/VCU_Rams_logo.svg/1200px-VCU_Rams_logo.svg.png"
                break;
        case "Virginia St.":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2021/09/Virginia-State-Trojans-Logo-PNG.png"
                break;
        case "Virginia Tech":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Virginia_Tech_Hokies_logo.svg/2560px-Virginia_Tech_Hokies_logo.svg.png"
                break;
        case "Virginia Union":
            logo = "https://theciaa.com/images/2016/1/20//panther.jpg?preset=large.storyimage"
                break;
        case "Wabash":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/b9/Wabash_Little_Giants_athletics_logo.png"
                break;
        case "Wagner":
            logo = "https://upload.wikimedia.org/wikipedia/en/6/63/Wagner_Seahawks_logo.svg"
                break;
        case "Wake Forest":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Wake_Forest_University_Athletic_logo.svg/1200px-Wake_Forest_University_Athletic_logo.svg.png"
                break;
        case "Wake Technical CC":
            logo = "https://waketech.edu/sites/default/files/paragraphs/news/lead-images/Website-Banner_0.png"
                break;
        case "Walla Walla CC (WA)":
            logo = "https://warriors.wwcc.edu/womens-basketball/wp-content/uploads/sites/2/2017/11/walla-walla.png"
                break;
        case "Washburn":
            logo = "https://s3-us-west-2.amazonaws.com/scorestream-team-profile-pictures/275034/20190416033018_546_mascot300Near.png"
                break;
        case "Washington":
            logo = "https://upload.wikimedia.org/wikipedia/commons/3/36/University_of_Washington_Block_W_logo_RGB_brand_colors.SVG"
                break;
        case "Washington (MO)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/a/ae/Washington_University_Bears_primary_athletic_logo.png"
                break;
        case "Washington St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Washington_State_Cougars_logo.svg/1200px-Washington_State_Cougars_logo.svg.png"
                break;
        case "Wayne State (MI)":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/01/Wayne-State-Warriors-Logo-JPG-scaled.jpg"
                break;
        case "Wayne State (NE)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Wayne_State_Wildcats_logo.svg/1200px-Wayne_State_Wildcats_logo.svg.png"
                break;
        case "Waynesburg":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/waynesburgsports.com/responsive_2021/images/svgs/waynesburg_logo.svg"
                break;
        case "Webber International":
            logo = "https://webberathletics.com/images/logos/site/site.png"
                break;
        case "Weber St.":
            logo = "https://b.fssta.com/uploads/application/college/team-logos/WeberState.vresize.350.350.medium.0.png"
                break;
        case "Wesley":
            logo = "https://www.wesleyan.edu/communications/styleguide/style_guide/images/Athletics_W_CardinalSquare_.png"
                break;
        case "West Alabama":
            logo = "https://coloropedia.com/wp-content/uploads/2021/12/west-alabama-tigers-logo.png"
                break;
        case "West Chester":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/West_Chester_Golden_Rams_logo.svg/1200px-West_Chester_Golden_Rams_logo.svg.png"
                break;
        case "West Florida":
            logo = "https://upload.wikimedia.org/wikipedia/en/8/88/West_Florida_Argos_logo.png"
                break;
        case "West Georgia":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/West_Georgia_Wolves_logo.svg/1200px-West_Georgia_Wolves_logo.svg.png"
                break;
        case "West Liberty St.":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/02/West-Liberty-Hilltoppers-Logo.png"
                break;
        case "West Texas A&M":
            logo = "https://collegiateconsulting.com/wp-content/uploads/2018/02/WestTXAM.png"
                break;
        case "West Virginia":
            logo = "https://w7.pngwing.com/pngs/770/964/png-transparent-west-virginia-university-west-virginia-mountaineers-football-west-virginia-mountaineers-men-s-basketball-kansas-jayhawks-men-s-basketball-ncaa-men-s-division-i-basketball-tournament.png"
                break;
        case "West Virginia St.":
            logo = "https://s3.amazonaws.com/file.imleagues/Images/Intramurals/Uploaded/201909/20199309225943f3290267a4a68de5ca8e7c96a3925376.png"
                break;
        case "West Virginia Tech":
            logo = "https://goldenbearathletics.com/images/2022/6/7/WVUT_BEAR_HEAD_FC_Converted_.png"
                break;
        case "West Virginia Wesleyan":
            logo = "https://wesleyanbobcats.com/images/2023/2/1/Athletics.png?width=1416&height=797&mode=crop"
                break;
        case "Western Carolina":
            logo = "https://www.wcu.edu/WebGraphicsNew/discover-about/spirit-mark.jpg"
                break;
        case "Western Illinois":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Western_Illinois_Leathernecks_logo.svg/1200px-Western_Illinois_Leathernecks_logo.svg.png"
                break;
        case "Western Kentucky":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/WKU_Athletics_logo.svg/1200px-WKU_Athletics_logo.svg.png"
                break;
        case "Western Michigan":
            logo = "https://1000logos.net/wp-content/uploads/2022/03/Western-Michigan-Broncos-Logo-2016.png"
                break;
        case "Western New Mexico":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Western_New_Mexico_Mustangs_logo.svg/800px-Western_New_Mexico_Mustangs_logo.svg.png"
                break;
        case "Western Ontario":
            logo = "https://upload.wikimedia.org/wikipedia/en/b/bc/Western_Ontario_Mustangs_logo.png"
                break;
        case "Western Oregon":
            logo = "https://upload.wikimedia.org/wikipedia/en/7/77/WOUWolves.png"
                break;
        case "Western St. (CO)":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Western_Colorado_Mountaineers_logo.svg/1200px-Western_Colorado_Mountaineers_logo.svg.png"
                break;
        case "Western Washington":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Western_Washington_Vikings_logo.svg/800px-Western_Washington_Vikings_logo.svg.png"
                break;
        case "Westminster (PA)":
            logo = "https://athletics.westminster.edu/images/2023/2/21/westminster-pa-logo-2.png"
                break;
        case "Westminster (UT)":
            logo = "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/westminstergriffins.com/images/responsive_2020/logo_main_new_nav.png"
                break;
        case "Wheaton":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Wheaton_%28Massachusetts%29_Lyons_logo.svg/1200px-Wheaton_%28Massachusetts%29_Lyons_logo.svg.png"
                break;
        case "Whittier":
            logo = "https://teamcolorcodes.com/wp-content/uploads/2022/06/Whittier-College-Poets-logo-1.png"
                break;
        case "Whitworth":
            logo = "https://whitworthpirates.com/images/2019/6/14/Pirate2clr.jpg"
                break;
        case "Wichita St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Wichita_State_Shockers_logo.svg/1200px-Wichita_State_Shockers_logo.svg.png"
                break;
        case "Widener":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Widener_logo_from_NCAA.svg/2048px-Widener_logo_from_NCAA.svg.png"
                break;
        case "Wiley":
            logo = "https://bloximages.newyork1.vip.townnews.com/marshallnewsmessenger.com/content/tncms/assets/v3/editorial/f/6b/f6b98506-1768-11ed-976e-73d6c2529d76/62f18d462b57f.hires.png"
                break;
        case "Willamette":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Willamette_Bearcats_logo.svg/1200px-Willamette_Bearcats_logo.svg.png"
                break;
        case "William & Mary":
            logo = "https://brand.wm.edu/wp-content/uploads/2022/06/Athletics-WM-Griffin-Crest-Green-Gold-300x260.png"
                break;
        case "William Jewell":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/William_Jewell_Cardinals_logo.svg/1200px-William_Jewell_Cardinals_logo.svg.png"
                break;
        case "William Paterson":
            logo = "https://i.pinimg.com/originals/e7/9f/dc/e79fdc19ea33a4c68c62cfa5eb1b9cff.png"
                break;
        case "William Penn":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/William-penn_logo_from_NCAA.svg/2560px-William-penn_logo_from_NCAA.svg.png"
                break;
        case "Williams":
            logo = "https://ephsports.williams.edu/images/logos/site/site.png"
                break;
        case "Wingate":
            logo = "https://wingatebulldogs.com/images/logos/site/site.png"
                break;
        case "Winona St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Winona_State_Warriors_logo.svg/1200px-Winona_State_Warriors_logo.svg.png"
                break;
        case "Winston-Salem St.":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Winston-Salem_State_Rams_logo.svg/1200px-Winston-Salem_State_Rams_logo.svg.png"
                break;
        case "Wisconsin":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Wisconsin_Badgers_logo.svg/1086px-Wisconsin_Badgers_logo.svg.png"
                break;
        case "Wisconsin-Eau Claire":
            logo = "https://upload.wikimedia.org/wikipedia/commons/d/da/Blugoldspic.png"
                break;
        case "Wisconsin-LaCrosse":
            logo = "https://www.uwlax.edu/globalassets/brand/logos/uwl-athletics-color-digital.png/Medium"
                break;
        case "Wisconsin-Milwaukee":
            logo = "https://1000logos.net/wp-content/uploads/2021/07/Wisconsin-Milwaukee-Panthers-logo.png"
                break;
        case "Wisconsin-Platteville":
            logo = "https://www.ncaa.com/sites/default/files/images/logos/schools/bgl/wis-platteville.svg"
                break;
        case "Wisconsin-Stevens Point":
            logo = "https://athletics.uwsp.edu/images/logos/site/site.png"
                break;
        case "Wisconsin-Stout":
            logo = "https://stoutbluedevils.com/images/logos/site/site.png"
                break;
        case "Wisconsin-Superior":
            logo = "https://uwsyellowjackets.com/images/logos/site/site.png"
                break;
        case "Wisconsin-Whitewater":
            logo = "https://upload.wikimedia.org/wikipedia/en/a/ae/Wisconsin%E2%80%93Whitewater_Warhawks_Logo.png"
                break;
        case "Wittenberg":
            logo = "https://www.wittenberg.edu/sites/default/files/media/university_communications/stock/athletics2019/WIT-ATH-FinalLogos-Pantone200-5.jpg"
                break;
        case "Wofford":
            logo = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Wofford_Terriers_logo.svg/1200px-Wofford_Terriers_logo.svg.png"
                break;
        case "Wooster":
            logo = "https://upload.wikimedia.org/wikipedia/en/e/e8/College_of_Wooster_seal.png"
                break;
        case "Wyoming":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Wyoming_Athletics_logo.svg/1181px-Wyoming_Athletics_logo.svg.png"
                break;
        case "Xavier (OH)":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Xavier_Musketeers_logo.svg/200px-Xavier_Musketeers_logo.svg.png"
                break;
        case "Yale":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Yale_Bulldogs_script.svg/640px-Yale_Bulldogs_script.svg.png"
                break;
        case "Yankton":
            logo = "https://www.mountmarty.edu/globalassets/global-content/mmu_horizontal_4c_reverse-01.png"
                break;
        case "York":
            logo = "https://yorkulions.ca/images/2020/5/20/10199_YUAT_Lions_RGB_red_lion_red_YU.png"
                break;
        case "Youngstown St.":
            logo = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Youngstown_State_Penguins_logo.svg/1200px-Youngstown_State_Penguins_logo.svg.png"
                break;
        }

        return logo
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

const collegeConferences = [
    "ACC",
    "American",
    "Big 12",
    "Big Ten",
    "CUSA",
    "Independent",
    "MAC",
    "Mountain West",
    "Pac 12",
    "SEC",
    "Sun Belt",
    "Other"
]
