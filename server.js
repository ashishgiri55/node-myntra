const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const {connect} = require("mongoose");
const {PORT, MONGODB_URL} = require("./config");



const app = express();

/*==============connect database=============*/

connect(MONGODB_URL, 
    {useNewUrlParser:true,useUnifiedTopology:true}, (err => {
    if (err) throw err;
    console.log("myntra database connected successfully");

}));



/*=======Template Engine Midlleware Starts Here=======*/

app.engine("handlebars", exphbs());
app.set("view engine","handlebars");

/*=======Template Engine Midlleware Ends Here=======*/


/*=======Body Parser incoming request stream to convert data starts here=======*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

/*=======Body Parser incoming request stream to convert data ends here=======*/


/*=======server static assets starts here=======*/

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

/*=======server static assets ends here=======*/


/*=========load ROUTES MODULES========*/
app.use("/profile/", require("./Routes/profiles/profile"));




app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("myntra is running on port number "  + PORT );
});





