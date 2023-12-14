const express = require('express');
const router = express.Router();

////////////////////  LOGIN   //////////////////////////////
const { getOTP, verifyOtp, checkUser} = require('../controllers/loginController');
router.post('/getOTP', getOTP);
router.post('/verifyOtp', verifyOtp);
router.get('/user/:id/checkUser', checkUser);


///////////////////////// PROFILE ////////////////////////////

const {createProfile,getUserProfile} = require("../controllers/profileController")
router.post('/user/createProfile',createProfile)
router.get('/user/:id/getUserProfile/',getUserProfile)


/////////////////////////// DATA   /////////////////////////////
const {createProject,addActivities,locationDropDown,activityDropDown,allProjects} = require("../controllers/dataController")
router.post('/createProject',createProject)
router.put('/addActivities',addActivities)
router.get('/user/locationDropDown',locationDropDown)
router.get('/user/activityDropDown',activityDropDown)
router.get('/user/allProjects',allProjects)


////////////////////////// Project Recommned ////////////////////////
const{recommendProjets} = require("../controllers/proejctController")
router.get('/user/:id/recommend/projets/:range',recommendProjets)



///////////////////////////////  Change //////////////////////////////
const {updateProjectName,deleteName} = require("../controllers/changesController")
router.get('/updateProjectName',updateProjectName)
router.put('/deleteProjectName',deleteName)






///////////////////////////////////////////////////////////////////    ADMIN  ///////////////////////////////////////////////////////////////////

//////////////////////////////// Register And Login  /////////////////////////////////////////////////

const {createAdmin,adminLogin} = require("../controllers/adminLoginController")
router.post('/admin/register',createAdmin)
router.post('/admin/login',adminLogin)




////////////////////////// PROJECTS //////////////////////////////
const {getProjects,getFilteredProjects} = require("../controllers/adminProjectsController")
router.get('/admin/allProjects',getProjects)
router.post('/admin/projects',getFilteredProjects)













module.exports = router;