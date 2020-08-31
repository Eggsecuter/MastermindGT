const express = require("express");
const app = express();

// routes
app.use("/", express.static("../client"));
app.use("*", (req, res) => {
    res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listens on http://localhost:${port}`);
});