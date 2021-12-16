
//5//Manda exibir todas as noticias.
axios.get('http://localhost:3000/noticia/')
.then((response) => {
    console.log(response.data);
});

//5//Envia o email de ID 1 para todos os emails cadastrados.
axios.put('http://localhost:3000/enviar/1')
.then((response) => {
    console.log(response.data);
});
