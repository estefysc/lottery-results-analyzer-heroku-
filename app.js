// const express = require("express");
// const Quote = require('inspirational-quotes');
// const Parser = require('./Parser');

import express from "express";
import {getMostRepeated, getNumberData, getEvenOddData} from "./index.js";
import {createJsonFile} from "./parser.js";
import * as path from "path";

const app = express();

let port = process.env.PORT;
if(port == null || port == "") {
    port = 5000;
}

if(process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    })
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get("/", function(req, res){
    getNumberData();
});

app.get("/frequentNums", function(req, res) {
    res.send(getMostRepeated());
});

app.get("/evenOdd", function(req, res) {
   res.send(getEvenOddData());
});

// Connects to the lottery website and parses the data when the server is started.
app.listen(port, function() {
    console.log("Server started successfully");
    console.log("Creating JSON file...");
    createJsonFile();
});
