import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";  
import messagesRoutes from "./routes/messages.route.js";  
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Backend is running on port 3000");
    });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));