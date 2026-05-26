const express = require("express");
const { createCompanyProfile, getMyCompanyProfile, updateCompanyProfile } = require("../controllers/companyProfile.controller");
const { protect, authorizeRoles } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create", protect, authorizeRoles("COMPANY"), createCompanyProfile);
router.get("/me", protect, authorizeRoles("COMPANY"), getMyCompanyProfile);
router.put("/update", protect, authorizeRoles("COMPANY"), updateCompanyProfile);

module.exports = router;
