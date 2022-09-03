const express = require("express");
const cors = require("cors");
const app = express();

  
app.use(express.json());
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var corsOptions = {
  origin: "http://localhost:3000"
};

//app.use(cors(corsOptions));
this.app.use(function (err, req, res, next) {

  console.log(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //logger.error(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Authorization,X-ACCESS_TOKEN,Access-Control-Allow-Headers, Origin,Accept,X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


  res.status(err.status || 500);
  res.send('Invalid API Request ');
});
app.use('/assets',express.static('assets'))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/eugia.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
