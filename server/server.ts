const express = require("express");
const app = express();

// routes
app.use("/menu", express.static("../game"));
app.use("/tutorial", express.static("../game"));
app.use("/multiplayer", express.static("../game"));
app.use("/multiplayer/:token", express.static("../game"));
app.use("/settings", express.static("../game"));

app.use("/", (req, res) => {
    res.redirect("/menu");
});
app.use("*", (req, res) => {
    res.redirect("/menu");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listens on http://localhost:${port}`);
});