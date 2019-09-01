const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: '2fofgUERBW',
    password: 'tag6tutLcH',
    database: '2fofgUERBW'
});

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('combined'))

app.get("/heart_count", (req, res) => {
  const querString = 'SELECT COUNT(DISTINCT(email)) AS heartCount FROM opinion WHERE liked'
  connection.query(querString, (err, rows, fields) => {
    res.json( rows )
  })
})

app.get('/send_opinion', (req, res) => {
  
  const query = 'INSERT INTO opinion(customerName, number, email, experience, liked) VALUES(?, ?, ?, ?, ?)'

  connection.query(query, [req.query.name, req.query.number, req.query.email, req.query.experience, req.query.like === 'true' ], (err, rows, fields) => {
    console.log(err);
    if(err){
      res.json({ success: false })
      res.sendStatus(500)
      return
    }

    res.json({ success: true })
  })  

})

app.listen(PORT, () => {
    console.log("Server is up and listening on ", PORT)
})

module.exports = app;