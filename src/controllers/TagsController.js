const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TagsController {
	async create(req, res) {
		const { name } = req.body;

		let { postId } = req.params;
		postId = parseInt(postId);

    const checkTag = await prisma.tag.findUnique({
      where: { name }
    })

    if (checkTag) {
      
    }

    const newTag = await prisma.tag.create({
      data: { name, postId }
    })

    return res.status(201).json(newTag)
	}

  async listAll(req, res) {}

  async listForPost(req, res) {}
}

module.exports = TagsController;
