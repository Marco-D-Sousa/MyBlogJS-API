const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", tagsController.listAll);
tagsRoutes.get("/find", tagsController.postHasTag);
tagsRoutes.get("/:postId", tagsController.listTagsForPost);


module.exports = tagsRoutes;
