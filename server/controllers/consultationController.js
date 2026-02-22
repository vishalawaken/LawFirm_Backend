const Consultation = require("../models/Consultation");
const sendEmail = require("../utils/sendEmail");

// Create Consultation
const createConsultation = async (req, res) => {
    try {
        const { name, email, phone, message, practiceArea } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const consultation = await Consultation.create({
            name,
            email,
            phone,
            message,
            practiceArea
        });

        //Send Email to the Admin
        try {
            await sendEmail({
                to: process.env.EMAIL_USER,
                subject: "NEW Consultation Request",
                html: `
                <h2>New consultation submitted by ${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <p>Message: ${message}</p>
                <p>Practice_Area: ${practiceArea}</p>
                `
            });
        } catch (err) {
            console.log("Email sending failed:", err.message);
        }

        res.status(201).json({
            success: true,
            message: "Consultation submitted successfully",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get All Consultations
const getAllConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find().sort({ createdAt: -1 });
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update Status of the Consultation
const updateConsultationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ["pending", "contacted", "closed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const consultation = await Consultation.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!consultation) {
            return res.status(404).json({ message: "Consultation Not Found" });
        }
        res.json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete Consultation
const deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: "Consultation Not Found" })
        }
        await consultation.deleteOne();
        res.json({ message: "Consultation Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get consultation By Id
const getConsultationById = async (req, res) => {
    try {
        const mongoose = require("mongoose");
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Consultation ID" });
        }

        const consultation = await Consultation.findById(req.params.id);
        if (!consultation) {
            return res.status(404).json({ message: "Consultation Not Found" });
        }
        res.status(200).json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createConsultation,
    getAllConsultations,
    updateConsultationStatus,
    deleteConsultation,
    getConsultationById,
}