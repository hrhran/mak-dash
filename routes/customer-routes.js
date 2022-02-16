const express = require("express");
const auth = require("../middleware/auth");
const controller = require("../controllers/customerController");

const router = express.Router();

router.get("/", controller.loginView);
router.post("/postLogin", controller.postLogin);
router.get("/dashboard", auth, controller.getAllCustomers);
router.post("/postLogout", controller.postLogout);
router.get("/addCustomer", auth, controller.getAddCustomerView);
router.post("/addCustomer", controller.addCustomer);
router.get("/updateCustomer/:id", auth, controller.getUpdateCustomerView);
router.post("/updateCustomer/:id", controller.updateCustomer);
router.get("/deleteCustomer/:id", auth, controller.getDeleteCustomerView);
router.post("/deleteCustomer/:id", controller.deleteCustomer);

module.exports = {
  routes: router,
};
