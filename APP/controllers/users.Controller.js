const User = require("../models/users.model");
const util = require("../util/utility");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    // get the latest id of the user from the users collection and increment it by one to create a unique id for the new user
    let lastIdUser = await User.findOne().sort({ userId: "desc" }).exec();
    if (!lastIdUser) lastIdUser = 1;
    else lastIdUser = lastIdUser.userId + 1;
    req.body.userId = lastIdUser;

    // encrypt password and update request body with encrypted password
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    let data = {
      userId: req.body.userId,
      fname: req.body.fname,
      lname: req.body.lname,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      age: req.body.age,
      phoneCode:  req.body.phoneCode,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      profilePicture : req.body.profilePicture,
      userDisabled: false,
      verifiedUser: false,
      createdBy: req.body.userName,
      createdOn: util.dateFormat(),
      
    };
    
    // check username and email is already exist or not already
    const userExistOrNot = await User.findOne({
      $or: [{ userName: data.userName }, { email: data.email }],
    });
    if (userExistOrNot) {
      return res
        .status(409)
        .send(
          `Username ${data.userName} or Email ${data.email} already exists.`
        );
    }

    let newUser = new User(data);

    let dataUser = await newUser.save();
    return res.status(201).send({
      status: true,
      message: `user : ${newUser.userName} has been added successfully!`,
      results: dataUser,
    });
  } catch (err) {
    console.log("Error at new  user creation", err.message);
    return res.status(500).send({
      status: false,
      message: "Internal server error...!",
    });
  }
};
