const prisma = require('../prisma/index.js');

exports.createPost = async (req, res, next) => {
    try {
        const { slug, title, body, authorId } = req.body
        console.log("🚀 ~ exports.createPost= ~ req.body:", req.body)
        const result = await prisma.post.create({
            data: { slug, title, body, author: { connect: { id: authorId } } }
        })

        console.log("result", result)
        res.json(result)
    } catch (error) {
        new Error(error)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, body } = req.body
        const result = await prisma.post.update({
            // data: { slug, title, body, author: { connect: { id: authorId } } }
            where: { id },
            data: { title, body }
        })

        console.log("result", result)
        res.json(result)
    } catch (error) {
        new Error(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await prisma.post.delete({
            where: { id },
        })

        console.log("result", result)
        res.json(result)
    } catch (error) {
        new Error(error)
    }
}

exports.getAllPost = async (req, res, next) => {
    try {
        const result = await prisma.post.findMany()
        console.log("result", result)
        res.json(result)
    } catch (error) {
        new Error(error)
    }
}
