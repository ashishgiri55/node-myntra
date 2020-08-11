//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();
const multer = require("multer");


const { ensureAuthenticated } = require("../../helper/auth_helper");

//Load Schema
const Profile = require("../../Model/Profile");
//Load multer
const { storage } = require("../../config/multer");
const upload = multer({ storage });

//@ http method GET
//@description its profile get information
//@access PUBLIC



router.get("/", (req, res) => {
  res.send("i am profile router");
});

router.get("/create-profile", ensureAuthenticated, (req, res) => {
  res.render("./profiles/create-profile");
});






router.get("/all-profiles", (req, res) => {
  //find Profile collections and fetch data from that collection
  Profile.find({})
    .sort({ date: "desc" })
    .lean()
    .then((profile) => {
      res.render("./profiles/all-profiles", { profile });
    })
    .catch((err) => console.log(err));
});

/*========================GET USER PROFILE DETAILS ========================*/
router.get("/user-details/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .lean()
    .then((profile_detail) => {
      res.render("./profiles/user-profile", { profile_detail });
    })
    .catch((err) => console.log(err));
});




/*==========EDIT PROFILE DETAILS=====*/
router.get("/edit-profile/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .lean()
    .then((edit_profile) => {
      res.render("./profiles/edit-profile", { edit_profile});
    })
    .catch((err) => console.log(err));
});



// @http method POST
// @description CREATE PROFILE DATA
// @access PRIVATE

router.post("/create-profile", ensureAuthenticated, upload.single("photo"), (req, res) => {
  let {
    firstname,
    lastname,
    designation,
    phone,
    skills,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  } = req.body;
  let newProfile = {
    photo: req.file,
    firstname,
    lastname,
    phone,
    designation,
    skills,
    address,
    alt_address,
    gender,
    country,
    pincode,
    landmark,
  };

  new Profile(newProfile)
    .save()
    .then((profile) => {
      req.flash("success_msg", "successfully profile created");
      res.redirect("/profile/all-profiles", 201, { profile });
    })
    .catch((err) => console.log(err));
});



// @http method PUT
// @description UPDATING PROFILE DATA
// @access PRIVATE


router.put("/edit-profile/:id",  ensureAuthenticated, upload.single("photo"),(req,res) => {
  //if you want to modify existing data or information first should find data in 
  //database by using finfone method
  Profile.findOne({ _id: req.params.id })
  
  .then((updateProfile) => {

   // left hand side old value =  right hand side new value
    updateProfile.photo = req.file;
    updateProfile.firstname = req.body.firstname;
    updateProfile.lastname= req.body.lastname;
    updateProfile.phone = req.body.phone;
    updateProfile.gender = req.body.gender;
    updateProfile.designation = req.body.designation;
    updateProfile.address = req.body.address;
    updateProfile.alt_address = req.body.alt_address;
    updateProfile.skills = req.body.skills;
    updateProfile.country = req.body.country;
    updateProfile.landmark = req.body.landmark;
    updateProfile.pincode = req.body.pincode;

    //update database
 
   updateProfile
   .save()
  .then((update) => {
    req.flash("succes_msg", "successfully profile updated");
   res.redirect("/profile/all-profiles", 201, { update });
   })
   .catch((err) => console.log(err));
   })
   .catch((err) => console.log(err));
   });


   /*===========HTTP DELETE METHOD DELETING DATA=======*/


   router.delete("/profile-delete/:id",  ensureAuthenticated, (req,res) => {
    req.flash("succes_msg", "successfully profile deleted");
     Profile.deleteOne({_id : req.params.id})
     .then((_) => {
      res.redirect("/profile/all-profiles", 201); 
     })
     .catch((err) => console.log(err));

     
   });

 
module.exports = router; 
