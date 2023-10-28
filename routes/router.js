const express=require('express')

const router=new express.Router()
const { getLoc,deleteBusLoc} = require('../controllers/logic')



router.get('/ms/:busName',getLoc)

router.get('/delete/:id',deleteBusLoc)

module.exports=router 