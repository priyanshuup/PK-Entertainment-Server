const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const cors = require("cors");
require('./db/blogs')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const blogsschema = new mongoose.Schema({
  img: { type: String, unique: true }, // Set 'img' field as unique
  heading: String,
  description: String,
})

const eventsschema = new mongoose.Schema({
  url:{ type: String, unique: true },
  heading:String,
  description:String,
})
const blogs = new mongoose.model("blogs",blogsschema)
const events = new mongoose.model("events",eventsschema) 


// Create Product

app.post("/api/v1/blogs/new",async(req,res)=>{
  try {
    const Blogs = await blogs.create(req.body);

    if (!Blogs) {
      return res.status(404).json({
        success: false,
        message: "Data Not Added"
      });
    }
    res.status(200).json({
      success: true,
      message: "Added Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
})

app.post("/api/v1/events/new",async(req,res)=>{
  try {
  const Events = await events.create(req.body);
    
  if(!Events){
    return res.status(404).json({
      success:false,
      message:"Data Not Added"
    });
  }
  res.status(200).json({
    success:true,
    message:"Added Successfully",
    Events
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      error: error.message
    })
  }
})

// Retrieve or Find Product

app.get("/api/v1/blogs",async (req,res)=>{

  try {
    const blogsfinds = await blogs.find();
    if(!blogsfinds){
      res.status(200).json({
        success:true,
        message:"Data Not Found",
        blogsfinds
      })
    }
    res.status(200).json({
      success: true,
      message:"Data Found",
      blogsfinds
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error: error.message
    })
  }
})

app.get("/api/v1/events",async(rrq,res)=>{
  try {
    const eventsfinds = await events.find();
    
    if(!eventsfinds){
      res.status(404).json({
        success:false,
        message:"Data Not Found"
      }
    )}
    res.status(200).json({
      success:true,
      message:"Data Found Successfully",
      eventsfinds
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
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
    message:"Data Updated Successfully !"
})

})

app.put("/api/v1/eventsupdate/:id",async(req,res)=>{
  let eventsdataupdate = await events.findById(req.params.id);

  eventsdataupdate = await events.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    useFindAndModify:false,
    runValidators:true
  })

  res.status(200).json({
    success:true,
    eventsdataupdate
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
  
app.delete("/api/v1/eventsdelete/:id",async(req,res)=>{
  try{
    const delevents = await events.findByIdAndDelete(req.params.id);

    if(!delevents){
      return res.status(404).json({
        success: false,
        message: "Data Not Found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Deleted Successfully"
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
})

app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})
