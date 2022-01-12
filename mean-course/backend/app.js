const express=require('express');
const bodyParser=require("body-parser");


const Post=require('./models/post');
const mongoose= require('mongoose');
const app=express();
mongoose.connect("mongodb://vijji_123:vijji_123@cluster0-shard-00-00.tvdft.mongodb.net:27017,cluster0-shard-00-01.tvdft.mongodb.net:27017,cluster0-shard-00-02.tvdft.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14k9zd-shard-0&authSource=admin&retryWrites=true&w=majority");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,OPTIONS,PATCH")
  next();
});

app.post("/api/posts",(req,res,next)=>{
  const post=new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save().then(createdPost=>{
  res.status(201).json({
   message:'post added successfully',
   postId:createdPost._id
  });
  });
});


app.get("/api/posts",(req,res,next)=> {
 Post.find().then(documents=>{
  res.status(200).json({
   message:'posts fetched successfully',
   posts:documents
 });
});
});

app.delete("/api/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message:"post deleted"});
  });
});



module.exports=app;
