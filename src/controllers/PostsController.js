const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const AppError = require('../utils/AppError')

class PostsController {
	async create(req, res) {
		const {title, content, authorId} = req.body;

		const user = await prisma.user.findUnique({
			where: {id: authorId},
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

	async createPostWithTags(req, res) {
		const {title, content, authorId, tags} = req.body

		try {
			const user = await prisma.user.findUnique({
				where: {id: authorId},
			})

			const post = await prisma.post.create({
				data: {
					title,
					content,
					authorId: user.id,
					tags: {
						connectOrCreate: tags.map((tag) => ({
							create: { name: tag },
							where: { name: tag }
						}))
					}
				}
			})

			return res.status(201).json(post)
		}
		catch (e) {
			console.log(e.message)
			//throw new AppError("Vindo do AppError!")
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async updateTagsInPost(req, res) { //TODO colocar para atualizar o título e conteúdo do Post
		const {newTags} = req.body
		let {postId} = req.params

		try{
			const updatedPost = await prisma.post.update({
				where: {id: Number(postId)},
				data: {
					tags: {
						connectOrCreate: newTags.map((tag) => ({
							create: { name: tag },
							where: { name: tag }
						}))
					}
				}
			})

			return res.status(201).json(updatedPost)
		}
		catch (e) {
			console.log(e.message)
			res.status(500).json({error: 'Something went wrong'});
		}
	}

	async listAll(req, res) {
		const allPosts = await prisma.post.findMany();

		return res.status(201).json(allPosts);
	}

	async listForAuthor(req, res) {
		let {id} = req.params;

		const postForAuthor = await prisma.post.findMany({
			where: {authorId: Number(id)},
		});

		return res.status(201).json(postForAuthor);
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
