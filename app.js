import express from "express";
import {getMostRepeated, getNumberData, getEvenOddData, getAllNumsData} from "./index.js";
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

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'frontend/build')));

// app.get("/", function(req, res){
//     res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
//     getNumberData();
// });

// app.get("/frequentNums", function(req, res) {
//     res.send(getMostRepeated());
// });

// app.get("/evenOdd", function(req, res) {
//    res.send(getEvenOddData());
// });

// app.get("/allNums", function(req, res) {
//     res.send(getAllNumsData());
//  });


app.get("/api/frequentNums", function(req, res) {
    res.send(getMostRepeated());
});

app.get("/api/evenOdd", function(req, res) {
   res.send(getEvenOddData());
});

app.get("/api/allNums", function(req, res) {
    res.send(getAllNumsData());
});

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    getNumberData();
});

 app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});

// app.use(express.static(path.join(__dirname, 'frontend/build')));

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

