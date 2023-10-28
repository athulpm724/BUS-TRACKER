const mongoose=require('mongoose')

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('MONGODB CONNECTED!');
}).catch(()=>{
    console.log("CONNECTION FAILED!");
})


