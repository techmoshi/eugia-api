const express = require('express');
const router = express.Router();
const OauthController = require('../controllers/oauthcontroller');
const Functioncontroller = require('../controllers/functioncontroller');
const OAuthServer = require('express-oauth-server');
const Joi = require("joi");
const multer = require('multer');
const blogs = require('../models/blogs');
const OAuthClientsModel = require('../models').OAuthClients;
const { normalize } = require('path')


router.oauth = new OAuthServer({
  model: OauthController,
  debug: true,
});

let destination= 'assets/' ;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, normalize(destination));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  var upload = multer({ storage: storage });


router.post('/oauth/token', router.oauth.token());

router.post('/oauth/set_client', function (req, res, next) {
  OauthController.setClient(req.body)
      .then((client) => res.json(client))
      .catch((error) => {
          return next(error);
      });
});

router.post('/oauth/signup', function (req, res, next) {
  OauthController.setUser(req.body)
      .then((user) => res.json(user))
      .catch((error) => {
          return next(error);
      });
});

/**
 * Creating the blogs based on category 
 * About Us 
 * Treatments
 * Products
 */
router.post('/create_blogs',upload.single('image'), router.oauth.authenticate(), function (req, res) {
  console.log(JSON.stringify(router.oauth.authenticate()))
  let validation = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required()
  });
  let result = validation.validate(req.body, { abortEarly: false });
  if (result.error) {
    let data = result.error.details[0].message.replace(
      /[."*+\-?^${}()|[\]\\]/g,
      ""
    );
    res.send({ code: 400, err: data });
    return;
  }

  Functioncontroller.createBlogs(req).then(blogs =>res.json(blogs) ).catch(error=> { res.json((error)); }   )
  //res.json("Secret");
});

/**
 * Creating the blogs based on category 
 * About Us 
 * Treatments
 * Products
 */
 router.put('/update_blogs',upload.single('image'), router.oauth.authenticate(), function (req, res) {
  console.log(JSON.stringify(router.oauth.authenticate()))
 
  console.log(req.body.id)
  Functioncontroller.updateBlogs(req).then(blogs =>{
    res.status(200).json(blogs) 
  }).catch(error=> { res.json((error)); }   )
  //res.json("Secret");
});

/**
 * Get List based on blogs category 
 * //etc. example.com/user/000000?sex=female
 * query = {sex:"female"}
 * params = {id:"000000"}
 * 
 */
 router.get('/get_blogs', router.oauth.authenticate(), function (req, res) {
  console.log(JSON.stringify(router.oauth.authenticate()))
 
  console.log("Req Data  : ",req.query.category)
  Functioncontroller.getBlogs(req.query.category).then(blogs =>res.json(blogs) ).catch(error=> { res.json((error)); }   )

  //res.json("Secret");
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eugia' });
});



module.exports = router;
