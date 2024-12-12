import dotenv from "dotenv";
import express, { json } from "express";
import userRoutes from "./routes/userRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import cors from 'cors';
dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:9000',
  methods: ['GET', 'POST' , 'PUT' , 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(json());
app.use(cors(corsOptions));
app.use("/api/auth", userRoutes);
app.use("/api" , scheduleRoutes);
app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
