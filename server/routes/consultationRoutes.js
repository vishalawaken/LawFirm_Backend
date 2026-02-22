const express = require("express");
const router = express.Router();

const { createConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultationStatus,
    deleteConsultation } = require("../controllers/consultationController");

const { protect } = require("../middleware/AuthMiddleware");

// public
router.post("/", createConsultation);

// Admin
router.get("/", protect, getAllConsultations);
router.get("/:id", protect, getConsultationById);
router.put("/:id", protect, updateConsultationStatus);
router.delete("/:id", protect, deleteConsultation);

module.exports = router;