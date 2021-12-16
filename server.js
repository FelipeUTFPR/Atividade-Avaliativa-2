const nodemailer = require('nodemailer');
const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//1//Exibe todas as noticias quando o cliente solicitar
app.get('/noticia', async(req, res) => {

    //1//inicia o banco de dados, pega os dados pela chave noticia
    //1//e retorna todas a noticias.
    await storage.init() 
    const getNoticia = await storage.getItem('noticia') 
    res.send(getNoticia)
    

})

//1//a requisição vindo do cliente manda salvar noticias no storage
app.post('/noticia', async(req, res) => {
   
    await storage.init() 
     const noticia = await req.body    
     if(noticia != undefined){
 
    const save = await storage.setItem('noticia', noticia)
     res.status(200).json({save: save}) 
     } else {
 
         res.status(400).send('dados invalidos')
     }
    
 })

 //2//retorna somente a noticia indicada pelo seu id
app.get('/noticia/:id', async(req, res) => {

    const noticiaID = await parseInt(req.params.id); 

    await storage.init() 
    const getNoticia = await storage.getItem('noticia') 
   

    const getNoticiaId = await getNoticia.find(b => b.ID === noticiaID); 


    
    res.send(getNoticiaId)
    

})

//2//requesição que manda salvar todos os email vindos do cliente
app.post('/inscricao', async(req, res) => {

    const inscricaoReq = await req.body; 

    if(inscricaoReq != undefined){
 
    await storage.init() 
   
   const save =  await storage.setItem('Email', inscricaoReq) 
   
   res.status(200).json({save: save}) 
    } else {
        res.status(400).send('dados invalidos')
    }
 

})