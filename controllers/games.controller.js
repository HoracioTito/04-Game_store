const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { GameInConsole } = require('../models/gameInConsole.model');
const { User } = require('../models/user.model');
const { Console } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllGames = catchAsync(async (req, res, next) => {
	const games = await Game.findAll({
		where : { status : 'active' },
		include: [
			{
				model: Review,
				include: { model: User, attributes: { exclude: ['password'] } },
			},
			{ model: Console },
		],
        
	});

	res.status(200).json({
		status: 'success',
		data: { games },
	});
});

const createGame = catchAsync(async (req, res, next) => {

	const { title, genre, consoleId } = req.body;

	const newGame = await Game.create({ title, genre });

	// Assign game to console. Nota newGame contiene el id del registro insertado en table 'game' 
	await GameInConsole.create({ consoleId, gameId: newGame.id });

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newGame },
	});
});

const createReview = catchAsync(async (req, res, next) => {
	const { comment } = req.body;
    const { gameId } = req.params
    const { sessionUser } = req


	const newReview = await Review.create({
        userId : sessionUser.id,
        comment,
        gameId
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newReview },
	});
});



const updateGame = catchAsync(async (req, res, next) => {

    const { game  } = req
	const {  title } = req.body;

	await game.update({ title });

	res.status(200).json({
		status: 'success',
		data: { title },
	});
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await user.update({ status: 'deleted' }, { where :  game.id });

	res.status(204).json({ status: 'success' });
});



module.exports = {
	getAllGames,
	createGame,
	createReview,
	updateGame,
	deleteGame,
};