const express = require('express')
const app = express()
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require('cors');
const ipAddress = require('./services/getMyIP');
const myHost = require('./services/batchFileHelper');
const dbConnection = require('./db/connection');
const userRouter = require('./routers/users.Router');
const port = process.env.PORT || 3000
dotenv.config()


app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());


// Create a batch file to update hosts file
run_batch = process.env.RUN_BATCH
app.get('/run-host', (req, res) => {
  if (run_batch == 'T'){
  myHost.createAndRunBatchFile();
  res.send('Batch file created successfully');}
  else{
  res.send('Batch file creation failed. Please set RUN_BATCH environment variable to true');
  }
});

//run Database 
dbConnection.run();

app.get('/', (req, res) => res.send('Welcome To Haptic Store !'));
app.use("/", userRouter);


// send back a 404 if no other route matches
app.use((req, res) => {
    res.status(404).send('<h1>Error</h1><p>Sorry, that route does not exist</p>')
})


// Use '0.0.0.0' to listen on all interfaces (localhost and IP)
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
