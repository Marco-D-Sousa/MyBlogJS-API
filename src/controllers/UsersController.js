const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

class UsersController {
	async create(req, res) {
		const { name, email, password } = req.body;

		const checkUserExists = await prisma.user.findUnique({
			where: { email },
		});

		if (checkUserExists) {
			//throw new AppError("Este email já está em uso.")
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
		const { name, email, password } = req.body;

		const searchUser = await prisma.user.findUnique({
			where: { email },
		});

		if (!searchUser) {
			return res.status(400).json("EMAIL e/ou senha nao conferem");
		}

		const verify = bcrypt.compareSync(password, searchUser.password);
		if (!verify) {
			return res.status(400).json("email e /ou SENHA nao conferem");
		}

		const hash = bcrypt.hashSync(password, 4);

		const updatedUser = await prisma.user.update({
			where: { email },
			data: { name, password: hash },
		});

		return res.status(200).json(updatedUser);
	}
}

module.exports = UsersController;
