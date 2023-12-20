const bcrypt = require("bcrypt");
const AdminUser = require("../models/adminUserModel")
const Otp = require('../models/otpModel');
const User = require('../models/userModel')
const twilio = require('twilio');
require('dotenv').config();

//Random otp generation
function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}



//Sending otp
const getOTP = async (req, res) => {
    try {
        const number = req.body.number;
        // const isRegistered = await AdminUser.findOne({number: number});
        // if(!isRegistered) {
        //     return res.status(403).json({
        //         "status": "error",
        //         "code": 403,
        //         "message": "User not registered"
        //     })
        // }


        let OTP = generateOTP(6);
        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;

        const client = new twilio(accountSid, authToken);

        try {
            // client.messages.create({
            //     body: `Your OTP is ${OTP}`,
            //     to: `+919987946253`,
            //     from: '+18589432913'
            // })
            //     .then((message) => console.log(message.sid));

            const otp = new Otp({ number: number, otp: OTP });
            const salt = await bcrypt.genSalt(10)
            otp.otp = await bcrypt.hash(otp.otp, salt);
            const result = await otp.save();
            return res.status(200).json(
                    {
                        "status": "success",
                        "code": 200,
                        "data": { OTP, result }
                    }
            );
        } catch (error) {
            return res.status(400).json({
                "status": "error",
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


const verifyOtp = async (req, res) => {
    try {
        const number = req.body.number
        const otp = req.body.otp

        const userPromise = User.findOne({number: number})
        const otpHolderPromise = Otp.find({
            number: number
        });
        const [user,otpHolder] = await Promise.all([userPromise,otpHolderPromise])
        if (!otpHolder) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": "OTP has expired"
            })
        }
        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(otp, rightOtpFind.otp);

        if (rightOtpFind.number === number && validUser) {

            const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number
            });
            if(user){
                return res.status(200).json({
                    "status": "success",
                    "code": 200,
                    "message": "OTP verified successfully",
                    "isUser": true,
                    "data": user
                });
            }
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "OTP verified successfully",
                "isUser": false
            });
        } else {
            return res.status(404).json({
                "status": "error",
                'code': 404,
                "message": "Wrong OTP"
            })
        }
    } catch (error) {
        res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": "Internal Server Error"
        })
    }
}


const checkUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "User found",
                "data": user
            })
        }
        return res.status(404).json({
            "status": "error",
            "code": 404,
            "message": "User not found"
        })
    } catch (error) {
        res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": "Internal Server Error"
        })
    }
}

module.exports = {
    getOTP,
    verifyOtp,
    checkUser
}