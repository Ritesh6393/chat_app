const Sequelize=require('sequelize');

const db=require('../util/database')

module.exports=db.define('group',
{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    groupName:{
        type:Sequelize.STRING
    },
    groupUID:{
        type:Sequelize.STRING
    },
    createdBy:{
        type:Sequelize.INTEGER
    }
}
)