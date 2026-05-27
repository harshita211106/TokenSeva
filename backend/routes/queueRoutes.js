const express = require("express");
const router = express.Router();

const {createQueue,getQueue,joinQueue}=require("../controllers/queueController");

// create queue route
router.post("/create",createQueue);

// get queue route
router.get("/",getQueue);

// join queue route
router.post("/join",joinQueue);



module.exports=router;



