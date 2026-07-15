const Admin=require("../models/adminModel");
const bcrypt=require("bcrypt");

const registerAdmin = async (req,res) => {
    try{
        const{name,email,password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // checking if admin already exists
        const existingAdmin = await Admin.findOne({email});
        
        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"});
        }

        // hashing password
        const hashedPassword= await bcrypt.hash(password,10);

        // creating new admin
        await Admin.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({message:"Admin registered successfully",});
    
    }
    catch(error){
        res.status(500).json({message:error.message

        });
    }
};

module.exports={registerAdmin};

