
const mqttt = require('mqtt');
const {busLoc,users,routs,admins} = require('../models/collection');
// const users=require('../models/collection');
const http = require("http");
const jwt=require('jsonwebtoken')




baseUrl='http://localhost:2500'

msub=(topic)=>{
  clientId='aji';
  mqtturl='mqtt://13.127.252.227:1883'
  const client = mqttt.connect(mqtturl, {
      clientId,
      username: 'shanthanu',
      password: '1234',
    })

    mdata=""
    lat=""
    lon=""
    speed=""

    client.subscribe(topic, () => {
      client.on('connect',()=>{
        console.log("mqtt connected!");
      })
      client.on('message', (topic, payload) => {
        // console.log('Received Message:',payload.toString())
        mdata=payload.toString().split(",")
        lat=mdata[0]
        lon=mdata[1]
        speed=mdata[2]
        
        if(lat!=undefined && lon!=undefined && speed!=undefined){
          console.log("lat:"+lat+",lon:"+lon+"speed:"+speed);
          http.get(`${baseUrl}/delete/bus1`)
          console.log("DELETED!");
          let newCoord=new busLoc({
            busName:"bus1",
            lat,
            lon,
            speed
        })
  
        newCoord.save();
        console.log("SAVED!");
        }

      })
    })

}

// deleteBusLoc = (req, res) => {
//     const { id } = req.params
//     busLoc.deleteOne({ busName: id }).then(pdata => {
//         res.status(200).json({
//             message: "Product deleted",
//             status: true,
//             statusCode: 200
//         })
//     })
  
//   }

deleteBusLive = (req, res) => {
    const {id}  = req.params
    console.log("id="+ id);
    busLoc.deleteOne({ busName: id }).then(pdata => {
        res.status(200).json({
            message: "Product deleted",
            status: true,
            statusCode: 200
        })
    })
  
  }

deleteBusLoc = (req, res) => {
  const {id}  = req.params
  console.log("id="+ id);
  routs.deleteOne({ busname: id }).then(pdata => {
      res.status(200).json({
          message: "Product deleted",
          status: true,
          statusCode: 200
      })
  })

}


getLoc=(req,res)=>{
  const val=req.params;
  console.log(val);
  let result=busLoc.findOne(val).then(user=>{
    if(user){
        res.status(200).json({
            message:user,
            status:true,
            statuscode:200
        })
    }
    else{
        
        res.status(404).json({
            message:"user not found",
            status:false,
            statuscode:404
        })
      }
    })
    console.log(result);
}

register=(req,res)=>{

  //destructuring
  const cred = req.body
  const username=cred.username
  // const password=cred.password
  //check user data in collections

  console.log(username);
  users.findOne({username:username}).then(user=>{
      console.log(user);
      if(user){

          //  only sends data
          // res.send({
          //     message:"user already exists!",
          //     status:false,
          //     statuscode:400
          // })

          // converts data to json and sends
          //status is used to edit status code
          res.status(400).json({
              message:"user already exists!",
              status:false,
              statuscode:400
          })
      }
      else{
          
          // create object for user
          let newUser=new users({
              username:cred.username,
              password:cred.password
              })

          result=newUser.save();
          res.status(201).json({
              message:"account created successfully!"+result,
              status:true,
              statuscode:201
          })
      }
      
  })


}

login = (req,res)=>{
  // accessing data from body

  const cred = req.body
  const username=cred.username
  const password=cred.password
  console.log(cred);

  users.findOne({username:username,password:password}).then(user=>{
    console.log(user);
      if(user){
          //token generation
          const token=jwt.sign({username},"secretkey123")
  
          res.status(200).json({
              message:"login successful"+user,
              status:true,
              statuscode:200,
              CurrentUser:user.username,
              token
          })
      }
      else{
          
          res.status(404).json({
              message:"incorrect credentials",
              status:false,
              statuscode:404
          })
      }
  })
} 


getStop=(req,res)=>{

  //destructuring
  // let bname=req.params
  // const password=cred.password
  //check user data in collections
  // console.log(bname);
  routs.find().then(b=>{
      if(b){
          res.status(200).json({
              message:"FOUND",
              stops:b,
              status:true,
              statuscode:200
          })
      }
      else{
          res.status(400).json({
              message:"BUS NOT FOUND",
              status:false,
              statuscode:400
          })
      }
      
  })
}

addStop=(req,res)=>{

  //destructuring
  let bdata=req.body
  let stops=bdata.stopname.split(',')
  // const password=cred.password
  //check user data in collections
  console.log(bdata);
  routs.findOne({busname:bdata.busname}).then(user=>{
      if(user){
          res.status(400).json({
              message:"BUS ALREADY EXISTS",
              status:false,
              statuscode:400
          })
      }
      else{
          let newBus=new routs({
            busname:bdata.busname,
            stopname:stops
          })

          newBus.save()
          res.status(200).json({
              message:"BUS ADDED",
              status:true,
              statuscode:200
          })
      }
      
  })
  
}


adminLogin=(req,res)=>{
  const cred = req.body
  const adminName=cred.adminName
  const adminPassword=cred.adminPass
  console.log(adminName+"/"+adminPassword);
  admins.findOne({adminName:adminName,adminPass:adminPassword}).then(user=>{
    console.log(user);
      if(user){
          res.status(200).json({
              message:"login successful",
              status:true,
              statuscode:200
          })
      }
      else{
          
          res.status(404).json({
              message:"incorrect credentials",
              status:false,
              statuscode:404
          })
      }
  })
}


addAdmin=(req,res)=>{
  //destructuring
  const cred = req.body
  const adminName=cred.adminName
  console.log(adminName);
  admins.findOne({adminName:adminName}).then(user=>{
      console.log(user);
      if(user){
          res.status(400).json({
              message:"admin already exists!",
              status:false,
              statuscode:400
          })
      }
      else{
          
          // create object for user
          let newAdmin=new admins({
              adminName:cred.adminName,
              adminPass:cred.adminPass
              })

          result=newAdmin.save();
          res.status(201).json({
              message:"admin account created successfully!"+result,
              status:true,
              statuscode:201
          })
      }
      
  })
}

deleteAdmin = (req, res) => {
  const { id } = req.params
  admins.deleteOne({ adminName: id }).then(pdata => {
      res.status(200).json({
          message: "Product deleted",
          status: true,
          statusCode: 200
      })
  })

}

deleteBus=(req,res)=>{
    bname=req.params
    routs.deleteOne({busname:bname}).then(user=>{
        res.status(200).json({
            message:"bus deleted",
            status:true,
            statuscode:200
        })
    })
}

updateBus=(req,res)=>{
  //destructuring
  let bdata=req.body
  // const password=cred.password
  //check user data in collections
  console.log(bdata);
  routs.findOne({busname:bdata.busname}).then(user=>{
      if(user){
        routs.updateOne({busname:bdata.busname},{stopname:bdata.stopname.split(',')}).then(user=>{
        // let newBus=new routs({
        //     busname:bdata.busname,
        //     stopname:bdata.stopname
        //   })

        //   newBus.save()
          res.status(400).json({
              message:"BUS UPDATED",
              status:true,
              statuscode:200
          })
        })
      }
      else{
          
          res.status(400).json({
              message:"BUS NOT FOUND!",
              status:false,
              statuscode:400
          })
      }
      
  })
}
  

module.exports={msub,getLoc,deleteBusLoc,login,register,getStop,addStop,addAdmin,deleteAdmin,adminLogin,updateBus,deleteBus,deleteBusLive}


