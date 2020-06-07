const sqlite3 = require('sqlite3').verbose() // criação da const para a importação do express. em EcmaScrit: (import sqlite3 from 'sqlite3') .verbose retorna mensagens de alteraçoes

// Objeto que irá fazer alterações no banco de dados
const db = new sqlite3.Database('./src/database/database.db') // 'new' é utilizado para criar objeto quando possui uma instancia contrutora(contructor)

module.exports = db //Exporta o objeto db

// Utilização do objeto para as operações do db
db.serialize( ()=>{ // .serialase() Sequencia de codigos por Url
//     //Criação de tabela
    // db.run (`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, name TEXT, address TEXT, address2 TEXT, state TEXT, city TEXT, items TEXT );` )
    // // Inserir dados na tabela
    // const query = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);` 
    // const values =  [
    //     'https://cdn.pixabay.com/photo/2012/02/25/19/00/beige-16875_960_720.jpg',
    //     'Papersider',
    //     'Guilherme Gemballa, Jardim América',
    //     'N° 260',
    //     'Rio do Sul',
    //     'Santa Catarina',
    //     'Papéis e Papelão'
    // ]
    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log('Cadastro Realizado com Sucesso!')
    //     console.log(this)
    // }

//     db.run(query, values, afterInsertData) // 0 3° parâremtro é uma função calback que irá retornar um erro caso exista, ou a mensagem de sucesso. só executa depois do query e values.

//     // Consulta de dados na tabela
    // db.all(`SELECT * FROM places`, function(err, rows){ // na calback o argumento rows irá retornar a consulta em forma de array
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log('Aqui estão os registros: ')
    //     console.log(rows)
    // })

    // Deletando dados
    // db.run(`DELETE FROM places WHERE id = ?`, [28], function(err){
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log('Dado deletado com sucesso!') 
    // })

    //Alterando tabela existente
    // db.run (`ALTER TABLE places ADD email TEXT;`, //Adiciona coluna a tabela existente
    // function afteraltertable(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log('Tabela Alterada com sucesso!')
    //     console.log(this)
    // }) 
    
})