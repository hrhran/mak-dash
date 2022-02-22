const express = require("express");
const auth = require("../middleware/auth");
const lvlController = require("../controllers/levelsController")

const router = express.Router();

router.get("/levels",auth,lvlController.getLevel)
router.post("/addLevel",lvlController.addLevel)
router.get("/updateLevel/:id",auth,lvlController.getUpdateLevelView)
router.post("/updateLevel/:id",lvlController.updateLevel)
router.post("/deleteLevel/:id", lvlController.deleteLevel)

module.exports = {
  routes: router,
};
