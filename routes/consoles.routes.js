const express = require('express');

// Controllers
const {
	getAllConsoles,
	createConsole,
	updateConsole,
	deleteConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const { consoleExists } = require('../middlewares/consoles.middlewares');
const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
	createConsolesValidators,
} = require('../middlewares/validators.middlewares');

const consolesRouter = express.Router();

/*****************
 * Routers Console  *
 ****************/

consolesRouter.get('/', getAllConsoles); // nok

// Protecting below endpoints
consolesRouter.use(protectSession);

consolesRouter.post('/', createConsolesValidators, createConsole);

consolesRouter.patch('/:id', consoleExists, updateConsole);

consolesRouter.delete('/:id', consoleExists, deleteConsole);

module.exports = { consolesRouter };