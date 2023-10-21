const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TagsController {
	async create(req, res) {
		const { name } = req.body;

		let { posts } = req.params;
		posts = parseInt(posts);

		const checkTag = await prisma.tag.findUnique({
			where: { name }
		})

		if (checkTag) {
			return res.status(400).json("A tag já existe")
		}

		const newTag = await prisma.tag.create({
			data: { name, posts }
		})

		return res.status(201).json(newTag)
	}

	async listAll(req, res) {
		const allTags = await prisma.tag.findMany();

		return res.status(201).json(allTags)
	}

	async listForPost(req, res) {
		let { post } = req.params
		post = parseInt(post)

		const postsWithTag = await prisma.tag.findMany()
			//where: { post });
	}
}

module.exports = TagsController;
