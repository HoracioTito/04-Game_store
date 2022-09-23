// Models
const { Game } = require('../models/game.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const gameExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const game = await Game.findOne({
		where: { id , status : 'active'},
	});

	// If user doesn't exist, send error message
	if (!game) {
		return next(new AppError('User not found', 404));
	}

	// req.anyPropName = 'anyValue'
	req.game = game;
	next();
});

module.exports = {
	gameExists,
};
