const Projects = require("../models/wdcProjectsModel")
const User = require("../models/userModel")

const recommendProjets = async(req,res)=>{
    const id = req.params.id;
    const range = req.params.range;
    const user = await User.findById(id);
    const userLocation =user.location.coordinates

    const insideUserRangeProjects = await Projects.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: userLocation
                },
                $maxDistance: range
            }
        }
    });
    const allProjects = await Projects.find();
    // const outsideUserRangeProjects = allProjects.filter(project => {
    //     return !insideUserRangeProjects.some(inRangeProject =>
    //       inRangeProject._id.equals(project._id)
    //     );
    //   });
    return res.status(200).json({
        "status": "success",
        "code": 200,
        "user":user,
        "data": insideUserRangeProjects
        // {
        //     inRangeProjects:insideUserRangeProjects
        //     // outRangeProjects:outsideUserRangeProjects
        // }
    })

}

module.exports ={
    recommendProjets
}