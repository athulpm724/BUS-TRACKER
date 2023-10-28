
const mqttt = require('mqtt');
const busLoc = require('../models/collection');
const { query } = require('express');
const { error } = require('console');
const router = require('../routes/router');
const http = require("http");


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
          let newCoord=new busLoc({
            busName:"bus1",
            lat,
            lon,
            speed
        })
  
        newCoord.save();
        }

      })
    })

}

deleteBusLoc = (req, res) => {
  const { id } = req.params
  busLoc.deleteOne({ busName: id }).then(pdata => {
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
  

module.exports={msub,getLoc,deleteBusLoc}


