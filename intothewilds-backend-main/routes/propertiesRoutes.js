const express = require('express');
const { getProperties, getPropertyById,editProperty, addProperty, deleteProperty} = require('../controller/propertiesController');
const router = express.Router();

// router.get("/getProperties", getProperties);
// router.get("/getPropertyById/:id", getPropertyById);
// router.put("/updateProperty/:id",editProperty);
// router.post("/addProperty", addProperty);
// router.delete("/deleteProperty/:id", deleteProperty);

// const {
//   getProperties,
//   getPropertyById,
//   addProperty,
//   editProperty,
//   deleteProperty,
// } = require("../controller/propertiesController");

// // /api/v1/properties
router
  .route("/")
  .get(getProperties)  // GET list
  .post(addProperty);  // POST create

// /api/v1/properties/:id
router
  .route("/:id")
  .get(getPropertyById) // GET one
  .put(editProperty)    // UPDATE
  .delete(deleteProperty);

module.exports = router;
