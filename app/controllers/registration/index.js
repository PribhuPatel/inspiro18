
const router = require('express').Router();
const { handleExceptions } = require('../../middlewares/errorHandlers');

/* login post routing example */
router.post('/byvolunteer', handleExceptions(require('./byvolunteer').register));

/* signup routing example */
//router.post('/signup', handleExceptions(require('./signup').signUp));

module.exports = router;
