const mysql = require('mysql2/promise');
const config = require('../config/config.js');

const playerData = require('./insertPlayerData');
const matchData = require('./insertMatchesData');

const query1 = 'create table players (player_id int,playername varchar(255),age int,born varchar(255),birthplace varchar(255),role varchar(255),battingstyle varchar(255),bowlingstyle varchar(255))';

const query2 = 'create table matches (match_id int,teams varchar(255),date varchar(255),location varchar(255),matchname varchar(255),toss varchar(255),score varchar(255),winner varchar(255),mom int)';

async function createTables() {
  const connection = await mysql.createConnection(config);
  try {
    await connection.execute(query1);
    playerData.insertPlayerData();
  } catch (err) {
    console.log(err);
  }
  try {
    await connection.execute(query2);
    matchData.insertMatchData();
  } catch (err) {
    console.log(err);
  }
}

module.exports.createTables = createTables;