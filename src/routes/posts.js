const { Router } = require("express");

const PostsController = require("../controllers/PostsController");

const postsRoutes = Router();

const postsController = new PostsController();

postsRoutes.post("/create", postsController.create);
postsRoutes.get("/", postsController.listAll);
postsRoutes.get("/:id", postsController.listForAuthor);

module.exports = postsRoutes;
