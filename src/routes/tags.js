const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", tagsController.listAll);
tagsRoutes.get("/:postId", tagsController.listForPost);

tagsRoutes.post("/:postId", tagsController.create);

module.exports = tagsRoutes;
