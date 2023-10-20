const { Router } = require("express");

const usersRouter = require("./users");
const postsRouter = require("./posts");
const tagsRouter = require("./tags");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/posts", postsRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;
