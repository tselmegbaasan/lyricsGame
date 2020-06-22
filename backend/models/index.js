const Sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');
const mySQL = require('mysql2/promise');

mySQL.createConnection({
    user: dbconfig.USER,
    password: dbconfig.PASSWORD
}).then((connection) => {
    connection.query('CREATE DATABASE IF NOT EXISTS musicGameDB;').then((res) => {
        console.log("Your database is created!");
    }).catch(error => {
        console.log(error);
    });
}).catch(error => {
    console.log(error);
});

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,

    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lyrics = require('./lyrics.model')(sequelize, Sequelize);
db.players = require('./player.model')(sequelize, Sequelize);

module.exports = db;
