import express from "express";
import cors from "cors";
import { connectMongoDB } from "./config/db.config.js";

// routes
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// ensure DB connection per request (serverless safe)
app.use(async (req, res, next) => {
    try {
        await connectMongoDB();
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database connection failed" });
    }
});

// routes
app.use("/api/v1", jobRoutes);
app.use("/api/v1", applicationRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
