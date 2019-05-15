const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Set view engine and body parser.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Global variables.
var bearerToken;
var token;
var start;
var finish;
var endpoint;
var maxTweets;
var maxRequests;
var query;

// Get index which allows public/private input.
app.get("/generate", (req, res) => {
  res.render("generate", {
    bearerToken: bearerToken
  });
});

// Identify public/private key.
app.post("/generate", (req, res) => {
  var secretKey = req.body.secretKey;
  var publicKey = req.body.publicKey;

  // Makes HTTP request.
  generateToken(publicKey, secretKey);

  function generateToken(publicKey, secretKey) {
    var request = require("request");

    // Assign public key and secret key.
    var CONSUMER_KEY = publicKey;
    var CONSUMER_SECRET_KEY = secretKey;

    // Encode public key and secret key.
    var ENCODED_KEY = new Buffer(
      CONSUMER_KEY + ":" + CONSUMER_SECRET_KEY
    ).toString("base64");

    // Configure request.
    var options = {
      url: "https://api.twitter.com/oauth2/token",
      headers: {
        Authorization: "Basic " + ENCODED_KEY,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: "grant_type=client_credentials"
    };

    // Request returns string, so it must be parsed.
    request.post(options, function(error, response, body) {
      body = JSON.parse(body);

      // Returning the key or handling the error.
      if (body.token_type === "bearer") {
        bearerToken = "Success! Copy the token below: " + body.access_token;
      } else {
        bearerToken = "Sorry, something went wrong. Here's the error: " + error;
      }
    });
  }
  // Redirect to refreshed page.
  setTimeout(() => {
    res.redirect("/generate");
  }, 1000);
});

app.get("/collect", (req, res) => {
  res.render("collect", {
    token: token,
    start: start,
    finish: finish,
    endpoint: endpoint,
    maxRequests: maxRequests,
    maxTweets: maxTweets,
    query: query
  });
});

app.post("/collect", (req, res) => {
  token = req.body.token;
  start = req.body.start;
  finish = req.body.finish;
  endpoint = req.body.endpoint;
  maxTweets = req.body.maxTweets;
  maxRequests = req.body.maxRequests;
  query = req.body.query;

  twitterSearch(token, start, finish, endpoint, maxTweets, maxRequests, query);

  function twitterSearch(
    token,
    start,
    finish,
    endpoint,
    maxTweets,
    maxRequests,
    query
  ) {
    const request = require("request");

    // Question mark allows query below.
    const url = endpoint + "?";
    const completedQuery = "(" + query + ")";
    const bearerToken = "Bearer " + token;
    var counter = 0;
    while (counter < maxRequests) {
      if (counter === 0) {
        var queryObject = {
          query: completedQuery,
          maxResults: maxTweets,
          fromDate: start,
          toDate: finish
        };
      } else {
        var queryObject = {
          query: completedQuery,
          maxResults: maxTweets,
          fromDate: start,
          toDate: finish,
          next: nextToken
        };
      }
      // Structure request (JSON content).
      request(
        {
          url: url,
          qs: queryObject,
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
          }
        },
        (err, res, body) => {
          if (err) {
            console.log("error:", err);
          } else if (res && body) {
            console.log("statusCode:", res && res.statusCode);
          }
        }
      );
    }
  }

  // Should be a promise.
  setTimeout(() => {
    res.redirect("/collect");
  }, 10000);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
