const axios = require('axios').default


//3//Cliente que manda adicionar 5 notícias e 7 e-mail
const noticias = [{
    ID: 1,
    titulo: '1# Elas vão substituir você ',
    resumo: 'Até 2030, as máquinas devem acabar com a metade dos trabalhos existentes hoje',
    url: 'https://veja.abril.com.br/revista-veja/elas-vao-substituir-voce/'
    },
    {
        ID: 2,
        titulo: '2# Perigo importante, soluções simples',
        resumo: 'Se tudo fosse tão fácil quanto parece',
        url: 'https://veja.abril.com.br/blog/lillian-witte-fibe/perigo-importante-solucao-simples/'
    },
    {
        ID: 3,
        titulo: '3# Correção nos chips pode reduzir velocidade',
        resumo: 'Executivo diz que impacto dependerá da carga de trabalho',
        url: 'https://veja.abril.com.br/economia/correcao-nos-chips-pode-reduzir-velocidade-diz-ceo-da-intel/'
    },
    {
        ID: 4,
        titulo: '4# Google lança jogo que ensina linguans de programação',
        resumo: 'O programa é uma modificação do logo do site de buscas',
        url: 'https://veja.abril.com.br/economia/google-lanca-jogo-que-ensina-logica-de-programacao-a-criancas/'
    },
    {
        ID: 5,
        titulo: '5# Cientistas armazenam luz na forma de som',
        resumo: 'A descoberta pode ajudar no desenvolvimento',
        url: 'https://veja.abril.com.br/ciencia/cientistas-armazenam-luz-na-forma-de-som-pela-primeira-vez/'
    }

]

const emails = ['fps2887@gmail.com', 'felipesou@alunos.utfpr.edu.br', 'luispaulo@gmail.com', 'fernanda@hotmail.com', 'joao@hotmail.com', 'maria@hotmail.com', 'paulo@hotmail.com']





axios.post('http://localhost:3000/noticia', noticias

    )
    .then((res) => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response.data);
    });



axios.post('http://localhost:3000/inscricao',emails

    )
    .then((res) => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.data);
    });