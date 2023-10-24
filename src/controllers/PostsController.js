const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const AppError = require('../utils/AppError')

class PostsController {

	async createPost(req, res) {
		const {title, content, authorId, tags} = req.body

		try {
			const user = await prisma.user.findUnique({
				where: {id: authorId},
			})

			const postData = {
				title,
				content,
				authorId: user.id
			}

			if (tags && tags.length > 0) {
				postData.tags = {
					connectOrCreate: tags.map((tag) => ({
						create: { name: tag },
						where: { name: tag }
					}))
				}
			}

			const post = await prisma.post.create({
				data: postData
			})

			return res.status(201).json(post)
		}
		catch (e) {
			console.log(e.message)
			//throw new AppError("Vindo do AppError!")
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async updatePost(req, res) { //TODO colocar para atualizar o título e conteúdo do Post
		const {title, content, newTags} = req.body
		let {postId} = req.params

		try{
			const post = await  prisma.post.findUnique({
				where: { id: Number(postId) }
			})

			post.title = title ?? post.title;
			post.content = content ?? post.content;
			post.tags = newTags ?? post.tags;

			const postData = {
				title,
				content
			}

			if (newTags && newTags.length > 0) {
				postData.tags = {
					connectOrCreate: newTags.map((tag) => ({
						create: { name: tag },
						where: { name: tag }
					}))
				}
			}

			const updatedPost = await prisma.post.update({
				where: { id: post.id },
				data: postData
			})

			return res.status(201).json(updatedPost)
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async listAll(req, res) {
		try {
			const allPosts = await prisma.post.findMany({
				include: { tags: true }
			});

			return res.status(201).json(allPosts);
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async listForAuthor(req, res) {
		let {id} = req.params;

		try{
			const postForAuthor = await prisma.post.findMany({
				where: {authorId: Number(id)},
				include: { tags: true }
			});

			return res.status(201).json(postForAuthor);
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async delete(req, res) {
		let {userId, postId} = req.body;

		const deletedPost = await prisma.post.findUnique({
			where: { id: postId }
		})

		if(!deletedPost) {
			return res.status(400).json({message: "Post nao encontrado!"})
		}

		const checkOwner = deletedPost.authorId === userId;

		if(!checkOwner) {
			return res.status(400).json({message: "Post e autor nao conferem!"})
		}

		await prisma.post.delete({
			where: { id: postId }
		})

		return  res.status(201).json(deletedPost)
	}
}

module.exports = PostsController;
