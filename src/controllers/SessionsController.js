const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json("user not find")
    }

    if (user && bcrypt.compareSync(password, user.password)){
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "1h",
				}
			);

			user.token = token;
			
			return res.status(201).json({user})
		}

    return res.status(400).json("invalid credentials")
  }
}

module.exports = SessionsController