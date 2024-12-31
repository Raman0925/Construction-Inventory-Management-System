const express = require("express");
const router = express.Router();
const {
  getMaterial,
  createMaterial,
  deleteMaterial,
  updateMaterial,
  exportMaterialIntoCSV,
  importMaterialIntoCSV,
} = require("../controllers/materials");
const { upload } = require("../middlewares/csvFileUpload");

router.get("/", getMaterial);
router.put("/", updateMaterial);
router.post("/", createMaterial);
router.delete("/", deleteMaterial);

router.post("/export-csv", upload.single("file"), exportMaterialIntoCSV);

router.post("/import-csv", upload.single("file"), importMaterialIntoCSV);
module.exports = router;
