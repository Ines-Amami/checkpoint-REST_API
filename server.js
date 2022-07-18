const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require("./models/User");
require("dotenv").config({path:"./config/.env"});
const router = express.Router();
app.use(express.json());

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URI);
        console.log("we are connected")
      } catch (error) {
        console.log(error);
      }
}
connectDB();

app.use("/users", router);
// GET :  RETURN ALL USERS :
router.get("/", async (req, res) => {
    try{
    const allusers = await User.find({});
    res.send(allusers);}
    catch (error) {
        console.log(error);
      }
  });
// POST :  ADD A NEW USER TO THE DATABASE 
router.post("/", async (req, res) => {
    try {
      const UserAdd = await User.create(req.body);
      res.send({ msg: "added succcesfully" });
    } catch (error) {
      console.log(error);
    }
  });
//PUT : EDIT A USER BY ID 
router.put("/:id", async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate({ _id: req.params.id },  { name: req.body.name }, { new: true });
      res.send({ msg: "succcesfully update"}, updateUser);
    } catch (error) {
      console.log(error);
    }
  });
  //  DELETE : REMOVE A USER BY ID 
  router.delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.params.id });
      res.send({ msg: "succcesfully delete" });
    } catch (error) {
      console.log(error);
    }
  });

const port = 5000
app.listen(port,(err) =>
err ? console.log(err) :console.log(`listening on port ${port}!`))