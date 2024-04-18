const Sequelize=require('sequelize');
const db=require('../util/database');

module.exports=db.define('userGroup',
{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    memberType:Sequelize.STRING
})
