// const express = require("express");
// const Quote = require('inspirational-quotes');
// const Parser = require('./Parser');

import express from "express";
import {getMostRepeated, getNumberData, getEvenOddData} from "./index.js";
import {createJsonFile} from "./parser.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

app.get("/", function(req, res){
    res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    getNumberData();
    console.log("getNumberData() called from app.get('/')");
});

app.get("/frequentNums", function(req, res) {
    res.send(getMostRepeated());
    console.log("getMostRepeated() called from app.get('/frequentNums')");
});

app.get("/evenOdd", function(req, res) {
   res.send(getEvenOddData());
    console.log("getEvenOddData() called from app.get('/evenOdd')");
});

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
// })

app.use(express.static(path.join(__dirname, 'frontend/build')));

// Connects to the lottery website and parses the data when the server is started.
app.listen(port, function() {
    console.log("Server started successfully");
    console.log("Creating JSON file...");
    createJsonFile();
});

