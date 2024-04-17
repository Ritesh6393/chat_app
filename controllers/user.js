
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');






exports.signup=async (req,res,next)=>{
    const body=req.body;
    
    const email=body.email;
    const password=body.password;
    const name=body.name;
    const phone=body.phone;
    
    obj={name:name,email:email,password:password,phone:phone}

    try{
        const user=await User.findOne({where:{email:email}})
        
        if(user){
            
            return res.status(401).json({message:"User already Exsts"})

        }
        else
        {
            bcrypt.hash(obj.password,10,async (err,passw)=>{
                if(err){
                    throw new Error("Something Went Wrong Password...")
                }
                obj.password=passw
                const result=await User.create(obj)
                
                return res.json({message:"SignUp Successfull"})
            })
        }
    }
    catch(err){
        //console.log(err)
        res.status(500).json({error:"Something went wrong"})
    }
   
}

exports.login=async(req,res,next)=>{
    obj={email:req.body.email,password:req.body.password};
    try{
        const user =await User.findOne({where:{email:obj.email}});
        if(!user){
            res.status(404).json({error:"User dont exist"});
        }
        else{
            bcrypt.compare(obj.password,user.password,async(err,response)=>{
                if(err){
                    throw new Error("Something Went Wrong");
                }
                if(response){
                    const token=jwt.sign({name:user.dataValues.name,id:user.dataValues.id},'qwertyuiop123');
                    res.json({status:"login successfull",token:token,userId:user.id});
                }
                else{
                    res.status(401).json({error:"Invalid Password"})
                }
            })
        }

    }
    catch(err){
        console.log(err)
    }
}

