import express from "express"
import cors from "cors"

const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Routes
import jobRoutes from "./routes/job.route.js"
import applicationRoutes from "./routes/application.route.js"
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"

app.use("/api/v1", jobRoutes)
app.use("/api/v1", applicationRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1", applicationRoutes);

export default app 
