module.exports = app => {
  const tutorials = require("../controllers/eugia.controller.js");
  const createClient = require('../controllers/eugia.oauthcontroller.js')
  const OAuth2Server = require('oauth2-server'),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;
  let router = require("express").Router();
  const multer = require('multer');
  let destination= 'assets/' ;
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  let upload = multer({ storage: storage });

  app.oauth = new OAuth2Server({
    model: require('../controllers/eugia.oauthcontroller.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
  });

  router.all('/oauth/token', obtainToken);

  router.post("/createClient", createClient.loadExampleData);

  // Create a new Tutorial
  router.post("/create", authenticateRequest,upload.single('image'),tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/category/:id", tutorials.findAllCategory);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", authenticateRequest,tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", authenticateRequest,tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/eugia", router);

  function obtainToken(req, res) {

    var request = new Request(req);
    var response = new Response(res);
  
    return app.oauth.token(request, response)
      .then(function(token) {
        res.json(token);
      }).catch(function(err) {
        res.status(err.code || 500).json(err);
      });
  }

  function authenticateRequest(req, res, next) {
    var request = new Request(req);
    var response = new Response(res);
    return app.oauth.authenticate(request, response)
      .then(function(token) {
        next();
      }).catch(function(err) {
        res.status(err.code || 500).json(err);
      });
  }

};
