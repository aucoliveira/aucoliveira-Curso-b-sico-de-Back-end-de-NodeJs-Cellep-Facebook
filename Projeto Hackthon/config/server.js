// incorparando a bibliotexa express com require
//const { response } = require('express')
const express = require('express')
const session = require('express-session')

const app = express()

// configure o bodyparse habilita o metodo POST no express
app.use(express.urlencoded({extended:true}))

// define o motor de views como sendo o EJS
app.set('view engine', 'ejs')

// setar o diretorio de views do EJS
app.set('views','./app/views')

// configurar os arquivos estáticos
app.use(express.static('./app/public'))

app.use(session({
    secret: '.f3yVG+=!.>BuY^_',
    resave: false,
    saveUninitialized: false
}))

module.exports = app