const Post = require("../models/Post");

const CreatePost = async (req, res) => {
    try {
        const { title, message, IP_Address, password, isPublic } = req.body;
        if(!title || !message || !IP_Address) {
            return res.status(201).json({ message: "All fields are required."})
        }
        if(!req.session.userId) {
            return res.status(400).json({ message: "Not logged in."})
        }

        const newPost = new Post({
            user: req.session.userId,
            title,
            message,
            IP_Address,
            password,
            isPublic
        })

        await newPost.save()

        res.status(201).json({ newPost })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
        if(!post) {
            return res.status(404).json({ message: "Message not found." })
        }

        post.view = (post.view || 0) + 1;
        await post.save();

        res.status(200).json({ message: "View incremented", view: post.view })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllPublicPosts = async (req, res) => {
    try {
        const posts = await Post.find({ isPublic: true })
                                 .sort({ createdAt: -1 })
                                 .populate("user", "-password")
                                 .lean()
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu", error: error.message });
    }
};

const getPostBySlug = async(req, res) => {
    try {
        const { slug } = req.params;
        const post = await Post.findOne({ slug })
        .select("-IP_Address")
        .populate("user", "username profilePicture")

        if(!post) return res.status(404).json({ message: "Post not found."})

        res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { CreatePost, incrementViews, getAllPublicPosts, getPostBySlug }