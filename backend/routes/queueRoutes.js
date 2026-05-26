const express = require("express");
const router = express.Router();

const {createQueue}=require("../controllers/queueController");

// create queue route
router.post("/create",createQueue);



module.exports=router;



