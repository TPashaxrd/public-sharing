const express = require("express")
const { CreateUser, Login, me, Logout } = require("../controllers/Auth")

const router = express.Router()

router.post("/register", CreateUser)
router.post("/login", Login)
router.get("/logout", Logout)
router.get("/me", me)

module.exports = router