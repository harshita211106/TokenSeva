const express = require("express");
const router = express.Router();

const {createQueue,getQueue}=require("../controllers/queueController");

// create queue route
router.post("/create",createQueue);
router.get("/",getQueue);



module.exports=router;



