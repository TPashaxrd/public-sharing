const mongoose = require("mongoose")
const slugify = require("slugify")

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'PublicUsers',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    IP_Address: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    view: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

PostSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model("PublicPosts", PostSchema)