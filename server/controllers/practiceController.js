const Practice=require("../models/Practice");

const createPractice=async(req,res)=>{
    try {
        const {title,slug,description,faqs,metaTitle,metaDescription}=req.body;
        const existing=await Practice.findOne({slug});
        if(existing){
            return res.status(400).json({message:"Slug already exists"})
        }

        const practice=await Practice.create({
            title,
            slug,
            description,
            faqs,
            metaTitle,
            metaDescription,
        })
        res.status(201).json(practice);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getPractices=async(req,res)=>{
    try {
        const practices=await Practice.find({isActive:true}).sort({createdAt:-1});
        res.status(200).json(practices);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

const getPracticeBySluG=async (req,res)=>{
    try {
        const practice=await Practice.findOne({slug:req.params.slug});
        if(!practice){
            return res.status(400).json({message:"Practice Not Found"})
        }
        res.status(200).json(practice);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

const updatePractice=async(req,res)=>{
    try {
        const {
            title,
            description,
            metaTitle,
            metaDescription,
            faqs,
            isActive,
          } = req.body;
        const updatedPractice=await Practice.findByIdAndUpdate(req.params.id,{ title, description, metaTitle, metaDescription, faqs, isActive },{new:true,runValidators:true});
        if(!updatedPractice){
            return res.status(404).json({message:"Practice Not Found"})
        }
        res.json(updatedPractice);
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

// ================= DELETE PRACTICE =================
const deletePractice = async (req, res) => {
    try {
      const practice = await Practice.findById(req.params.id);
  
      if (!practice) {
        return res.status(404).json({ message: "Practice not found" });
      }
  
      await practice.deleteOne();
  
      res.json({ message: "Practice removed" });
  
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  module.exports = {
    createPractice,
    getPractices,
    getPracticeBySluG,
    updatePractice,
    deletePractice,
  };