const express = require('express');
const router = express.Router();
const animesControllers = require('../controllers/animeControllers');
const animesMiddlewares = require('../middlewares/animeMiddlewares');


// Endpoints
router.get('/', (req, res) => {
    res.send(`Bem vindo(a) à API!`);
  });

router.get('/animes', animesControllers.getAllAnimes);

router.get('/animes/:id', animesMiddlewares.middlewareGetAnimeById, animesControllers.getAnimeById);

router.post('/animes', animesMiddlewares.middlewarePostAnime, animesControllers.postAnime);

router.put('/animes/:id', animesControllers.updateAnime);

router.delete('/animes/:id', animesControllers.deleteAnime);


module.exports = router;