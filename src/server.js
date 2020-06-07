const express = require('express') // criação da const para a importação do express. em EcmaScrit: import express from 'express'
const server = express() //Chama a função dentro do server
const db = require('./database/db.js') // Importa objeto db do db.js

server.use(express.static('public')) // Torna o Dir public visivel para o servidor. direcionado as pastas dentro para a raiz.

// Habilita uso do req.body no express
server.use(express.urlencoded({extended: true}))

//Tamplate Engine
const nunjucks = require('nunjucks') // criação da const para a importação do Nunjucks
nunjucks.configure('src/views', { //Configuração da engine
    express: server,
    noCache: true

})

server.listen(3000) //Habilita porta 3000

//Configuração de rotas
server.get('/', (req, res) => { //Req: Requisição; Res: Resposta.
    return res.render('index.html') // Resposta a solicitação do barra pela porta que foi aberta. Caso não utilize Template Enginer, usar sendFile()
})

server.get('/create-point', (req, res) => { //Req: Requisição; Res: Resposta.
    console.log(req.query)
    return res.render('create-point.html') // Resposta a solicitação do create-point pela porta que foi aberta.  Caso não utilize Template Enginer, usar sendFile()
})

server.get('/search-results', (req, res) => { //Req: Requisição; Res: Resposta.
    //Confuguração da pesquisa
    const search = req.query.search
    if(search == '') {
        return res.render('search-results.html', {total: 0}) 
    }

    //Consulta ao db criado
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){ // na calback o argumento rows irá retornar a consulta em forma de array
        if(err) {
            return console.log(err)
        } 
        const total = rows.length
        // parametro {places: rows}, mostra o html com os dados do db
        return res.render('search-results.html', {places: rows, total: total}) // Resposta a solicitação do search-results pela porta que foi aberta.  Caso não utilize Template Enginer, usar sendFile()
    })
})

server.post('/savepoint', (req, res) => {

        const query = `INSERT INTO places (image, name, address, address2, state, city, items, number, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);` 

        const values =  [ //Adiciona de forma dinamima os dados no db
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items,
            req.body.number,
            req.body.email
        ]
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }
        // console.log('Cadastro Realizado com Sucesso!')
        // console.log(this)
        return res.render('create-point.html', {saved:true})
    }

    db.run(query, values, afterInsertData) // 0 3° parâremtro é uma função calback que irá retornar um erro caso exista, ou a mensagem de sucesso. só executa depois do query e values.
})