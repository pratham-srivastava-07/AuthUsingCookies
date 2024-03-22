import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

const JWT_SECRET = "test123"

app.post("/signin", (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    // validation
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token);
    res.send("logged In");
})

app.get("/user", (req, res)=> {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    res.json({
        userId: decoded.id
    })
})


app.post("/logout", (req, res)=> {
    res.clearCookie("token")
    res.cookie("token", "");
    res.json({
        messege: "Logged Out!"
    })
})

app.listen(3000)