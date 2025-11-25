const express = require("express");
const Task = require("../models/task");
const router = express.Router();

const {handleCreateTask, handleAllTask, handleUpdateTask, handleDeleteTask} = require("../controller/task");

router.post("/", handleCreateTask);
router.get("/",handleAllTask);
router.put("/:id",handleUpdateTask);
router.delete("/:id",handleDeleteTask);

module.exports = router;