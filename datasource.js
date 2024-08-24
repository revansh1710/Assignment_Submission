
const { DataSource } = require('typeorm');
const Airport = require('./models/airport.model.js');
const City = require('./models/city.model.js');
const Country = require('./models/country.model.js');
const dotenv = require('dotenv');
dotenv.config();
const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Airport, City, Country],
    synchronize: true,
});

module.exports = { AppDataSource };
