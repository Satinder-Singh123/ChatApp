import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth_route.js";
import messageRoutes from "./routes/message.routes.js"
import usersRoutes from "./routes/users.routes.js"

import { connectDb } from "./db/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json())// to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser()) ; //to parse the incoming cokkies from req.cookies

//app.get("/", (req, res) => {
  //root route http://localhost:5000/
  //res.send("Hello server this !!!");
//});
app.use("/api/auth", authRoutes);

app.use("/api/message", messageRoutes);

app.use("/api/users", usersRoutes);

app.listen(PORT, () => 
  {
    connectDb();
    console.log(`Server running on port 5000  ${PORT}`)
}
);
