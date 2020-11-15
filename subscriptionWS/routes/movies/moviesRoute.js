const express = require('express');
const router = express.Router();
const MoviesBL = require('../../models/movies/moviesBL');

router.get('/', MoviesBL.getAllMovies);
router.get('/:id', MoviesBL.getMovieById);
router.post('/', MoviesBL.createMovie);
router.put('/:id', MoviesBL.updateMovie);
router.delete('/:id', MoviesBL.removeMovie);

module.exports = router;