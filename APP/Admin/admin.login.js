const User = require('../models/users.model');
const bcrypt = require("bcryptjs");


//----------------------------------------------------------------
// Sign in with username and password using JWT token
//----------------------------------------------------------------
exports.signInWithUsernamePassword = async (req, res) => {
    try{
        // Get the user from database by their username
        const user = await User.findOne({$or:[{userName: req.body.userName} , {email: req.body.userName}]});
        if(!user){
            return res.status(401).send({
                status:false,
                message: "Username or Password is Wrong..!"
            });
        }

        // compare the password 
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.status(401).send({
              status: false,
              message: 'Username or Password is Wrong..!'
          });
        }
        
        // send response to client side
        res.status(200).send({
            status: true,
            message:"User Logged In Successfully"
        })
      
    }catch(err){
        console.log("Error at signInWithUsernamePassword", err.message);
        res.status(500).send({
            status: false,
            message: `Internal Server Error..!`
        })
    }
};

