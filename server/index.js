// Import express
let express = require('express')
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

const passport = require("passport");

// Import routes
let apiRoutes = require("./api-routes")

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to E-kart Rest API'));

// Use Api routes in the App
app.use('/api', apiRoutes)

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running E-kart on port " + port);
});
