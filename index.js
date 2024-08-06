const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authe')
const profileRoutes=require('./routes/profile')

require('dotenv').config();

const app=express();
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send("<h1>USER_MANAGEMENT_API<h1>")
})

app.use('/auth',authRoutes)
app.use('/profile',profileRoutes);

const PORT=process.env.PORT || 7000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})