const express = require("express");
const app = express();
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
const Sequelize = require('sequelize');
const { create } = require("domain");

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('home')
})
app.get('/cad', function(req, res){
    res.render('formulario')

})

app.post('/add', function(req,res){
    Post.create({
      titulo:req.body.titulo,
      conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)

    })

})

app.listen(8090, function(){
    console.log("Servidor rodando de boa na url http:localhost:8090")
})