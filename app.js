import express from "express";
import {getMostRepeated, getNumberData, getEvenOddData, getAllNumsData, getConsecutiveNumsData} from "./index.js";
import {createJsonFile} from "./parser.js";
import path from "path";
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let port = process.env.PORT;
if(port == null || port == "") {
    port = 5000;
}

// Redirects to the HTTPS version of the site if the request is HTTP  
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
});

app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "script-src 'self' https://www.googletagmanager.com https://fonts.googleapis.com 'unsafe-inline'; " +
        "style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com 'unsafe-inline'; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data:; " +
        "connect-src 'self' https://lottery-analyzer.herokuapp.com https://www.google-analytics.com"
      );
    next();
  });

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get("/api/frequentNums", function(req, res) {
    res.send(getMostRepeated());
});

app.get("/api/evenOdd", function(req, res) {
   res.send(getEvenOddData());
});

app.get("/api/allNums", function(req, res) {
    res.send(getAllNumsData());
});

app.get("/api/consecutiveNums", function(req, res) {
    res.send(getConsecutiveNumsData());
});

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    console.log("Getting number data... from app.js get /");
    getNumberData();
});

 app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});

// Connects to the lottery website and parses the data when the server is started.
app.listen(port, function() {
    createJsonFile()
        .then(jsonData => {
            console.log("JSON file created successfully!");
        })
        .catch(error => {
            console.error("Failed to create JSON file:", error);
        });
});

