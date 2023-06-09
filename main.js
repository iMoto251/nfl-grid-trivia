//const fetch = require("node-fetch");
const fs = require("fs");
const initSqlJs = require('./sql-wasm.js');
const filebuffer = fs.readFileSync('./players.db');
const players = require('./players.json')


initSqlJs().then(function (SQL) {
    const db = new SQL.Database(filebuffer);


    for(let i=0;i<players.players.length;i++){
        let draftpick = players.players[i].draft?.number
        db.run(
            `INSERT INTO players VALUES(
                "${players.players[i].id}",
                "${players.players[i].name}",
                "${players.name}",
                "${players.players[i].college}",
                "${players.players[i].draft?.year}",
                "${players.players[i].draft?.team.name}",
                "${players.players[i].draft?.round}",
                "${draftpick}")
                `
            )
    }

    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync("./players.db",buffer)
})

async function main(){}

main();