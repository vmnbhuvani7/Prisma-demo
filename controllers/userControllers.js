const prisma = require('../prisma')
const cookieToken = require('../utils/cookieToken')

// User signup

exports.signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        console.log("🚀 ~ exports.signUp= ~ name, email, password:", name, email, password)
        if (!name || !email || !password) {
            throw new Error('Please provide all fields')
        }
        const user = await prisma.user.create({
            data: {
                name, email, password
            }
        })
        console.log("🚀 ~ exports.signUp= ~ user:", user)

        // Send user token
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}

// login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error('Please provide all fields')
        }
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            throw new Error('No user found')
        }
        if (user.password !== password) {
            throw new Error('Password is incorrect')
        }

        // Send user token
        cookieToken(user, res)

        console.log("🚀 ~ exports.signUp= ~ user:", user)

    } catch (error) {
        throw new Error(error)
    }
}

// Logout user
exports.logout = async (req, res, next) => {
    try {
       res.clearCookie('token');
       res.json({
        success: true
       })

    } catch (error) {
        throw new Error(error)
    }
}
