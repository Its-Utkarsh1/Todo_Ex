const Task = require("../models/task");

async function handleCreateTask(req, res) {
    try {

        const user = res.locals.user;
        if (!user) return res.status(400).json({ message: "Login Required" });

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            createdBy: user._id,
        });
        return res.status(201).json(task);
    }
    catch (err) {
        console.log("Task Creating error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function handleAllTask(req, res) {
    try {
        const user = res.locals.user;
        if (!user) return res.status(400).json({ message: "Login required" });

        const filter = user.role === "admin"
            ? {}
            : { createdBy: user._id };

        const tasks = await Task.find(filter);

        return res.json(tasks);
    } catch (err) {
        console.log("Get Tasks Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleUpdateTask(req, res) {
    try {
        const user = res.locals.user;

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // ❗ Allow only admin OR the user who created the task
        if (user.role !== "admin" && task.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Not allowed to update this task" });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;

        await task.save();

        return res.json({ message: "Task updated", task });

    } catch (err) {
        console.log("Error updating task:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function handleDeleteTask(req, res) {
    try {
        const user = res.locals.user;

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // ❗ Allow only admin OR the user who created the task
        if (user.role !== "admin" && task.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Not allowed to delete this task" });
        }

        await task.deleteOne();

        return res.json({ message: "Task deleted successfully" });

    } catch (err) {
        console.log("Error deleting task:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports ={
    handleCreateTask,
    handleAllTask,
    handleDeleteTask,
    handleUpdateTask
}