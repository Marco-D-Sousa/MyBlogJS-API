const { Router } = require("express");

const PostsController = require("../controllers/PostsController");

const postsRoutes = Router();

const postsController = new PostsController();

postsRoutes.post("/create", postsController.createPost);
postsRoutes.post("/update/:postId", postsController.updatePost);

postsRoutes.get("/", postsController.listAll);
postsRoutes.get("/:id", postsController.listForAuthor);

postsRoutes.delete("/", postsController.delete);

module.exports = postsRoutes;
