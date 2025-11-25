const express = require("express");
const connectDatabase = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    if (err instanceof require('multer').MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                error: `Unexpected field name for file upload: '${err.field}'. Please use the key 'image'.`
            });
        }
        return res.status(400).json({ success: false, error: err.message });
    }
    if (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
    next();
});

async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();