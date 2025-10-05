const express = require("express")
const { CreatePost, incrementViews, getAllPublicPosts, getPostBySlug } = require("../controllers/Post")

const router = express.Router()

router.post("/create", CreatePost)
router.patch("/view/:id", incrementViews)
router.get("/all", getAllPublicPosts)
router.get("/:slug", getPostBySlug)

module.exports = router