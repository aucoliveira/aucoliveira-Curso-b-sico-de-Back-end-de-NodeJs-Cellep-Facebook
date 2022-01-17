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


const contatos = require('./mockup-contato')

// recuperar o modulo de conexão com o banco postgreeSQL
const db = require('./config/dbconnection')

// rota home
app.get('/', function(req, res){
    res.render('home/index')
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

app.post('/admin/salvar-noticia', function(req, res) {
    const {titulo, conteudo, fonte} = req.body
    db.query('INSERT INTO noticias(titulo, conteudo, fonte) VALUES ($1, $2, $3)',[titulo, conteudo, fonte], function(error, result) {
        res.redirect('/admin/form_add_noticia')
    })
})

// rota contato
app.get('/contato', function(req, res) {
    res.render('contato/contato')
})

// rota para receber mensagem novas
app.post('/contato/salvar-contato', function(req, res){
    // recuperar as informações passadas por POST
    const {nome,email,assunto, mensagem} = req.body 
    // console.log(titulo)
    // console.log(conteudo)

    db.query('INSERT INTO contato(nome, email, assunto, mensagem) VALUES ($1, $2, $3, $4)', [nome,email,assunto,mensagem], function(error, result){
        console.log(result.rows)
        res.redirect('/contato')
    })
})

// ver todas as mensagem recebidas
app.get('/admin/contato_recebido', function(req, res) {
    db.query('SELECT * FROM contato ORDER BY id_contato DESC', function(error, result) {
        res.render('admin/contato_recebido', {contatos: result.rows})
    })
})

// Area administrativa
app.get('/admin/adm', function(req, res) {
    db.query('SELECT * FROM contato ORDER BY id_contato DESC', function(error, result) {
        console.log(result.rows)
        //res.render('admin/adm', {contatos: result.rows})
    })
})

// rota ver mensagem do contato
app.get('/mensagem', function(req, res){
    // recuperar id noticia por GET
    const id = req.query.id

    db.query('SELECT * FROM contato WHERE id_contato = $1', [id], function(error, result){
        // passamos como argumento o elemento selecionado pelo usuario através do seu indice
        // console.log(result.rows)
        console.log(result.rows[0])
        res.render('admin/mensagem', {contato: result.rows[0]})

    })
})


// rota admin
app.get('/admin', function(req, res){
    if(req.session.autorizado == true){
        res.render('admin/adm', {autorizado: req.session.autorizado})
    } else {
        res.render('admin/login')
    }
})

// rota para adicionar uma nova noticia
app.get('/admin/form_add_noticia', function(req, res) {
    res.render('admin/form_add_noticia')
})

// rota autenticar
app.post('/admin/autenticar', function(req, res){
    const { usuario, senha } = req.body 
    // console.log(usuario)
    // console.log(senha)
    if(usuario == 'root' && senha == '07Gv05'){
        req.session.autorizado = true
    }

    res.redirect('/admin')
})
// rota responsável pela saida do usuário
app.get('/admin/sair', function(req, res){
    req.session.destroy(err => {console.log(err)})
    res.redirect('/admin')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando com express na porta 3000')
    console.log('para encerrar use CTRL + C')
})