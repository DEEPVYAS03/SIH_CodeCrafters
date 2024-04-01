require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const projRoute = require("./routes/projRoutes")

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})




mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to db")
    })
    .catch((error)=>{
        console.log(error);
    })


    app.get('/',(req,res)=>{
        if(mongoose.connection.readyState === 1){
            res.status(200).json([{
                "status": "success",
                "code": 200,
                "message": 'Welcome To SIH',
                "database": "Connected to MongoDb"
            }])
        }
        else{
            res.status(200).json([{
                "status": "success",
                "code": 200,
                "message": 'Welcome To SIH',
                "database": "Not connected to MongoDb"
            }])
        }
        
    })
//routes
app.use('/api',projRoute)


app.listen(process.env.PORT,()=>{
    console.log('Listening on port',process.env.PORT);
})

module.exports = {app,upload}
