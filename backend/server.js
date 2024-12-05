import express from "express";
import dotenv from "dotenv";
//import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app= express();
const PORT=process.env.PORT|| 5000; //if not defined 50000


// app.get("/", (req, res)=>{
//     res.send("Hello world");
// });

//app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);//alows us to parse incoming requests: req.body

app.listen(PORT, ()=>{
 connectDB();
 console.log("Server is running on port: ", PORT);
});


