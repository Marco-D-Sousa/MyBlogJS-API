const { Router } = require("express");

const usersRouter = require("./users");
const postsRouter = require("./posts");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/posts", postsRouter);

module.exports = routes;
