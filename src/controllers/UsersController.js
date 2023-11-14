const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = require("../middlewares/auth")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UsersController {
	async create(req, res) {
		const { name, email, password } = req.body;

		const checkUserExists = await prisma.user.findUnique({
			where: { email },
		});

		if (checkUserExists) {
			return res.status(400).json("Este email já está em uso.");
		}

		const hash = bcrypt.hashSync(password, 4);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hash,
			},
		});
		return res.status(201).json(user);
	}

	async update(req, res) {
		const { name, email, newPassword, password  } = req.body;

		const searchUser = await prisma.user.findUnique({
			where: { email },
		});

		if (!searchUser) {
			return res.status(400).json("EMAIL e/ou senha nao conferem");
		}

		searchUser.name = name ?? searchUser.name;

		const verify = bcrypt.compareSync(password, searchUser.password);
		if (!verify) {
			return res.status(400).json("email e /ou SENHA nao conferem");
		}

		const newHash = bcrypt.hashSync(newPassword, 4);

		const updatedUser = await prisma.user.update({
			where: { email },
			data: { name, password: newHash },
		});

		return res.status(200).json(updatedUser);
	}

	async delete(req, res) {
		const { email, password } = req.body

		const searchUser = await prisma.user.findUnique({
			where: { email }
		})

		if (!searchUser) {
			return res.status(400).json("Usuário nao encontrado!")
		}

		const verify = bcrypt.compareSync(password, searchUser.password);
		if(!verify) {
			return res.status(400).json("senha nao confere")
		}

		const deletedPosts = prisma.post.deleteMany({
			where: { authorId: searchUser.id }
		})

		const deletedUser = prisma.user.delete({
			where: { id: searchUser.id }
		})

		await prisma.$transaction([deletedPosts, deletedUser])

		const deleteOrphanedTags = await prisma.tag.deleteMany({
			where: {
				posts: { none: {} }
			}
		})

		return res.status(200).json(searchUser);
	}

}

module.exports = UsersController;
