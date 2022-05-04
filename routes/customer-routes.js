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
router.get("/updateUser/:id", auth, custController.getUpdateUserView);
router.post("/updateCustomer/:id", custController.updateCustomer);
router.post("/updateUser/:id", custController.updateUser);
router.get("/deleteCustomer/:id", auth, custController.getDeleteCustomerView);
router.get("/deleteUser/:id", auth, custController.getDeleteUserView);
router.post("/deleteCustomer/:id", custController.deleteCustomer);
router.post("/deleteUser/:id", custController.deleteUser);

module.exports = {
  routes: router,
};
