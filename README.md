# Twitter Data Toolkit

'twitter-data-app' is a Node.js project that allows users to identify their bearer token (application-only authentication), collect Tweets using Twitter's premium search endpoints and aggregate Tweets into one file (JSON or CSV) for analysis purposes without having to interact with code. Everything's done through a simple web application. Feel free to email me (<s.kishore@auckland.ac.nz>) if you need support with collecting data.

![Screenshot](https://raw.githubusercontent.com/shohil-kishore/twitter-data-collector/master/Other/Data%20Toolkit%20Example.png)

## Reference

If you use this software, please reference: [Kishore, S., Peko, G., & Sundaram, D. (2019). Looking Through the Twitter Glass: Bridging the Data – Researcher Gap. Paper presented at the Americas Conference on Information Systems (AMCIS) 2019, Cancun, Mexico.](https://aisel.aisnet.org/amcis2019/social_computing/social_computing/4/)

# Instructions for Academics (Windows/Linux/macOS)

1. Apply for access to the Academic Research product track (https://developer.twitter.com/en/solutions/academic-research/products-for-researchers).
2. On approval, create an app under "Apps" (https://developer.twitter.com/en/docs/projects/overview).
3. Download and install Node.js (https://nodejs.org/en/download/).
4. If you have a GitHub account, clone or fork this project. If you don't have a GitHub account, click the green "Clone or download" button and download the ZIP file.
5. From the command line, change directory into "twitter-data-toolkit" and type in "git checkout v2-api" to use the latest version of the toolkit.
6. Then, change directory into "twitter-data-app", type "npm install" to install dependencies, and "npm start" to start the application.
7. Finally, in a web browser, type in "localhost:8080" to access the web application and start collecting data! 🎉

# FAQ

## How is this different to other projects?

This project focuses on those with a non-technical background. When you simply want to collect some data to explore an idea, this is a great place to start.

## Why should I use the Twitter API?

Utilizing Twitter's Premium Search API is particularly useful in a research context as it allows you to collect full-fidelity data that can be replicated by others.

## How much does it cost to use the Twitter API?

For \$99 USD, 100,000 Tweets can be collected using the Premium Search full-archive endpoint. Currently, each month is pro-rated and you can cancel at anytime.
