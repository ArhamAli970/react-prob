const express= require('express');
const app= express();
const bodyParser = require('body-parser'); // Import body-parser
const mongoose=require('mongoose');
const cors=require('cors');
const Chat=require('./models/chat.js');
const User=require('./models/user.js');

const session=require("express-session");
const passport=require("passport")
const LocalStrategy=require("passport-local");

app.use(cors());
app.use(bodyParser.json('body-parser')); 
app.use(express.urlencoded({extended:true}));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chatRct');
}


app.use(session(
  {
      secret:"cravingfoodisawesome",
      resave:false,
      saveUninitialized:true,
  
  cookie:{
      expires:Date.now() + 7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true
  }}


));

// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{ 
  console.log("user:",req.user);
  next();
})




app.post("/sign",async(req,res)=>{
  try{
  let{mail,username,password}=req.body.logi;
  console.log(req.body.logi);
  const newUser= new User({mail,username});
  await User.register(newUser,password);  
  await newUser.save();
  // req.flash("success","hello new user");
  
   res.json({user:"okk"})
  }
  catch(e){
      // req.flash("error",e.message);
      res.json({user:"no"})
  }
})




app.post("/login",passport.authenticate('local',{failureRedirect:'http://localhost:5173/login'}),(req,res)=>{
  console.log(req.user,"ho mai");
  res.json({user:req.user});
})



app.post("/logout",async(req,res,next)=>{ 
  req.logout((err)=>{ 
      if(err){ 
          next(err)
   }else{ 
          // req.flash("success","You Logged Out");
          res.redirect('/login');
      }
  });      
  

})



app.post('/subData',async(req,res)=>{
    let{frm}=req.body 
    let chat=new Chat({
      from:frm.from,
      to:frm.to,
      mess:frm.mess
    })
    await chat.save();
    res.json({succ:"done"}); 
})

app.post('/editChat/:id',async(req,res)=>{

  let {message}=req.body;
  let {id}=req.params
  // console.log(id,message);
  await Chat.findByIdAndUpdate(id,{mess:message});
  res.json({data:"okk"});
  
})


app.get('/get/:id',async(req,res)=>{
  let {id}=req.params;
  console.log("ere");
  let chat=await Chat.findOne({_id:id});
  console.log(chat);
  res.json({chat:chat});
})

app.get('/getData',async(req,res)=>{
  let chat=await Chat.find({});
  res.json({chat:chat});
})

app.delete("/delete/:id",async(req,res)=>{
  let{id}=req.params;
  console.log(id);
  await Chat.findByIdAndDelete(id);
  res.json({data:"df"})
})



app.listen(8080,(req,res)=>{
console.log("app list");
})