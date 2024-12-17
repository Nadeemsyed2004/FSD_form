const mysql = require('mysql2/promise');

const connection = async()=>{
    try{
        const connect = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'Nadeem@2004',
            database:'employee_table'
        });
        console.log("Databse Connected Successfully!");
        return connect;
    }catch(err){
        console.log(err);
    }
}
module.exports = connection;
