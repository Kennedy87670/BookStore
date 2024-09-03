const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multerConfig");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const verifyUser = require("../middlewares/verifyUser");
const roleCheck = require("../middlewares/roleCheck");

router.post(
  "",
  verifyUser,
  roleCheck(["admin"]),
  upload.single("poster"),
  createProduct
);
router.get("", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("poster"), updateProduct);
router.delete("/:id", verifyUser, roleCheck(["admin"]), deleteProduct);

module.exports = router;
