const router= require("express").Router();
const User=require("../model/User");
const bcrypt= require("bcryptjs");
router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  });
  
router.post("/login",async(req,res)=>{
  try{
     const user = await User.findOne({email:req.body.email});
     !user && res.status(404).json("user not found");

     bcrypt.compare(req.body.password, user.password, function(err, results){
      
      if(err){
          throw new Error(err)
       }
       if (results) {
          return res.status(200). json(user);
      } else {
          return res.status(401).json({ msg: "Invalid credencial" })
      }
     })

    
    }
     catch(err){
      console.log(err);
     }
})
module.exports= router;