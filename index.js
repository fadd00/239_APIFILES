const express = require("express");
const connectDatabase = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", apiRoutes);

async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();