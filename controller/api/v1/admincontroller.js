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
                res.status(200).json({message:"Failed to add admin"})
                }
            }
            else{
                res.status(200).json({message:"password and confirm password not match"})
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
                res.status(200).json({message:"Invalid password"})
                }
       }
       else{
          return res.status(200).json({message:"Invalid Email or Password"})
       }

    }
    catch(err){
        return res.status(400).json({ message: "server error", error: err })
    }
}
module.exports.adminProfile= async (req,res)=>{
    try{
        res.status(200).json({message:"Admin Data",data:req.user})
    }
    catch(err){
        return res.status(400).json({ message: "server error", error: err })
    }
}
module.exports.editAdminProfile= async (req,res)=>{
   try{
     let checkadmin = await Admin.findById (req.params.id) 
     if(checkadmin){
        let updateadmin = await Admin.findByIdAndUpdate(req.params.id,req.body);
        if( updateadmin){
            let editdata = await Admin.findById(req.params.id);
            return res.status(200).json ({message: "Admin edited",data:editdata})
        }
        else{
            return res.status(200).json ({message: "Admin not edited"});
        }
    }
    else{
         return res.status(200).json ({message: "Admin not Found"});
    }

   }
   catch (err){
    return res.status(400).json({ message: "server error", error: err })
   }

}
module.exports.Adminchangepassword= async (req,res)=>{
    let currentpassword = await bcrypt.compare(req.body.currentpass,req.user.password);
    if (currentpassword){
       if (req.body.currentpass!=req.body.newpass){
         if (req.body.newpass==req.body.confirmpass){
           req.body.password= await bcrypt.hash(req.body.newpass,10);
           let upadatepassword= await Admin.findByIdAndUpdate(req.user._id,req.body)
           if (upadatepassword){
            return res.status(200).json ({message: "password updated"});
           }
           else{
            return res.status(200).json ({message: "password not updated"});
           }
         }
         else{
            return res.status(200).json ({message: "newpass and confirmpass are not same"});
           }
       }
       else{
        return res.status(200).json ({message: "currentpass and newpass are not same"});
       }
    }
    else{

    }
}