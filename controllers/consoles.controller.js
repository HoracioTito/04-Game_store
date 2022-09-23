const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Console } = require('../models/console.model');
const { Review } = require('../models/review.model');
const { Game } = require('../models/game.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


dotenv.config({ path: './config.env' });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllConsoles = catchAsync(async (req, res, next) => { // ok
	const consoles = await Console.findAll({
		where : { status : 'active' },
		include: { model: Game, through: { attributes: [] } },
        
	});

	res.status(200).json({
		status: 'success',
		data: { consoles },
	});
});

const createConsole = catchAsync(async (req, res, next) => { // ok
	const { name, company } = req.body;

	const newConsole = await Console.create({
		name,
		company,
	});

	// 201 -> Success and a resource has been created
	res.status(201).json({
		status: 'success',
		data: { newConsole },
	});
});


const updateConsole = catchAsync(async (req, res, next) => {

    const { console  } = req
	const {  name } = req.body;

	await console.update({ name });

	res.status(200).json({
		status: 'success',
		data: { name },
	});
});

const deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;

	await console.update({ status: 'deleted' }, { where :  console.id });

	res.status(204).json({ status: 'success' });
});



module.exports = {
	getAllConsoles,
	createConsole,
	updateConsole,
	deleteConsole,
};