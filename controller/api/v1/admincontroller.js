const Admin = require ("../../../model/adminmodel")
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
module.exports.addadmin= async(req,res)=>{
    try{
        const Checkemail= await Admin.findOne({email:req.body.email})
        if(!Checkemail){
            if (req.body.password== req.body.confirmpassword) {
               req.body.password= await bcrypt.hash(req.body.password,10)
               const Admindata= await Admin.create(req.body)
               if (Admindata){
                    res .status(200).json({message:"Admin Added Successfully",data :Admindata})
               }
               else{
                res.status(400).json({message:"Failed to add admin"})
                }
            }
            else{
                res.status(400).json({message:"password and confirm password not match"})
            }
        }
        else{
            return res.status(200).json({message:"Email already exist"})
        }

    }
    catch(err){
        return res.status(400).json({ message: "server error", error: err })
    }
}
module.exports.loginadmin = async(req,res)=>{
    try{
       let checkadmin = await Admin.findOne({email:req.body.email}) 
       if(checkadmin){
           let comparepassword = await bcrypt.compare(req.body.password,checkadmin.password);
           checkadmin = checkadmin.toObject();
           delete checkadmin.password;
        
           
            if(comparepassword){
                let admintoken = jwt.sign({Admindata : checkadmin },"yash",{ expiresIn: '1d' });
                res.status(200).json({message:"Admin login successfully",token :admintoken})
            }
             else{
                res.status(400).json({message:"Invalid password"})
                }
       }
       else{
          return res.status(400).json({message:"Invalid Email or Password"})
       }

    }
    catch(err){

    }
}