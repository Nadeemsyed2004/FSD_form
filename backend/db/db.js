const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = async()=>{
    try{
        const connect = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user:process.env.DB_USER || 'root',
            password: process.env.DB_PASS || 'Nadeem@2004',
            database:process.env.DB_NAME || 'employee_details'
        });
        console.log("Databse Connected Successfully!");
        return connect;
    }catch(err){
        console.log(err);
    }
}
module.exports = connection;
