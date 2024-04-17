const Sequelize=require('sequelize');
const db=require('../util/database');

const chatData=db.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    chat:Sequelize.STRING,
    isFile:{
        type:Sequelize,
        type:Sequelize.BOOLEAN,
        defaultValue:0
    }
})
module.exports=chatData;