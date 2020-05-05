// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const PORT = 3000;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
app.get('/', (req, res) => {
    res.send('index');
})
app.get('/all', (req, res) => {
    res.send(projectData);
})
app.post('/addPost', (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    // console
    console.log(projectData);
    // RETURN
    res.send(projectData)
})
// Setup Server
app.listen(PORT, () => {console.log('listening on: ' + PORT)})