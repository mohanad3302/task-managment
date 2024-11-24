const express = require('express');
const { create_task, get_all_tasks ,update_task} = require('../controllers/task_controller');
router = express.Router();


router.post("/createTask",create_task)
router.get("/getTasks" , get_all_tasks)
router.post("/updateTask", update_task)
module.exports= router

