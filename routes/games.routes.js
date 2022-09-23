const express = require('express');

// Controllers
const {
	getAllGames,
	createGame,
	createReview,
	updateGame,
	deleteGame,
} = require('../controllers/games.controller');

// Middlewares
const { gameExists } = require('../middlewares/games.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
	createGameValidators,
} = require('../middlewares/validators.middlewares');

const gamesRouter = express.Router();

/*****************
 * Routers Game  *
 ****************/

gamesRouter.get('/', getAllGames);

// Protecting below endpoints
gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.post('/reviews/:gameId', createReview);

gamesRouter.patch('/:id', gameExists, updateGame);

gamesRouter.delete('/:id', gameExists, deleteGame);

gamesRouter.post('/reviews/:gameId', gameExists, createReview);

module.exports = { gamesRouter };