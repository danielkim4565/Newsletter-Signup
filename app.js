const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const http = require("https");
const client = require("mailchimp-marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
    console.log("server is up");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})


client.setConfig({
    apiKey: "09c823f69afc688a407acda4f716896e-us11",
    server: "us11",
});
  


app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName =req.body.lName;
    var email = req.body.email;
    



    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    }
    const run = async () => {
        try{
            const response = await client.lists.addListMember("791aa5834c", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
            
            });
            console.log(response);
            res.sendFile(__dirname + "/success.html");
        } catch(err) {
            console.log(err.status);
            res.sendFile(__dirname + "/failure.html");
        }
    }
        run();


});


//key: 09c823f69afc688a407acda4f716896e-us11

//audience id 791aa5834c