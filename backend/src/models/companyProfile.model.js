const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    companySize: { type: String, required: true, trim: true },
    companyLogo: { type: String, default: "" },
    companyDescription: { type: String, required: true, trim: true },
    website: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    foundedYear: { type: Number },
    hrName: { type: String, default: "" },
  },
  { timestamps: true }
);

const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);
module.exports = CompanyProfile;
