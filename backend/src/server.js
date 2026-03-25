import express from "express";
import notesRoutes from "./routes/notesRoute.js";
import { connectDB } from "./configs/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); //cors allow every request from every URL(from frontend url to backend ) but i am also specifiying it with my own frontend localhost
app.use(express.json());
app.use(rateLimiter); //limit the number of request per certain time

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  });
});
