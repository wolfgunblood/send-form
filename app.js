const express =require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io'); 
const path = require('path');
const nodemailer = require('nodemailer');

//init nexmo
//const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '1df18157',
  apiSecret: '5iXaBrmeNgq1H8Hq',
});

//init app
const app =express();


app.set('view engine','html');
app.engine('html',ejs.renderFile);

//static folder
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res) => {
 res.render('contact');

});

//Sending Email

app.post('/send', (req, res) => {
   // res.send(req.body);
    console.log(req.body);

    const output = `
      <p>You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Check In Time: ${req.body.chkin}</li>
        <li>Check Out Time: ${req.body.chkout}</li>
      </ul>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'larue54@ethereal.email', // generated ethereal user
            pass: 'tA8YKhK1fmjkcscDjP'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });

      let mailOptions = {
        from: '"From Host"larue54@ethereal.email', // sender address
        to: 'vishesvz@gmail.com', // list of receivers
        subject: 'Visitor Details', // Subject line
        //text:, // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
       res.render('contact', {msg:'Email has been sent'});
    });


    //Sending SMS

    const from = '1234092829'
    const to = '917209787675'
    
    const textname = req.body.name + req.body.email + req.body.phone + req.body.chkin + req.body.chkout
    const opts = {
        "type": "unicode"
      }
    
    nexmo.message.sendSms(from, to, textname,opts, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })


    //Sending Scheduled email

    let cron = require('node-cron');

    cron.schedule('0 16 * * *', () => {
      // Send e-mail
      transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
      });

    });

const port =3000;
    
const server = app.listen(port,() => console.log('Server started on port ${port}'));