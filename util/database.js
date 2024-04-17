const Sequelize=require('sequelize');


const sequelize=new Sequelize('chatapp','root','riteshrai',
{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;
