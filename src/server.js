const express = require("express");
const routes = require("./routes")

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
	console.log(`Listening on http://localhost:${PORT} ...`);
});
//TODO ajustar melhor os erros