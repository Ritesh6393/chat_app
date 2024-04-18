const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser')
const db=require('./util/database.js')


//defined all the models

const User=require('./models/user.js');
const Chat=require('./models/chat.js');
const Group=require('./models/group.js');
const UserGroup=require('./models/userGroup.js');
const GroupMessage=require('./models/groupMessage.js')


const userRoutes=require('./routes/user');
const chatRoutes=require('./routes/chat.js');
const app=express();


app.use(cors({
        origin:'*',
        methods:['GET','POST']
    }))

app.use(bodyParser.json({extends:false}))


app.use('/user',userRoutes);
app.use('/chat',chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(Group,{through:UserGroup})
Group.belongsToMany(User,{through:UserGroup})

Group.hasMany(GroupMessage)
GroupMessage.belongsTo(Group)



db
        .sync()
        .then(()=>app.listen(3100))
        .catch(err=>console.log(err));


