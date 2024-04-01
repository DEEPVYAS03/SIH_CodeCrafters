const Admin = require("../models/adminModel")
const bcrypt = require('bcrypt')

const createAdmin = async (req, res) => {
    try {
        const name = req.body.name
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const checkUsername = Admin.findOne({ username: username })
        const checkEmail = Admin.findOne({ email: email })
        const [emailExists, usernameExists] = await Promise.all([checkEmail, checkUsername])
        if (emailExists && usernameExists) {
            return res.status(400).json({
                "status": "fail",
                "code": 400,
                "message": "Username and Email already exists"
            })
        }
        if (emailExists) {
            return res.status(400).json({
                "status": "fail",
                "code": 400,
                "message": "Username already exists"
            })
        }
        if (usernameExists) {
            return res.status(400).json({
                "status": "fail",
                "code": 400,
                "message": "Email already exists"
            })
        }
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const admin = new Admin({
                name: name,
                username: username,
                email: email,
                password: hashedPassword
            })
            admin.save()
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "Admin Created Successfully",
                "data": admin
            })
        } catch (error) {
            return res.status(400).json({
                "status": "fail",
                "code": 400,
                "message": error.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        })
    }
}

const adminLogin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const admin = await Admin.findOne({ username: username })
        if (!admin) {
            return res.status(400).json({
                "status": "fail",
                "code": 400,
                "message": "Username does not exists"
            })
        }
        try {
            const validation = await bcrypt.compare(password, admin.password)
            if (!validation) {
                return res.status(400).json({
                    "status": "fail",
                    "code": 400,
                    "message": "Password is incorrect"
                })
            }
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "Admin Logged In Successfully",
                "data": admin
            })
        } catch (e) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": e.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        })
    }
}

module.exports = {
    createAdmin,
    adminLogin
}