const Projects = require("../models/wdcProjectsModel")

const updateProjectName = async (req, res) => {
    try {
        const projects = await Projects.updateMany(
        {},
        [
            {
                $set: {
                    project_name: {
                        $trim: {
                            input: "$project_name",
                            chars: " ", 
                        },
                    },
                },
            },
        ]
        )
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": projects
        })
    } catch (error) {
        return res.status(500).json({
            "status": "fail",
            "code": 500,
            "message": error.message
        })
    }
}

const deleteName = async(req,res)=>{
    try{
    const projects = await Projects.updateMany({},{$unset:{Project_Name:1}})
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
    })
}
}

module.exports ={
    updateProjectName,
    deleteName
}