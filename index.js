const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.post('/criar', (requisicao, resposta) =>{
    const descricao = requisicao.body.descricao;
    const completa = 0;

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUE ('${descricao}', '${completa}');
    `

    conexao.query(sql, (erro) =>{
        if(erro){
            return console.log(erro);
        }

        resposta.redirect('/');
    });
});

app.get('/', (require, response) => {
    const sql = 'SELECT * FROM tarefas';

    conexao.query(sql,(erro,dados)=>{
        if(erro) {
            return console.log(erro);
        }
        console.log(dados)
        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            };
        });
        response.render('home')
    })
})


const conexao = mysql.createConnection({
    host: "172.27.131.221",
    user: "root",
    password: "70980410Mm*",
    database: "todoapp",
    port: 3306
});

conexao.connect((erro) =>{
    if (erro) {
        return console.log(erro);
    }

    console.log("Estou conectado ao MySQL");

    app.listen(3000,() => {
        console.log("Servidor rodando na porta 3000!");
    });
});

