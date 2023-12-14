const User = require("../models/userModel")
const axios = require('axios');

function formatParameter(param) {
    return param.replace(/\s/g, '+');
}

const createProfile = async (req, res) => {
    try {
        const { name,number ,preference, address, presentIncome } = req.body;
        try {
            const village = address.village;
            const district = address. district;
            const state = address. state;
            const country = 'India';

            const formattedVillage = formatParameter(village);
            const formattedDistrict = formatParameter(district);
            const formattedState = formatParameter(state);

            const queryString = `${formattedVillage}+${formattedDistrict}+${formattedState}+${country}`;

            const response = await axios.get(`https://geocode.maps.co/search?q=${queryString}`)
            const latitude = response.data[0].lat
            const longitude = response.data[0].lon

            try {
                const user = new User({
                    name: name,
                    number: number,
                    preference: preference,
                    address: address,
                    presentIncome: presentIncome,
                    location:{
                        type:'Point',
                        coordinates:[longitude,latitude]
                    }
                });
                const result = await user.save();
                return res.status(200).json({
                    "status": "success",
                    "code": 200,
                    "data": result
                })
            } catch (error) {
                return res.status(400).json({
                    "status": "error1",
                    "code": 400,
                    "message": error.message
                })
            }
        } catch (error) {
            return res.status(400).json({
                "status": "error2",
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

const getUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (user) {
                return res.status(200).json({
                    "status": "success",
                    "code": 200,
                    "data": user
                })
            }
            return res.status(404).json({
                "status": "error",
                "code": 404,
                "message": "User not found"
            })
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


module.exports = {
    createProfile,
    getUserProfile
}