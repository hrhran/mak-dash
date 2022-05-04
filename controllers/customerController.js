const { subscriber } = require("../models/customer");
const  User  = require("../models/user")
const path = require("path");
const fs = require("fs");
const helper = require("../helper");

const loginView = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};

const postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  fs.readFile(path.join(__dirname, "../startup/admin.json"), (err, data) => {
    if (err) throw err;
    let admin = JSON.parse(data);
    admin.forEach((e) => {
      if (e.username === username && e.password === password) {
        req.session.isLoggedIn = true;
        res.redirect("/dashboard");
      }
    });
  });
};

const postLogout = (req, res, next) => {
  req.session = null;
  res.redirect("/");
};

const getAllCustomers = async (req, res, next) => {
  try{
    const users = await User.find().sort({createdAt: -1})
    const customers = await subscriber.find().sort({ timestamp: -1 })
    res.render("customerlist", {
      users: users,
      customers: customers,
      helper: helper,
    });
  }catch(err){
    console.log(err)
  }
};

const getAddCustomerView = (req, res, next) => {
  res.render("addCustomer");
};

const addCustomer = async (req, res, next) => {
  const data = req.body;
  let user = await new subscriber({
    timestamp: data.timestamp,
    email: data.email,
    discord_id: data.discord_id,
    discord_name: data.discord_name,
    status: data.status,
    twitter: data.twitter,
    cust_id: data.cust_id,
    channel: data.channel,
  });
  user = await user.save();
  res.redirect("/dashboard");
};

const getUpdateCustomerView = async (req, res, next) => {
  try {
    const id = req.params.id;
    const onecustomer = await subscriber.findById(id).exec();
    res.render("updateCustomer", {
      customer: onecustomer,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCustomer = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  let user = await subscriber.findByIdAndUpdate(
    id,
    {
      timestamp: data.timestamp,
      email: data.email,
      discord_id: data.discord_id,
      discord_name: data.discord_name,
      status: data.status,
      twitter: data.twitter,
      cust_id: data.cust_id,
      channel: data.channel,
    },
    { new: true }
  );
  if (!user)
    return res.status(404).send("Subscriber with the given id not found");

  res.redirect("/dashboard");
};

const getDeleteCustomerView = async (req, res, next) => {
  try {
    const id = req.params.id;
    const onecustomer = await subscriber.findById(id).exec();
    res.render("deleteCustomer", {
      customer: onecustomer,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await subscriber.findByIdAndRemove(id);
    if (!customer)
      return res.status(404).send("Subsciber with the given id not found");
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//----------------------User Database------------------------------------------



const getUpdateUserView = async (req, res, next) => {
  try {
    const id = req.params.id;
    const onecustomer = await User.findById(id).exec();
    res.render("updateUser", {
      customer: onecustomer,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  let user = await User.findByIdAndUpdate(
    id,
    {
      name: data.name,
      email: data.email,
      twitter: data.twitter,
      discord_id: data.discord_id,
      referral_code: data.referral_code,
      billingID: data.billingID,
      subscribed: data.subscribed,
      inTrial: data.inTrial,
    },
    { new: true }
  );
  if (!user)
    return res.status(404).send("Subscriber with the given id not found");

  res.redirect("/dashboard");
};

const getDeleteUserView = async (req, res, next) => {
  try {
    const id = req.params.id;
    const onecustomer = await User.findById(id).exec();
    console.log(onecustomer)
    res.render("deleteUser", {
      customer: onecustomer,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    if (!user)
      return res.status(404).send("Subsciber with the given id not found");
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  loginView,
  postLogin,
  getAllCustomers,
  postLogout,
  getAddCustomerView,
  addCustomer,
  getUpdateCustomerView,
  updateCustomer,
  getDeleteCustomerView,
  deleteCustomer,
  getUpdateUserView,
  updateUser,
  getDeleteUserView,
  deleteUser,
};
