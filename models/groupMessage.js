const Sequelize=require('sequelize');

const db=require('../util/database');


module.exports=db.define('groupMessage',
{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    chat:Sequelize.STRING,
    userId:Sequelize.INTEGER,
    userName:Sequelize.STRING,
    idFile:{
        type:Sequelize.BOOLEAN,
        defaultValue:0
    }
})