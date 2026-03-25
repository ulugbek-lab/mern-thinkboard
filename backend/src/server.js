import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./configs/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path, { dirname } from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
//middleware

app.use(express.json()); // this middleware will parse JSON bodies: req.body

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

//cors allow every request from every URL(from frontend url to backend ) but i am also specifiying it with my own frontend localhost
app.use(express.json());
app.use(rateLimiter); //limit the number of request per certain time

app.use("/api/notes", notesRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  });
});
