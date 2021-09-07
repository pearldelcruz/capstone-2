

let express = require(`express`);
const router = express.Router();
const userController = require(`./../controllers/userControllers`);
// const courseController = require(`./../controllers/courseControllers`);

const auth = require(`./../auth`)

module.exports = router;