const mySql = require('mysql')

var connection = mySql.createConnection({
    host     : 'localhost', 
    port     : '3306',
    user     : 'root',
    password : '**********',
    database : 'competencias'
})

module.exports = connection