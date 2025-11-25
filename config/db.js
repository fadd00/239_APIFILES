const db = require("../models");

async function connectDatabase() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connection has been established successfully.");

        await db.sequelize.sync({ alter: true });
        console.log("Database synchronized successfully");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
}

module.exports = connectDatabase;