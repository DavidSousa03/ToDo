const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("myysql2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.get('/', (require, response) => {
    response.render('home')
})

const conexao = mysql.createConnection({
    host: "172.27.131.221",
    user: "root",
    password: "70980410Mm*",
    database: "todoapp",
    port: 3306
});



