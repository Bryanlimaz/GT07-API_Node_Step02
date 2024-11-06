// animeController.js Para utilizar o Mock "listaAnime.js" --Extensão JS(JavaScript)
const listaAnimes = require('../mocks/listaAnimes'); //Const dos dados mockados

function getAllAnimes(req, res) {
    try {
        res.send(listaAnimes); //Retorna a lista(array) com todos os animes.
    } catch (error) {
        res.send(`🤔 Algo deu errado! Erro: ${error}`);
    }
};  // OBS: Essa função é usada para trabalhar com os dados do "mocks".

function getAnimeById(req, res) {
    const { id } = req.params; //Passando qual id do array eu quero achar, através da URL.
    const anime = listaAnimes.find(anime => anime.id === Number(id)); //Percorrendo o array atrás do 1° resultado que seja igual ao id que passei na URL.
        
    res.send(anime); //Retorna o anime (json) que tem ID igual ao ao número que passei na URL.
}

function postAnime (req, res) {
    const { nome, ano, nota, genero, episodios, imagem, sinopse } = req.body;
    const id = listaAnimes.length ? listaAnimes[listaAnimes.length - 1].id + 1 : 1;

    listaAnimes.push({ id, nome, ano, nota, genero, episodios, imagem, sinopse });
    res.status(201).send("🟢 Anime inserido com sucesso! 😁👍");
}

function updateAnime (req, res) {
    // Informação contida na URL
    const { id } = req.params;
    const { nome, ano, nota, genero, episodios, imagem, sinopse } = req.body; // Informação que está dentro do corpo da requisição
    const animeIndex = listaAnimes.findIndex(anime => anime.id === Number(id));

    if (!animeIndex === -1) // -1 é o valor que o JS retorna nativamente quando uma busca em um array difere do valor esperado, ou seja, não encontra nada com as caracteristicas que foram passadas
    {
        return res.status(404).send({message: "🔴 Anime não encontrado 😰"})
    }

    listaAnimes[animeIndex] = {
        ...listaAnimes[animeIndex], //Desestrutura o json para que todas os campos contidos nele sejam devidamente visualizados.
        nome,
        ano,
        nota,
        genero,
        episodios,
        imagem,
        sinopse
    }

    res.status(202).send("🟢 Anime atualizado com sucesso! 😁👍");
}

function deleteAnime (req, res) {
    const { id } = req.params;
    const animeIndex = listaAnimes.findIndex(anime => anime.id === Number(id));

    if (animeIndex === -1) {
        return res.status(404).send("🔴 Anime não encontrado 😰");
    }

    listaAnimes.splice (animeIndex, 1); //.splice é um método para remover informações de dentro de um array.

    res.status(200).send('🟢 Anime deletado da lista! ❌')
}



module.exports = {
    getAllAnimes,
    getAnimeById,
    postAnime,
    updateAnime,
    deleteAnime
}

// // animeController.js Para utilizar o Mock "listaAnime.json" --Extensão JSON(JavaScript Object Notation)
// const fs = require('fs').promises;
// const path = require('path');
// const listaAnimesPath = path.join(__dirname, '../mocks/listaAnimes.json');

// // Função assíncrona para carregar o array de animes do arquivo JSON
// async function loadAnimes() {
//     const data = await fs.readFile(listaAnimesPath, 'utf-8');
//     return JSON.parse(data);
// }

// // Função assíncrona para salvar o array atualizado no arquivo JSON
// async function saveAnimes(data) {
//     await fs.writeFile(listaAnimesPath, JSON.stringify(data, null, 2), 'utf-8');
// }

// // Lógica para os Endpoints das rotas animes
// async function getAllAnimes(req, res) {
//     try {
//         const listaAnimes = await loadAnimes();
//         res.send(listaAnimes);
//     } catch (error) {
//         res.status(500).send("Erro ao carregar a lista de animes: " + error);
//     }
// }

// async function getAnimeById(req, res) {
//     try {
//         const listaAnimes = await loadAnimes();
//         const { id } = req.params;
//         const anime = listaAnimes.find(anime => anime.id === Number(id));

//         if (!anime) {
//             return res.status(404).send("🔴 Anime não encontrado 😰");
//         }
//         res.send(anime);
//     } catch (error) {
//         res.status(500).send("Erro ao carregar o anime: " + error);
//     }
// }

// async function postAnime(req, res) {
//     if (!req.body || !req.body.nome) {
//         return res.status(400).send("Erro: Corpo da requisição vazio ou formato incorreto.");
//     }

//     try {
//         const listaAnimes = await loadAnimes();
//         const { nome, ano, nota, genero, episodios, imagem, sinopse } = req.body;
//         const id = listaAnimes.length ? listaAnimes[listaAnimes.length - 1].id + 1 : 1;

//         const newAnime = { id, nome, ano, nota, genero, episodios, imagem, sinopse };
//         listaAnimes.push(newAnime);
        
//         await saveAnimes(listaAnimes); // Salva o array atualizado no arquivo JSON
        
//         res.status(201).send("🟢 Anime inserido com sucesso! 😁👍");
//     } catch (error) {
//         res.status(500).send("Erro ao inserir o anime: " + error);
//     }
// }

// async function updateAnime(req, res) {
//     const { id } = req.params;
//     const { nome, ano, nota, genero, episodios, imagem, sinopse } = req.body;

//     try {
//         const listaAnimes = await loadAnimes();
//         const animeIndex = listaAnimes.findIndex(anime => anime.id === Number(id));

//         if (animeIndex === -1) {
//             return res.status(404).send({ message: "🔴 Anime não encontrado 😰" });
//         }

//         listaAnimes[animeIndex] = {
//             ...listaAnimes[animeIndex],
//             nome,
//             ano,
//             nota,
//             genero,
//             episodios,
//             imagem,
//             sinopse
//         };

//         await saveAnimes(listaAnimes); // Salva o array atualizado no arquivo JSON
        
//         res.status(202).send("🟢 Anime atualizado com sucesso! 😁👍");
//     } catch (error) {
//         res.status(500).send("Erro ao atualizar o anime: " + error);
//     }
// }

// async function deleteAnime(req, res) {
//     const { id } = req.params;

//     try {
//         const listaAnimes = await loadAnimes();
//         const animeIndex = listaAnimes.findIndex(anime => anime.id === Number(id));

//         if (animeIndex === -1) {
//             return res.status(404).send("🔴 Anime não encontrado 😰");
//         }

//         listaAnimes.splice(animeIndex, 1); // Remove o anime do array
//         await saveAnimes(listaAnimes); // Salva o array atualizado no arquivo JSON
        
//         res.status(200).send('🟢 Anime deletado da lista! ❌');
//     } catch (error) {
//         res.status(500).send("Erro ao deletar o anime: " + error);
//     }
// }