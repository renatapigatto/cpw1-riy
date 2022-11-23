//redirecionador do html da div .conteudo

const rota = (event) => {// lida com o comportamento dos links e as mudanças de local
    event = event || window.event; //cria o evento de click
    event.preventDefault();//faz com que o 'a' não mude de página
    window.history.pushState({}, "", event.target.href); //muda o nome da página na url
    mudarRota();
    mudarTitulo();

};

const rotas = {//links que serão seguidos pela função
    404: "/pages/404.html",//default caso a página não exista
    "/": "src/paginas/index.html",
    "/envie-diy":"src/paginas/envie-diy.html",
    "/pq-reciclar": "src/paginas/pq-reciclar.html"
};

const mudarRota = async () => {
    const caminho = window.location.pathname;//pega o href da página atual
    const rota = rotas [caminho] || rotas [404];//substitui p href pelos links da const rotas
    const html = await fetch(rota).then((data) => data.text());//busca o arquivo especificado na const rotas
    document.getElementById("conteudo").innerHTML = html;//coloca o html do arquivo dentro da div conteudo
};


const mudarTitulo = async() => {
    var titulo = document.getElementById("titulo");
    switch (rotas){
        case "/":
            titulo.innerText = "R.I.Y - Reuse Você Mesmo";
        case "/envie-diy":
            titulo.innerText = "Envie o seu D.I.Y";
        case "/pq-reciclar": 
            titulo.innerText = "Por que reciclar?";
    } 
}



window.onpopstate = mudarRota;//permite que o usuário use os botões de 'voltar' e 'ir' no navegador
window.rota = rota;
mudarRota();//chama a função logo que a página carrega
mudarTitulo();