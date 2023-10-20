const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostsController {
	async create(req, res) {
		const { title, content, authorId } = req.body;

		const user = await prisma.user.findUnique({
			where: { id: authorId },
		});

		const post = await prisma.post.create({
			data: {
				title,
				content,
				authorId: user.id,
			},
		});
		console.log(user.id);
		return res.status(201).json(post);
	}

	async listAll(req, res) {
		const allPosts = await prisma.post.findMany();

		return res.status(201).json(allPosts);
	}

	async listForAuthor(req, res) {
		let { id } = req.params;
		id = parseInt(id);

		const postForAuthor = await prisma.post.findMany({
			where: { authorId: id },
		});
		console.log(id);
		return res.status(201).json(postForAuthor);
	}

	async delete(req, res) {
		let { authorId, postId } = req.params;
		authorId = parseInt(authorId);
		postId = parseInt(postId);

		const deletedPost = await prisma.post.findFirstOrThrow({
			
		})
	}
}

module.exports = PostsController;
