const express = require('express');
const { get_board, add_board, add_board_user, add_board_task } = require('../controllers/board_controller');

router = express.Router();

router.get("/getBoard", get_board)
router.post("/addBoard", add_board)
router.post("/addUser" , add_board_user)
router.post("/addTask", add_board_task)
module.exports = router