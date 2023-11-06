const express=require('express')

const router=new express.Router()
const { getLoc,deleteBusLoc,login, getStop, addStop ,addAdmin,deleteAdmin,adminLogin,updateBus,deleteBusLive} = require('../controllers/logic')
// const { jwtMiddleware } = require('../middlewares/jwtMiddleware')



router.get('/ms/:busName',getLoc)

router.get('/delete/:id',deleteBusLive)

router.post('/register',register)

router.post('/login',login)

router.get('/stopname',getStop)

router.post('/addstop',addStop)

router.post('/add-admin',addAdmin)

router.delete('/del-admin/:id',deleteAdmin)

router.post('/admin-login',adminLogin)

router.post('/updatestop',updateBus)

router.delete('/del/:id',deleteBusLoc)

module.exports=router 