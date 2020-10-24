
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fizen1201:Zoon!201@cluster0.epxbh.mongodb.net/blogDB', {useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model('Blog', blogSchema);

const homeStartingContent = "Hello there! My name is Vishesh. Thanks for using my Blog site.";
const aboutContent = "This is a blogging website working on Node.js and using express routing for backend with different npm packages";
const contactContent = "Hey there! You can find me at visheshkoul@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req,res){
  res.render('home', {para: homeStartingContent});
});

app.get('/about', function(req,res){
  res.render('about', {para: aboutContent});
});

app.get('/contact', function(req,res){
  res.render('contact', {para: contactContent});
});

app.get('/compose', function(req,res){
  res.render('compose');
});

app.get('/posts', function(req,res){

Blog.find({}, function(err, resultedItems){
  if(err){
    console.log(err);
  }else{
   res.render('post', {posts: resultedItems});
  }
});
});
// app.get('*', function(req,res){
//   res.render("error");
// });

app.get('/delete', function(req,res){
  Blog.deleteMany({}, function (err) {
    if(err){
      console.log(err);
    }
    else{
      res.render("error");
          }
  });

})
app.get('/posts/:particularPost', function(req,res){
   Blog.findOne({title: req.params.particularPost}, function(err, found){
  if(err){
    console.log(err);
  }else{
   res.render('reqPost', {title: found.title, content: found.content});
  }
});
});

app.post('/', function(req,res){
  res.send("<h1>Home Route</h1>");
});

app.post('/about', function(req,res){
  res.send("<h1>About Route</h1>");
});

app.post('/contact', function(req,res){
  res.send("<h1>Contact Route</h1>");
});

app.post('/compose', function(req,res){
    let head= req.body.heading;
    let body= req.body.postcontent;
   const newBlog = new Blog({
    title: head,
    content: body
   });
   newBlog.save();
res.redirect('/posts');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
