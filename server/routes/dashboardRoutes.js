const express=require("express");
const router=express.Router();

const {getDashboardStats}=require("../controllers/dashboardController");
const {protect}=require("../middleware/AuthMiddleware");

//Admin Only
router.get("/",protect,getDashboardStats);

module.exports=router;