const express=require('express')

const router = require('./routes/router')

require('dotenv').config()

const cors=require('cors')

const server=express()

//integrate cors
server.use(cors())

const mqttt = require('mqtt')
const { mqttsub } = require('./controllers/logic')


const port=2500|| process.env.port
server.use(express.json())

//router set
server.use(router)


require('./db/connection')

// server.use(router)


server.listen(port,()=>{
    console.log('WORKING!!!');
})
 
msub('bus1')