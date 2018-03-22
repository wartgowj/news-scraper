const express = require('express');
const router = express.Router();

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

const controller = require('../controllers')

// A GET route for scraping the echojs website
router.get("/scrape", controller.scrape);

// Route for getting all Articles from the db
router.get("/headlines", controller.getHeadlines);

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/headlines/:id", controller.getHeadline);

// Route for saving/updating an Article's associated Note
router.post("/headlines/:id", controller.updateHeadline);

module.exports = router