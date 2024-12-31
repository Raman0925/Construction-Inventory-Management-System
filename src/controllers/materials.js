const { ApiResponse } = require("../utils/apiResponse");
const Material = require("../models/Materials");
const logger = require("../utils/logger");

const createMaterial = async (req, res) => {
  try {
    const { name, category, unit, base_price, stock } = req.body;

    const material = new Material({
      name,
      category,
      unit,
      base_price,
      stock,
    });

    const savedMaterial = await material.save();

    return res.status(201).json(new ApiResponse(201, savedMaterial));
  } catch (error) {
    logger.error(`Error creating material: ${error}`);
    console.error(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while creating the material."
        )
      );
  }
};

const deleteMaterial = async (req, res) => {
  const _id = req.body._id;

  try {
    const deletedMaterial = await Material.findByIdAndDelete(_id);

    if (!deletedMaterial) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Material not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, deletedMaterial, "Material deleted successfully")
      );
  } catch (error) {
    console.error(error);
    logger.error(`Error creating material: ${error}`);

    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while deleting the material"
        )
      );
  }
};

const updateMaterial = async (req, res) => {
  const _id = req.body._id;
  const { name, category, unit, base_price, stock } = req.body;

  try {
    const material = await Material.findById(_id);

    if (!material) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Material not found"));
    }

    material.name = name || material.name;
    material.category = category || material.category;
    material.unit = unit || material.unit;
    material.base_price = base_price || material.base_price;
    material.stock = stock || material.stock;

    const updatedMaterial = await material.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedMaterial, "Material updated successfully")
      );
  } catch (error) {
    logger.error(`Error creating material: ${error}`);

    console.error(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while updating the material"
        )
      );
  }
};

const getMaterial = async (req, res) => {
  const _id = req.body._id;

  try {
    const material = await Material.findById(_id);

    if (!material) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Material not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, material, "Material retrieved successfully"));
  } catch (error) {
    logger.error(`Error creating material: ${error}`);

    console.error(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "An error occurred while retrieving the material"
        )
      );
  }
};

const exportMaterialIntoCSV = async (req, res) => {
  try {
    const materials = await Material.find();
    let csvData =
      ["_id", "name", "category", "unit", "base_price", "stock"].join(",") +
      "\r\n";

    materials.forEach((material) => {
      csvData +=
        [
          material._id,
          material.name,
          material.category,
          material.unit,
          material.base_price,
          material.stock,
        ].join(",") + "\r\n";
    });

    res
      .set({
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="materials.csv"`,
      })
      .send(csvData);
  } catch (error) {
    logger.error(`Error creating material: ${error}`);

    console.error("Error exporting materials to CSV:", error);
    res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to export materials to CSV"));
  }
};
//Import Material Into CSV Is under Construction
const importMaterialIntoCSV = async (req, res) => {
  return res.json({ material: "Material" });
};
module.exports = {
  getMaterial,
  createMaterial,
  deleteMaterial,
  updateMaterial,
  exportMaterialIntoCSV,
  importMaterialIntoCSV,
};
