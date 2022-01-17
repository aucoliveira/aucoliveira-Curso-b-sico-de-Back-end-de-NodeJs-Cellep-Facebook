// Primeira etapa é iniciar o npm
// npm init
// git init
// npm install express
// npm install -g nodemon
// npm install ejs
// npm install pg
// npm install express-session

const app = require('./config/server')

// importar o arquivo de base de dados
const noticias = require('./mockup')

// recuperar o modulo de conexão com o banco postgreeSQL
const db = require('./config/dbconnection')

// rota home
app.get('/', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3', function(error, result){
        // console.log(result.rows)
        res.render('home/index', {noticias: result.rows})
    })


})

// rota notícias
app.get('/noticias', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC', function(error, result){
        // foi passado por argumento no metodo render o conteúdo da base de dados atravez de um json
        res.render('noticias/noticias', {noticias : result.rows})

    })
})

// rota notícia
app.get('/noticia', function(req, res){
    // recuperar id noticia por GET
    const id = req.query.id

    db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id], function(error, result){
        // passamos como argumento o elemento selecionado pelo usuario através do seu indice
        // console.log(result.rows)
        res.render('noticias/noticia', {noticia: result.rows[0]})

    })
})

// rota admin
app.get('/admin', function(req, res){
    if(req.session.autorizado == true){
        res.render('admin/form_add_noticia', {autorizado: req.session.autorizado})
    } else {
        res.render('admin/login')
    }
})

// rota responsável pela saida do usuário
app.get('/admin/sair', function(req, res){
    req.session.destroy(err => {console.log(err)})
    res.redirect('/admin')
})

// rota salvar notícia
app.post('/admin/salvar-noticia', function(req, res){
    // recuperar as informações passadas por POST
    const {titulo, conteudo} = req.body 
    // console.log(titulo)
    // console.log(conteudo)

    db.query('INSERT INTO noticias(titulo, conteudo) VALUES ($1, $2)', [titulo, conteudo], function(error, result){
        res.redirect('/noticias')
    })
})

// rota autenticar
app.post('/admin/autenticar', function(req, res){
    const { usuario, senha } = req.body 
    // console.log(usuario)
    // console.log(senha)
    if(usuario == 'root' && senha == 'cellep1234'){
        req.session.autorizado = true
    }

    res.redirect('/admin')
})


app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express na porta 3000')
    console.log('para encerrar use CTRL + C')
})