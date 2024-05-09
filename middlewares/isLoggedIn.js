const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log("🚀 ~ isLoggedIn ~ token:", token)
        if(!token) {
            res.send('Please login')
            throw new Error('You are not logged in')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })
        console.log("🚀 ~ isLoggedIn ~ req:", req.user)
        next()
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = isLoggedIn