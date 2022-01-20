const mysql = require("mysql");

//CREATING CONNECTION WITH CREDENTIALS
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Krishn@9518297071',
    database: 'Customers'
});

const connect = db.connect((err)=>{
    if(err){
        throw err
    }
    console.log(`MySql is Connected`);
});

module.exports = {connect , db};