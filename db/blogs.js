const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dbUrl = "mongodb+srv://pm:NsOFmoiNSjYsd6PW@cluster0.eplzygb.mongodb.net";
// const dbUrl = "mongodb://127.0.0.1:27017"


const db1 = mongoose.connect(`${dbUrl}/BlogsandVideos`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable buffering
  // bufferMaxEntries: 0, //
})
 

const db2 = mongoose.createConnection(`${dbUrl}/eventssection`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


// db1.once("open",()=>{
//   console.log("Connected with Blogs Mongodb Database");
// })
//   .on("error",(error) => {
//     console.log(`Error Connected with Blogs MongoDB Database,here's the error ${error}`);
//   })


db2.once("open",()=>{
  console.log("Connected with Events Mongodb Database");
})
  .on("error",(error) => {
    console.log(`Error Connected with Events MongoDB Database,here's the error ${error}`);
  })
  

