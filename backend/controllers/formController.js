const UserIncome = require('../models/userIncomeFormModel')
const User = require('../models/userModel')
const Projects = require('../models/projectSchemaModel')
const ProjectSchema = require("../models/projectSchemaModel")
const AdminIncForm = require("../models/adminIncomeFormModel")


const addIncomeForm=async(req,res)=>{
}

const validateIncomeAndSubmit = async (req, res) => {
    try {
        const userId = req.params.userId;
        const inputData = req.body.data; // Updated to use the entire request body
        const selectedFields = inputData.map(entry => entry.selectedActivity);
        let schemaId;

        try {
            const user = await User.findById(userId);
            const district = user.address.district.toUpperCase();
            const state = user.address.state.toUpperCase();
            const incomeData = [];
            const errorData = [];
            try {
                for (const entry of inputData) {
                    const projName = entry.projectName;
                    const projSchemaPromise = ProjectSchema.findOne({ state: state, district: district, projectName: projName });
                    const projPromise = ProjectSchema.findOne({ state: state, district: district, projectName: projName });
                    const [projSchema, proj] = await Promise.all([projSchemaPromise, projPromise]);

                    schemaId = projSchema._id;
                    let isPresent;

                    if (projSchema) {
                        var selectedActivity = entry.selectedActivity;
                        var capitalizedActivity = selectedActivity.charAt(0).toUpperCase() + selectedActivity.slice(1);
                        isPresent = projSchema.activities.indexOf(capitalizedActivity) !== -1;
                        // isPresent = projSchema.activities.indexOf(entry.selectedActivity) !== -1;

                        if (isPresent) {
                            incomeData.push({
                                "activity": capitalizedActivity,
                                "amount": entry.incomeEarned,
                                "projectName": projName,
                                "projectId": proj._id
                            });
                        } else {
                            errorData.push({
                                "activity": capitalizedActivity,
                                "amount": entry.incomeEarned,
                                "projectName": projName,
                                "projectId": proj._id
                            });
                        }
                    }
                }

                try {
                    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const d = new Date();
                    let monthName = month[d.getMonth()];
                    let year = d.getFullYear();

                    const income = new UserIncome({
                        "userId": userId,
                        "schemaId": schemaId,
                        "month": monthName,
                        "year": year,
                        "income": incomeData
                    });

                    const result = await income.save();

                    if (errorData.length > 0) {
                        return res.status(200).json({
                            "status": "success",
                            "code": 200,
                            "isError": true,
                            "data": result,
                            "errorData": errorData
                        });
                    }

                    return res.status(200).json({
                        "status": "success",
                        "code": 200,
                        "isError": false,
                        "data": result
                    });
                } catch (error) {
                    return res.status(401).json({
                        "status": "error",
                        "code": 401,
                        "message": error.message
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    "status": 'error',
                    "code": 400,
                    "message": error.message
                });
            }
        } catch (error) {
            return res.status(405).json({
                "status": 'error2',
                "code": 405,
                "message": error.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        });
    }
};


module.exports = {
    addIncomeForm,
    validateIncomeAndSubmit
}

