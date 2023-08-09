const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.put("/:id", userController.replaceUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
exports.router = router;
