const express = require("express")
const cors = require("cors")
const db = require("./config/db")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const app = express()
const path = require("path")
const AuthRoutes = require("./routes/Auth")
const PasteRoutes = require("./routes/Posts")

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: "sessions"
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "lax",
        secure: false
    }
}))
app.use("/api/auth", AuthRoutes)
app.use("/api/paste", PasteRoutes)
app.use('/', (req, res) => {
    res.json(
        { message: "This Forum Web Created for R3T Team"}
    )
})
db()

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`)
})