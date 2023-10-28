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

//model - collection name

const busLoc=new mongoose.model("buslocations",busSchema)


//export model - to import in another files

module.exports = busLoc

