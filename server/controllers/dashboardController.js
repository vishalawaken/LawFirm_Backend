const Practice = require("../models/Practice");
const Consultation = require("../models/Consultation");

const getDashboardStats = async (req, res) => {
    try {
        //Count Totals
        const totalPractices = await Practice.countDocuments();
        const totalConsultations = await Consultation.countDocuments();
        const pendingConsultations = await Consultation.countDocuments({ status: "pending" });
        const contactedConsultations = await Consultation.countDocuments({ status: "contacted" });
        const closedConsultations = await Consultation.countDocuments({ status: "closed" });

        // Latest 5 consultations
        const recentConsultations = await Consultation.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json({
            totalPractices,
            totalConsultations,
            pendingConsultations,
            contactedConsultations,
            closedConsultations,
            recentConsultations,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });


    }
}

module.exports={getDashboardStats};