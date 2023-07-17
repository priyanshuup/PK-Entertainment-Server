const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express();
const port = process.env.PORT || 3000 ;
const cors = require("cors")

app.use(cors());
const dbUrl = "mongodb+srv://pm:NsOFmoiNSjYsd6PW@cluster0.eplzygb.mongodb.net/BlogsandVideos?retryWrites=true&w=majority"

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(()=>{console.log("Connected with Mongodb")})
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

const blogsschema = new mongoose.Schema({
    img:String,
    heading:String,
    description:String,
})

const blogs = new mongoose.model("blogs",blogsschema) 

// Create Product

app.post("/api/v1/blogs/new",async(req,res)=>{
    
const Blogs = await blogs.create(req.body);

    res.status(200).json({
        success:true,
        Blogs
    })
})

// Retrieve or Find Product

app.get("/api/v1/blogs",async (req,res)=>{
    const blogsfinds = await blogs.find();

    res.status(200).json({
        success:true,
        blogsfinds
    })
})


// Update the Data

app.put("/api/v1/blogsupdate/:id",async(req,res)=>{
    let blogsdataupdate = await blogs.findById(req.params.id);

    blogsdataupdate = await blogs.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
})

res.status(200).json({
    success:true,
    blogsdataupdate
})

})

// Delete the Data

app.delete("/api/v1/blogdelete/:id", async (req, res) => {
    try {
      const delproduct = await blogs.findByIdAndDelete(req.params.id);
  
      if (!delproduct) {
        return res.status(404).json({
          success: false,
          message: "Data Not Found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Deleted Successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
  

app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
