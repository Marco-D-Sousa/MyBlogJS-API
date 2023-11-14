const { Router } = require("express");
const auth = require("../middlewares/auth");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

usersRoutes.put("/update", auth, usersController.update);

usersRoutes.delete("/", auth, usersController.delete);

module.exports = usersRoutes;
