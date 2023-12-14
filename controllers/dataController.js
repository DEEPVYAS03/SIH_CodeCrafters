const Projects = require("../models/wdcProjectsModel")
const ExcelJS = require('exceljs')
const path = require('path');


const createProject = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'Report P2.xlsx');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet('Sheet1');

        if (!worksheet) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": "Worksheet 'Sheet1' not found in the Excel file."
            });
        }

        // Define columnIndices outside of the loop
        const columnIndices = {};

        const projectsToInsert = []; // Array to store project documents

        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber === 1) {
                // Identify the column indices based on column names
                columnIndices.state = row.values.indexOf('State Name');
                columnIndices.stateCode = row.values.indexOf('state code');
                columnIndices.district = row.values.indexOf('District Name');
                columnIndices.districtCode = row.values.indexOf('district code');
                columnIndices.projectName = row.values.indexOf('Project Name');
                columnIndices.village = row.values.indexOf('Village Name');
                columnIndices.watershedCommittee = row.values.indexOf('Watershed Committee');
                columnIndices.latitude = row.values.indexOf('Latitude');
                columnIndices.longitude = row.values.indexOf('Longitude');

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

            try {
                const state = row.getCell(columnIndices.state).value;
                const stateCode = row.getCell(columnIndices.stateCode).value;
                const district = row.getCell(columnIndices.district).value;
                const districtCode = row.getCell(columnIndices.districtCode).value;
                const projectName = row.getCell(columnIndices.projectName).value;
                const village = row.getCell(columnIndices.village).value;
                const watershedCommittee = row.getCell(columnIndices.watershedCommittee).value;
                const latitude = row.getCell(columnIndices.latitude).value;
                const longitude = row.getCell(columnIndices.longitude).value;

                const projectNameMatch = projectName.match(/^(.*?)\/2021-(\d{2})$/);
                if (!projectNameMatch) {
                    throw new Error('Invalid project name format');
                }

                const projectNamePart = projectNameMatch[1];
                const projectEnd = '20' + projectNameMatch[2];

                const projectData = {
                    project_name: projectNamePart,
                    project_start: '2021',
                    project_end: projectEnd,
                    state: state,
                    district: district,
                    village: village,
                    state_code: stateCode,
                    district_code: districtCode,
                    watershed_Committee: watershedCommittee,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                };

                projectsToInsert.push(projectData);

                console.log(`Row ${rowNumber}: Data added to insertion queue.`);
            } catch (error) {
                console.error(`Row ${rowNumber}: Error processing row. ${error.message}`);
                return res.status(400).json({
                    "status": "error",
                    "code": 400,
                    "message": `Error processing row ${rowNumber}. ${error.message}`
                })
            }
        });

        await Projects.insertMany(projectsToInsert);

        console.log('Data transfer completed.');
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "message": "Data transfer completed."
        });

    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": `Error reading Excel file: ${error.message}`
        });
    }
};


// const addActivities = async (req, res) => {
//     try {
//         const filePath = path.join(__dirname, '..', 'Project-Activities-2.xlsx');
//         const workbook = new ExcelJS.Workbook();
//         await workbook.xlsx.readFile(filePath);

//         const worksheet = workbook.getWorksheet(1);
//         try {
//             const activitiesMap = {};

//             worksheet.eachRow((row, rowNumber) => {
//                 const projectName = row.getCell(1).value;
//                 const activity = row.getCell(2).value;

//                 activitiesMap[projectName] = activitiesMap[projectName] || [];

//                 activitiesMap[projectName].push(activity);
//             });
//             try {

//                 for (const projectName in activitiesMap) {
//                     const activities = activitiesMap[projectName];

//                     await Projects.updateOne(
//                         { project_name: projectName },
//                         { $set: { activities: activities } }
//                     );
//                 }
//             } catch (error) {
//                 return res.status(400).json({
//                     "status": "error1",
//                     "code": 400,
//                     "message": error.message
//                 });
//             }
//         } catch (error) {
//             return res.status(400).json({
//                 "status": "error2",
//                 "code": 400,
//                 "message": error.message
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             "status": "fail",
//             "code": 500,
//             "message": `Error reading Excel file: ${error.message}`
//         });
//     }

// }

const addActivities = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'Project-Activities-2.xlsx');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheet = workbook.getWorksheet(1);
        const activitiesToUpdate = [];

        worksheet.eachRow((row, rowNumber) => {
            const projectName = row.getCell(1).value;
            const activity = row.getCell(2).value;

            activitiesToUpdate.push({
                projectName: projectName,
                activity: activity
            });
        });

        const bulkOperations = activitiesToUpdate.map(({ projectName, activity }) => ({
            updateOne: {
                filter: { project_name: projectName },
                update: {
                    $push: { activities: activity }
                }
            }
        }));

        // await Projects.bulkWrite(bulkOperations);
        try {
            await Projects.bulkWrite(bulkOperations);
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "message": "Activities added successfully"
            });
        } catch (error) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": `Error reading Excel file: ${error.message}`
        });
    }
}


const locationDropDown = async (req, res) => {
    try {
        const distinctStates = await Projects.distinct('state');
        const ress = {}
        try {
            for (let state of distinctStates) {
                const districts = await Projects.distinct('district', { state: state });
                const disObj = {}
                for (let dist of districts) {
                    const villages = await Projects.distinct('village', { state: state, district: dist });
                    disObj[dist] = villages;
                }
                ress[state] = disObj;
            }
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "data": ress
            })
        } catch (error) {
            return res.status(400).json({
                "status": "error",
                "code": 400,
                "message": error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        })
    }
}

const activityDropDown = async(req,res)=>{
    try {
        const distinctActivities = await Projects.aggregate([
            { $unwind: "$activities" },
            { $group: { _id: "$activities" } },
            { $project: { _id: 0, activity: "$_id" } }
        ]);
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": distinctActivities.map(item => item.activity)
        })
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        })
    }

}


const allProjects = async(req,res)=>{
    const projects = await Projects.find();
    return res.status(200).json({
        "status": "success",
        "code": 200,
        "data": projects
    })
}

module.exports = {
    createProject,
    addActivities,
    locationDropDown,
    activityDropDown,
    allProjects
}