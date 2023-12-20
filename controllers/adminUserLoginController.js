const AdminUser = require("../models/adminUserModel")
const ExcelJS = require('exceljs')
const path = require('path');

const createUser = async (req, res) => {
    try {
        const { uid, first_name, last_name, number } = req.body
        const user = await AdminUser.create({ uid, first_name, last_name, number })
        res.status(200).json({
            "status": "success",
            "code": "200",
            "message": "User Created Successfully",
            "data": user
        })
    } catch (err) {
        res.status(400).json({
            "status": "fail",
            "message": err.message
        })
    }
}


const createMultipleUsers = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'User_data.xlsx');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('Sheet1');
        const columnIndices = {}
        const usersToInsert = []

        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber === 1) {
                // Identify the column indices based on column names
                columnIndices.uid = row.values.indexOf('uid');
                columnIndices.first_name = row.values.indexOf('first_name');
                columnIndices.last_name = row.values.indexOf('last_name');

                // Ensure all required columns are found
                if (Object.values(columnIndices).some(index => index === -1)) {
                    return res.status(400).json({
                        "status": "error",
                        "code": 400,
                        "message": "One or more required columns not found in the Excel file."
                    });
                }

                return; // Skip processing the header row
            }
            if (!worksheet) {
                return res.status(400).json({
                    "status": "error",
                    "code": 400,
                    "message": "Worksheet 'Sheet1' not found in the Excel file."
                });
            }
            try {
                const uid = row.getCell(columnIndices.uid).value;
                const first_name = row.getCell(columnIndices.first_name).value;
                const last_name = row.getCell(columnIndices.last_name).value;
                const number = Math.floor(Math.random() * 10000000000);
                const userData = {
                    uid: uid.toString(),
                    first_name: first_name.toString(),
                    last_name: last_name.toString(),
                    number: number.toString()
                }
                usersToInsert.push(userData);
            } catch (error) {
                console.error(`Row ${rowNumber}: Error processing row. ${error.message}`);
                return res.status(400).json({
                    "status": "error",
                    "code": 400,
                    "message": `Error processing row ${rowNumber}. ${error.message}`
                })
            }
            try {
                const insertedUsers = await AdminUser.insertMany(usersToInsert);
                return res.status(200).json({
                    "status": "success",
                    "code": 200,
                    "message": "Users inserted successfully",
                    "data": insertedUsers
                });
            } catch (error) {
                return res.status(400).json({
                    "status": "error",
                    "code": 400,
                    "message": error.message
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": "500",
            "message": error.message
        })
    }
}


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// const createUsersFromFile = async (req, res) => {
//     try{
//         const buffer = req.file.buffer; // Access the uploaded file buffer
//         const workbook = new ExcelJS.Workbook();
//         await workbook.xlsx.load(buffer);

//         const worksheet = workbook.getWorksheet('Sheet1');
//         const columnIndices = {};
//         const usersToInsert = [];
//         try{
//         worksheet.eachRow(async (row, rowNumber) => {
//             if (rowNumber === 1) {
//                 // Identify the column indices based on column names
//                 columnIndices.uid = row.values.indexOf('uid');
//                 columnIndices.first_name = row.values.indexOf('first_name');
//                 columnIndices.last_name = row.values.indexOf('last_name');
//                 columnIndices.number = row.values.indexOf('phone');

//                 // Ensure all required columns are found
//                 if (Object.values(columnIndices).some(index => index === -1)) {
//                     return res.status(400).json({
//                         "status": "error",
//                         "code": 400,
//                         "message": "One or more required columns not found in the Excel file."
//                     });
//                 }

//                 return; // Skip processing the header row
//             }
//             if (!worksheet) {
//                 return res.status(400).json({
//                     "status": "error",
//                     "code": 400,
//                     "message": "Worksheet 'Sheet1' not found in the Excel file."
//                 });
//             }
//             try {
//                 const uid = row.getCell(columnIndices.uid).value;
//                 const first_name = row.getCell(columnIndices.first_name).value;
//                 const last_name = row.getCell(columnIndices.last_name).value;
//                 const number = row.getCell(columnIndices.number).value;
//                 const userData = {
//                     uid: uid.toString(),
//                     first_name: first_name.toString(),
//                     last_name: last_name.toString(),
//                     number: number.toString()
//                 };
//                 usersToInsert.push(userData);
//             } catch (error) {
//                 console.error(`Row ${rowNumber}: Error processing row. ${error.message}`);
//                 return res.status(400).json({
//                     "status": "error",
//                     "code": 400,
//                     "message": `Error processing row ${rowNumber}. ${error.message}`
//                 });
//             }
//         })
//         try {
//             const insertedUsers = await AdminUser.insertMany(usersToInsert);
//             return res.status(200).json({
//                 "status": "success",
//                 "code": 200,
//                 "message": "Users inserted successfully",
//                 "data": insertedUsers
//             });
//         } catch (error) {
//             return res.status(400).json({
//                 "status": "error",
//                 "code": 400,
//                 "message": error.message
//             });
//         }
//     }catch (error) {
//         return res.status(400).json({
//             "status":"error",
//             "code":400,
//             "message": error.message
//         })
//     }
//     }catch (error) {
//         return res.status(500).json({
//             "status": "fail",
//             "code": "500",
//             "message": error.message
//         })
//     }
// }
const createUsersFromFile = async (req, res) => {
    try {
        const buffer = req.file.buffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet('Sheet1');
        const columnIndices = {};
        const usersToInsert = [];

        if (!worksheet) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": "Worksheet 'Sheet1' not found in the Excel file."
            });
        }

        for (const row of worksheet.getRows(2, worksheet.rowCount)) {
            try {
                if (!columnIndices.uid) {
                    // Identify the column indices based on column names
                    columnIndices.uid = row.getCell('uid').value;
                    columnIndices.first_name = row.getCell('first_name').value;
                    columnIndices.last_name = row.getCell('last_name').value;
                    columnIndices.number = row.getCell('phone').value;

                    // Ensure all required columns are found
                    if (Object.values(columnIndices).some(index => index === undefined)) {
                        return res.status(400).json({
                            "status": "error",
                            "code": 400,
                            "message": "One or more required columns not found in the Excel file."
                        });
                    }

                    continue; // Skip processing the header row
                }

                const uid = row.getCell(columnIndices.uid).value;
                const first_name = row.getCell(columnIndices.first_name).value;
                const last_name = row.getCell(columnIndices.last_name).value;
                const number = row.getCell(columnIndices.number).value;
                const userData = {
                    uid: uid.toString(),
                    first_name: first_name.toString(),
                    last_name: last_name.toString(),
                    number: number.toString()
                };
                usersToInsert.push(userData);
            } catch (error) {
                console.error(`Error processing row. ${error.message}`);
                return res.status(400).json({
                    "status": "error",
                    "code": 400,
                    "message": `Error processing row. ${error.message}`
                });
            }
        }

        try {
            const insertedUsers = await Promise.all(usersToInsert.map(user => AdminUser.create(user)));
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "Users inserted successfully",
                "data": insertedUsers
            });
        } catch (error) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": error.message
            });
        }
    } catch (error) {
        return res.status(400).json({
            "status": "error",
            "code": 400,
            "message": error.message
        });
    }
}
const getUsers = async(req,res)=>{
    try{
    const users = await AdminUser.find()
    res.status(200).json({
        "status":"success",
        "code":200,
        "data":users
    })
}catch(error){
    return res.status(500).json({
        "status": "fail",
        "code": "500",
        "message": error.message
    })
}
}


module.exports = {
    createUser,
    createMultipleUsers,
    createUsersFromFile,upload,
    getUsers
}
