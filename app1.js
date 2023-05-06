const express =require("express");
const path =require("path");
const bodyparser =require("body-parser");
const nodemailer =require("nodemailer");
const { log, info } = require("console");

const app = express();
app.use(express.json());
app.use(express.static("style"));
app.use(express.static(path.join(__dirname,'public')));



app.use(bodyparser.urlencoded({extended: true}));






app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html",);
    console.log(__dirname);
});

app.post("/", (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fbbabul56@gmail.com',
            pass: 'aygpvvzafskssnum'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'fbbabul56@gmail.com',

        subject: `Message from ${req.body.email}:`,
        text: req.body.message,
        phone: req.body.phone
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent : ' + info.response);
            res.redirect('/');
        }
    })
});



app.listen(4000, function(){
    console.log("server is running at 4000");
});