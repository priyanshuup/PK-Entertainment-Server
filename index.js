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

// schema or Structure

const apischema = new mongoose.Schema({
    url:{type:String,unique:true},
    heading:String,
    description:String,
})

const events = new mongoose.model("events",apischema);
const blogs = new mongoose.model("blogs",apischema);
const rents = new mongoose.model("rents",apischema);



// CRUD operation for Blogs

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

app.get("/api/v1/blogs/:id",async(req,res)=>{
  try {
    const blogsdatafindbyid = await blogs.findById(req.params.id)
    
    if(!blogsdatafindbyid){
      return res.status(404).json({
        success:false,
        message:"Data Not Found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Data Found Successfully !",
      blogsdatafindbyid
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
})

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


// CRUD operation for Events

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

app.get("/api/v1/events/:id",async(req,res)=>{
  try {
    const eventsdatabyid = await events.findById(req.params.id);

  if(!eventsdatabyid){
    return res.status(404).json({
      success:false,
      message:"Data Not Found !"
    })
  }
  res.status(200).json({
    success:true,
    message:"Data Found",
    eventsdatabyid
  })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
  
})

app.put("/api/v1/eventsupdate/:id",async(req,res)=>{

  try {
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

  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }

})

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

// CRUD operation for Rents

app.post("/api/v1/rents/new",async(req,res)=>{

try {
  const Rents = await rents.create(req.body);
  if(!Rents){
    return res.status(404).json({
      message:"Data not Added",
      success:false,
      error:error
    })
  }
  res.status(200).json({
    success:true,
    message:"Data has been added successfully",
    Rents
  })
}
  catch(error){
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
})

app.get("/api/v1/rents",async(req,res)=>{
  try {
    const rentsFind = await rents.find();

    if(!rentsFind){
      return res.status(404).json({
        success:false,
        message:"Data Not Found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Data Found",
      rentsFind
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
    })
  }
})

app.get("/api/v1/rents/:id",async(req,res)=>{
  try {
    const getbyid = await rents.findById(req.params.id)

    if(!getbyid){
      return res.status(404).json({
        success:false,
        message:"Data Not Found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Data Found",
      getbyid
    })
  } catch (error) {
    
  }
})

app.put("/api/v1/rentsupdate/:id",async(req,res)=>{
  try {
    let rentsUpdate = await rents.findById(req.params.id)

    rentsUpdate = await rents.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      useFindAndModify:false,
      runValidators:true
    })
    res.status(200).json({
      success:true,
      message:"Data Updated Successfully",
      rentsUpdate
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error: error.message
    })
  }
})

app.delete("/api/v1/rentsdelete/:id",async(req,res)=>{
  try {
    const deleterents = await rents.findById(req.params.id);
    if(!deleterents){
      return res.status(404).json({
        success:false,
        message:"Data Not Found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Deleted Successfully !"
  
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      error:error.message
   })
  }
})


app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})

