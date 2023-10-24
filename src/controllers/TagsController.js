const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TagsController {

	async listAll(req, res) {
		try{
			const allTags = await prisma.tag.findMany();

			return res.status(201).json(allTags)
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}

	}

	async listTagsForPost(req, res) {
		const { postId } = req.params

		try{
			const tagsInPost = await prisma.post.findUnique({
				where: { id: Number(postId) },
				include: { tags: true }
			})

			return res.status(201).json(tagsInPost)
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async postHasTag(req, res) {
		const { tagName } = req.body

		try{
			const posts = await prisma.post.findMany({
				where: {
					tags: { some: { name: tagName } }
				},
				include: { tags: true }
			})

			return res.status(201).json(posts)
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}
}

module.exports = TagsController;
