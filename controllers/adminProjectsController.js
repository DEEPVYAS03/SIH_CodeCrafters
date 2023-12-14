const Projects = require("../models/wdcProjectsModel")

const getProjects = async (req, res) => {
    try {
        const projects = await Projects.find()
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": projects
        })
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "code": 500,
            "message": error.message
        })
    }
}

const getFilteredProjects = async (req, res) => {
    const state = (req.body.state !== undefined && req.body.state !== null) ? req.body.state : null;
    const district = (req.body.district !== undefined && req.body.district !== null) ? req.body.district : null;
    const village = (req.body.village !== undefined && req.body.village !== null) ? req.body.village : null;
    let query = {}
    try {
        if (state !== null) {
            query.state = state
        }
        if (district !== null) {
            query.district = district
        }
        if (village !== null) {
            query.village = village
        }
        console.log(query)
        try{
        const projects = await Projects.find(query)
        return res.status(200).json({
            "status": "success",
            "code": 200,
            "data": projects
        })
    }catch(error){
        return res.status(400).json({
            "status": "error",
            "code": 400,
            "message": error.message
        })
    }
    } catch (error) {
        return res.status(500).json({
            "status": "error",
            "code": 500,
            "message": error.message
        })
    }

}

module.exports = {
    getProjects,
    getFilteredProjects
}