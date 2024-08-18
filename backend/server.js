const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// hosting 
// const path = require("path");
const path=require("path")

const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const __dirname1=path.resolve();
console.log(__dirname1)
app.use(express.static(path.join(__dirname1,"../frontend/build")))
app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname1,"../frontend","build","index.html"))
})
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
