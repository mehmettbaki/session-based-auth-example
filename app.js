const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session')
const { body, validationResult } = require('express-validator');
require("dotenv").config();
const connectToMongo = require("./db/connection");



const app = express();
const SESSION_SECRET= process.env.SESSION_SECRET
const port = process.env.NODE_LOCAL_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user={username:'mehmet', password:'sifre'}




// creating 24 hours from milliseconds
// const oneDay = 1000 * 60 * 60 * 24;
const oneDay = 100 * 600


app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false}));


// // Access the session as req.session
// app.get('/', function(req, res, next) {
//   if (req.session.user ) {
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.user + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.user = 'isimsiz'
//     res.end('welcome to the session demo. refresh!')
//   }
// })

// app.get('/sil', function (req, res) {
app.get('/urunler',(req,res,next)=>{
  if(!req.session.username) return res.status(401).json({message: 'Unauthorizzed'})
  next()
}
,(req,res)=>{
  res.json({message:'working'})
})
  
app.get('/logout', (req,res)=>{
  req.session.destroy()
  return res.json({message: 'logout succefully'})
})
// console.log(req.session)
//   res.json({message: 'session silindi'})
//   req.session.destroy();
// });
app.post('/login', body('username').notEmpty().withMessage('please enter your username'),
body('password').notEmpty().withMessage('please enter your password')
,(req,res)=>{
  console.log(req.body)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          errors: errors.array()
      });
  }
if(req.body?.username && req.body?.password){
  if(user.username = req.body.username && user.password === req.body.password){
    req.session.username= req.body.username
    return res.json({message: 'login successfull'})
  }
return res.status(401).json({message: 'login failed'})

}




})












app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    // connectToMongo();
  });
  
  
  
  
