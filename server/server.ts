const express = require("express");
const app = express();

// routes
app.use("/tutorial", express.static("../client"));
app.use("/multiplayer", express.static("../client"));
app.use("/multiplayer/:token", express.static("../client"));
app.use("/settings", express.static("../client"));

app.use("/", express.static("../client"));
app.use("*", (req, res) => {
    res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listens on http://localhost:${port}`);
});