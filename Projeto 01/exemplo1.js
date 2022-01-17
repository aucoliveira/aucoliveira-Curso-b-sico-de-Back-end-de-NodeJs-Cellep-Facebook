//console.log("Olá mundo!")

// Biblioteca HttP
// Incorporando a nossa aplicação

//ultilizando o método require nos podemons importar modulos, bibliotecas entre outros
const http = require('http')

// incorporar o modulo cirado página 2 em nossa aplicação

const mod_pagina2 = require('./pagina2')

// Chamando a página 3
const mod_sobre = require('./sobre')

// chamando a página 4
const mod_contato = require('./contato')

// Criamos im servidor e passamos como argumento uma função seta
// que recebe as requisições e encaminha as respostas
const server = http.createServer( (rep, res) => {
    // recuperar a requisição com a URL
    const categoria = rep.url
    
    // definir a rota correta para cada URL
    if (categoria == '/sobre') {
        res.end(mod_sobre)
    } else  if (categoria == '/contato') {
        res.end(mod_contato)
    } else if(categoria =='/pagina2') {
        res.end(mod_pagina2())
    } else { // Home
        res.end(
        `<html>
            <head>
                <meta charset="UTF-8">
                <title>Servidor Node.JS</title>
            </head>
            <body>
                <h1>
                    <a href="/">Home</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/">Contato</a>
                </h1>
            </body>
        </html>`
        )
    }
    
} )

server.listen(3000, () => {
    console.log('Servidor escutando a porta 3000')
    console.log('Precione CTRL+C para encerrar')
} )