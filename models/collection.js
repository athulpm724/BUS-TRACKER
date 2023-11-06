//create model

//import mongoose

const mongoose=require('mongoose')

//define schema-fields and values

const busSchema=mongoose.Schema({
    busName:String,
    lat:String,
    lon:String,
    speed:String,
    
})

const userSchema=mongoose.Schema({
    username:String,
    password:String
})

const routSchema=mongoose.Schema({
    busname:String,
    stopname:[]
})

const adminSchema=mongoose.Schema({
    adminName:String,
    adminPass:String
})

//model - collection name

const busLoc=new mongoose.model("buslocations",busSchema)

const users=new mongoose.model("userbase",userSchema)

const routs=new mongoose.model("stops",routSchema)

const admins=new mongoose.model('admins',adminSchema)


//export model - to import in another files

module.exports = {busLoc,users,routs,admins}

