const db = require("../models");
const Joi = require("joi");
const EugiaModel = db.eugia;
const express = require('express') 
 const app = express() 
app.use(express.json());
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if(req.file){
    const path = req.file.path
    var img_url =req.protocol+"://"+req.headers.host+"/"+path
    req.body.image = img_url ;
    console.log("image url ",req.file.path)
  }
  let validation ;
  switch(req.body.category.toLowerCase()) {
    case "products":
      validation = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
      });
      break;
      case "enquiry":
        validation = Joi.object().keys({
          name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });
        break;
        case "medicines":
          validation = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            category: Joi.string().required(),
          });
          break;
          case "awards":
            validation = Joi.object().keys({
              title: Joi.string().required(),
              image: Joi.string().required(),
              category: Joi.string().required()
            });
            break; 
            case "management":
              validation = Joi.object().keys({
                name: Joi.string().required(),
                designation: Joi.string().required(),
                image: Joi.string().required(),
                category: Joi.string().required()
              });
              break;
              case "faq":
                validation = Joi.object().keys({
                  title: Joi.string().required(),
                  description: Joi.string().required(),
                  category: Joi.string().required()
                });
                break;
                  case "aboutus":
                    validation = Joi.object().keys({
                      name: Joi.string().required(),
                      email: Joi.string().email().required(),
                      mobile_no: Joi.string().required(),
                      description: Joi.string().required(),
                      category:Joi.string().required(),
                    });
                    break;
                    case "reports":
                      validation = Joi.object().keys({
                        title: Joi.string().required(),
                        report_date: Joi.string().required(),
                        category: Joi.string().required(),
                      });
                      break;
                      case "blogs":
                        validation = Joi.object().keys({
                          title: Joi.string().required(),
                          description: Joi.string().required(),
                          image: Joi.string().required(),
                          category: Joi.string().required(),
                        });
                        break;
                        case "subscribe":
                          validation = Joi.object().keys({
                            email: Joi.string().email().required(),
                            category:Joi.string().required(),
                          });
                          break;
                default:
                  res.status(400).send({ message: "Please Enter valid category" });

  }

  let result = validation.validate(req.body, { abortEarly: false });
  if (result.error) {
    let data = result.error.details[0].message.replace(
      /[."*+\-?^${}()|[\]\\]/g,
      ""
    );
    res.send({ code: 400, err: data });
    return;
  }

  req.body.published = req.body.published ? req.body.published : true ;



  // Create a Tutorial
  const eugiaModel = new EugiaModel(req.body);

  // Save Tutorial in the database
  eugiaModel
    .save(eugiaModel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Create and Save a new Tutorial
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body.category) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if(req.file){
    const path = req.file.path
    var img_url =req.protocol+"://"+req.headers.host+"/"+path
    req.body.image = img_url ;
    console.log("image url ",req.file.path)
  }

  let validation ;
  switch(req.body.category.toLowerCase()) {
    case "contactus":
      validation = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile_no: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
      });
      break;
      case "enquiry":
        validation = Joi.object().keys({
          name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });
        break;
          case "joinus":
            validation = Joi.object().keys({
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              mobile_no: Joi.string().required(),
              category: Joi.string().required(),
            });
            break;
            case "aboutus":
              validation = Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                mobile_no: Joi.string().required(),
                description: Joi.string().required(),
                category:Joi.string().required(),
              });
              break;
                case "subscribe":
                  validation = Joi.object().keys({
                    email: Joi.string().email().required(),
                    category:Joi.string().required(),
                  });
                  break;
          default:
            res.status(400).send({ message: "Please Enter valid category" });

  }

  let result = validation.validate(req.body, { abortEarly: false });
  if (result.error) {
    let data = result.error.details[0].message.replace(
      /[."*+\-?^${}()|[\]\\]/g,
      ""
    );
    res.send({ code: 400, err: data });
    return;
  }

  req.body.published = req.body.published ? req.body.published : true ;



  // Create a Tutorial
  const eugiaModel = new EugiaModel(req.body);

  // Save Tutorial in the database
  eugiaModel
    .save(eugiaModel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Find all published Tutorials
exports.findAllCategory = (req, res) => {
  const id = req.params.id;
  console.log(id)
  EugiaModel.find({ category: id,isDeleted:false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log("Id : ",id);
  if(req.file){
    const path = req.file.path
    var img_url =req.protocol+"://"+req.headers.host+"/"+path
    req.body.image = img_url ;
    console.log("image url ",req.file.path)
  }
  console.log("Data : ",req.body)

  EugiaModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.delete = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to delete can not be empty!"
    });
  }

  let deleteData = {
    isDeleted : true,
  }
  const id = req.params.id;

  EugiaModel.findByIdAndUpdate(id,deleteData, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was deleted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Tutorial with id=" + id
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};


// Delete a Tutorial with the specified id in the request
exports.deletes = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


