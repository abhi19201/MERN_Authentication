const express = require("express");

const Router = express.Router();

const listController = require("../controllers/listController");

Router.post("/add", listController.addItem);

Router.get("/get", listController.getAllItems);

Router.post("/update", listController.updateItem);

Router.post("/delete", listController.deleteItem);

module.exports = Router;
