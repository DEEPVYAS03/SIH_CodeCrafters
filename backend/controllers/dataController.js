const Projects = require("../models/wdcProjectsModel")
const User = require("../models/userModel")
const ExcelJS = require('exceljs')
const path = require('path');


const createProject = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'Projects_HP.xlsx');
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
                    activities:["Animal Husbandary","Fisheries","Dairy Farming"],
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

        const insertedProjects = await Projects.insertMany(projectsToInsert);

        console.log('Data transfer completed.');
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "message": "Data transfer completed.",
            "data":insertedProjects
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

const projectCreate = (req, res) => {
    try {
        const project = new Projects(req.body);
        const res = project.save();
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": res
        })
    } catch (error) {
        return res.state(400).json({
            "status": "error",
            "code": 400,
            "message": error.message
        })
    }
}


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

const activityDropDown = async (req, res) => {
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


const allProjects = async (req, res) => {
    const projects = await Projects.find();
    return res.status(200).json({
        "status": "success",
        "code": 200,
        "data": projects
    })
}


const getStateWiseProjects = async (req, res) => {
    try {
        const states = await Projects.distinct('state');
        const sortedStates = states.sort();
        const allStates = [];
        // let stateId = 1;
        // for (let allState of states) {
        //     allStates.push({
        //         id: stateId++,
        //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnH3pJkDhd2IGUDM4Ldbs_hKG8Fl8Ub1acA&usqp=CAU",
        //         state: allState,
        //         description:"Tamil Nadu is a southern Indian state with a rich cultural heritage and a growing modern economy."
        //     });
        // }
        const imagePaths = [
            'gujarat',
            'himachal',
            'mp',
            'nagaland',
            'tamilnadu'
        ]
        const descriptions = [
            'Gujarat, located in western India, is renowned for its dynamic industrial sector and cultural richness.',
            'Himachal Pradesh is a northern Indian state in the Himalayas. It\'s home to scenic mountain towns and resorts such as Dalhousie.',
            'Madhya Pradesh, a large state in central India, retains landmarks from eras throughout Indian history.',
            'Nagaland is a mountainous state in northeast India, bordering Myanmar. It\'s home to diverse indigenous tribes, with festivals and markets celebrating the different tribes\' culture.',
            'Tamil Nadu is a southern Indian state with a rich cultural heritage and a growing modern economy.'
        ]
        for (let i = 0; i < sortedStates.length; i++) {
            const stateIndex = states.indexOf(sortedStates[i]);
            allStates.push({
                id: i + 1,
                image: imagePaths[stateIndex],
                state: sortedStates[i],
                description: descriptions[stateIndex]
            });
        }
        const stateProjects = [];
        let id = 1;
        try {
            for (let state of states) {
                const projects = await Projects.find({ state: state }).limit(10);
                stateProjects.push({
                    id: id++,
                    state: state,
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9IchMavELTosGJlTUJgysfwK7xiCSevhc-Q&usqp=CAU",
                    projects: projects
                });
            }
            return res.status(200).json({
                "status": "success",
                "code": 200,
                "states": allStates,
                "projects": stateProjects
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


// const projectList = async (req, res) => {
//     try {
//         const distinctStates = await Projects.distinct('state');
//         const ress = {}
//         try {
//             for (let state of distinctStates) {
//                 const districts = await Projects.distinct('district', { state: state });
//                 const disObj = {}
//                 for (let dist of districts) {
//                     const villages = await Projects.aggregate([
//                         { $match: { state: state, district: dist } },
//                         { $group: { _id: "$village", projects: { $push: "$project" } } },
//                         { $limit: 10 }
//                     ]);

//                     const villageObj = villages.reduce((acc, village) => {
//                         acc[village._id] = village.projects;
//                         return acc;
//                     }, {});

//                     disObj[dist] = villageObj;
//                 }
//                 ress[state] = disObj;
//             }

//             return res.status(200).json({
//                 "status": "success",
//                 "code": 200,
//                 "data": ress
//             });
//         } catch (error) {
//             return res.status(400).json({
//                 "status": "error",
//                 "code": 400,
//                 "message": error.message
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             "status": "fail",
//             "code": 500,
//             "message": error.message
//         });
//     }
// }


const projectList = async (req, res) => {
    try {
        const distinctStates = await Projects.distinct('state');
        const ress = {};
        
        try {
            for (let state of distinctStates) {
                const districts = await Projects.distinct('district', { state: state });
                const disObj = {};

                for (let dist of districts) {
                    const villages = await Projects.distinct('village', { state: state, district: dist });
                    const projects = await Projects.find({ state: state, district: dist }).select('project_name');

                    const projObj = {};
                    for (let proj of projects) {
                        projObj[proj.project_name] = villages;
                    }

                    disObj[dist] = projObj;
                }

                ress[state] = disObj;
            }

            return res.status(200).json({
                "status": "success",
                "code": 200,
                "data": ress
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
            "message": error.message
        });
    }
}

const getProjName = async(req,res)=>{
    try{
        const proj = await Projects.find({state:req.body.state,district:req.body.district,village:req.body.village})
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": proj
        })
    }catch(error){
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        });
    }
}

const getProjectNameUserBased = async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        const state = user.address.state.toUpperCase();
        const district = user.address.district.toUpperCase();
        const projects = await Projects.find({state:state,district:district},{project_name:1}).distinct('project_name');
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": projects
        })
    }catch(error){
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        });
    }
}

module.exports = {
    createProject,
    addActivities,
    locationDropDown,
    activityDropDown,
    allProjects,
    getStateWiseProjects,
    projectCreate,
    projectList,
    getProjName,
    getProjectNameUserBased
}