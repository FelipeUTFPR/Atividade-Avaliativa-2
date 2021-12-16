const nodemailer = require('nodemailer');
const storage = require('node-persist');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let cont = 0;
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

//4//função faz a construção do corpor do email
async function enviarEmail(titulo, resumo, url, id, email, i){
    await storage.init();

    //login no servico
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alexa.lind31@ethereal.email',
            pass: 'UKVBCJXW4YCubsYu4n'
        }
    });
    //cria o corpo do email
    const info = await transporter.sendMail({
        from: 'alexa.lind31@ethereal.email',
        to: email[i],
        subject: 'Id da  noticia: '+  id +        'Titulo:  '  + titulo,
        text: 'Resumo da noticia :' + resumo +   ' url: ' +      url
    });
    console.log(' Enviado email: ' + nodemailer.getTestMessageUrl(info) + ' para ' + email[i])
  console.log('\n')
}

//4//Enviar uma noticia, previamente selecionada,
//4// para todos os emails cadstrados.
app.put('/enviar/:id', async (req, res) => {
    const noticiaID = parseInt(req.params.id);
    await storage.init();
    const Emails = await storage.getItem('Email');
    const Noticias = await storage.getItem('noticia');

     
    const noticia1 = await Noticias.find(b => b.ID === noticiaID);
    const{titulo, resumo, url, id} =  noticia1 

    //4// cria interbalor par enviar emails a cada 2 segundos
    const intervalo = setInterval(() =>{
        
            enviarEmail(titulo, resumo, url ,id,Emails, cont)
        
        cont++;
        
        if(cont == Emails.length ){
            
            clearInterval(intervalo);
            cont = 0;
        }
    }, 2000)
    
    await storage.init();
    const enviaEmail = await storage.getItem('Email');
    res.send(enviaEmail);
});

