const express = require("express");
const routes = require("./routes")

const auth = require("./middlewares/auth")

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(routes);

app.get("/auth", auth, (req, res) => {
	res.status(200).json(req.user.email)
})

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${PORT} ...`);
});
//TODO ajustar melhor os erros