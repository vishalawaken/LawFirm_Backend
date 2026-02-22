const express = require("express");
const router = express.Router();

const {
    createPractice,
    getPractices,
    getPracticeBySluG,
    updatePractice,
    deletePractice
} = require("../controllers/practiceController");

const {protect}=require("../middleware/AuthMiddleware");

// Public Routes
router.get("/",getPractices);
router.get("/:slug",getPracticeBySluG);

// Admin
router.post("/",protect,createPractice);
router.put("/:id",protect,updatePractice);
router.delete("/:id",protect,deletePractice);

module.exports=router;