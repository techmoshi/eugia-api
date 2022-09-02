module.exports = app => {
  const tutorials = require("../controllers/eugia.controller.js");

  var router = require("express").Router();
  const multer = require('multer');


let destination= 'assets/' ;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  var upload = multer({ storage: storage });



  // Create a new Tutorial
  router.post("/create", upload.single('image'),tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/category/:id", tutorials.findAllCategory);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/eugia", router);
};
