const express = require("express");
const auth = require("../middleware/auth");
const custController = require("../controllers/customerController");

const router = express.Router();

router.get("/", custController.loginView);
router.post("/postLogin", custController.postLogin);
router.get("/dashboard", auth, custController.getAllCustomers);
router.post("/postLogout", custController.postLogout);
router.get("/addCustomer", auth, custController.getAddCustomerView);
router.post("/addCustomer", custController.addCustomer);
router.get("/updateCustomer/:id", auth, custController.getUpdateCustomerView);
router.post("/updateCustomer/:id", custController.updateCustomer);
router.get("/deleteCustomer/:id", auth, custController.getDeleteCustomerView);
router.post("/deleteCustomer/:id", custController.deleteCustomer);

module.exports = {
  routes: router,
};
