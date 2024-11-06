const listaAnimes = require('../mocks/listaAnimes');

function middlewareGetAnimeById(req, res, next) {
    const { id } = req.params;
    const anime = listaAnimes.find(anime => anime.id === Number(id));
    //Middleware propriamente dito
    try {
        if (!anime) {
            return res.status(404).send("❗ Erro: Anime não encontrado 😰");
        }
    } catch (error) {
        res.send(`🤔 Algo deu errado! Erro: ${error}`);
    }

    next(); // Função para redirecionar o fluxo sem interrompê-lo.
};

function middlewarePostAnime(req, res, next) {
    const { nome, ano, nota, genero, episodios, imagem, sinopse } = req.body;
    // Validação para ver se já existe um anime com mesmo nome
    const anime = listaAnimes.find(anime => anime.nome === nome);

    try {
        // !*algo* se refere a variável sendo preeenchida com: '', undefined, 0 ou false. 
        if (!req.body || !nome || !ano || !nota || !genero || !episodios || !imagem || !sinopse) {
            return res.status(400).send("❗ Erro: Corpo da requisição vazio ou formato incorreto. ");
        }
        if (anime) {
            return res.status(400).send("❗ Erro: Anime já cadastrado");
        }
    } catch (error) {
        res.send(`🤔 Algo deu errado! Erro: ${error}`);
    }

    next();
};


module.exports = {
    middlewareGetAnimeById,
    middlewarePostAnime
}