const express = require('express');
const router = express.Router();
// const {upload} = require("../index")
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
const {createProject,addActivities,locationDropDown,activityDropDown,allProjects,getStateWiseProjects,projectCreate,projectList,
getProjName,getProjectNameUserBased} = require("../controllers/dataController")
router.post('/createProject',createProject)
router.put('/addActivities',addActivities)
router.get('/user/locationDropDown',locationDropDown)
router.get('/user/activityDropDown',activityDropDown)
router.get('/user/allProjects',allProjects)
router.get('/user/stateWiseProjects',getStateWiseProjects)
router.put('/create/project',createProject)
router.get('/project/locationWise',projectList)
router.post('/project/name',getProjName)
router.get('/user/:id/project/name',getProjectNameUserBased)


////////////////////////// Project Recommned ////////////////////////
const{recommendProjets} = require("../controllers/proejctController")
router.get('/user/:id/recommend/projets/:range',recommendProjets)



///////////////////////////////  Change //////////////////////////////
const {updateProjectName,deleteName} = require("../controllers/changesController")
router.get('/updateProjectName',updateProjectName)
router.put('/deleteProjectName',deleteName)



///////////////////////////////////// Income Form ////////////////////////////////
const {addIncomeForm,validateIncomeAndSubmit} = require("../controllers/formController")
router.post('/user/:id/income',addIncomeForm)
router.post('/user/:userId/income/form',validateIncomeAndSubmit)




///////////////////////////////////////////////////////////////////    ADMIN  ///////////////////////////////////////////////////////////////////

//////////////////////////////// Register And Login  /////////////////////////////////////////////////

const {createAdmin,adminLogin} = require("../controllers/adminLoginController")
router.post('/admin/register',createAdmin)
router.post('/admin/login',adminLogin)




////////////////////////// PROJECTS //////////////////////////////
const {getProjects,getFilteredProjects,createProjectSchema} = require("../controllers/adminProjectsController")
router.get('/admin/allProjects',getProjects)
router.post('/admin/projects',getFilteredProjects)
router.post('/admin/projects/schema/create',createProjectSchema)



////////////////////////////////////// Admin user details //////////////////////////////////////////////
const {createUser,createMultipleUsers,createUsersFromFile,upload,getUsers} = require("../controllers/adminUserLoginController")

router.post('/admin/user/create',createUser)
router.post('/admin/user/create/multiple',createMultipleUsers)
router.post('/admin/user/create/multiple/file',upload.single('excelFile'),createUsersFromFile)
router.get('/admin/users/list',getUsers)












module.exports = router;