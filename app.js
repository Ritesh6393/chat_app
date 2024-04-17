const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser')
const db=require('./util/database.js')


const userRoutes=require('./routes/user');
const app=express();


app.use(cors({
        origin:'*',
        methods:['GET','POST']
    }))

app.use(bodyParser.json({extends:false}))


app.use('/user',userRoutes);


db
        .sync()
        .then(()=>app.listen(3100))
        .catch(err=>console.log(err));


