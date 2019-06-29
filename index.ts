// Import dependencies
const { createMessageAdapter } = require('@slack/interactive-messages');
const http = require('http');
const express = require('express');
import * as ngrok from 'ngrok'
import slashCommand from './slashCommand'
const bodyParser = require('body-parser');
const morgan = require('morgan')

// Create the adapter using the app's signing secret, read from environment variable
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// Initialize an Express application
// NOTE: You must use a body parser for the urlencoded format before attaching the adapter
const app = express();

app.use(morgan('combined'))


app.post('/slack/commands', bodyParser.urlencoded({ extended: false }), slashCommand);

// Attach the adapter to the Express application as a middleware
// NOTE: The path must match the Request URL and/or Options URL configured in Slack
app.use('/slack/actions', slackInteractions.expressMiddleware());

// Select a port for the server to listen on.
// NOTE: When using ngrok or localtunnel locally, choose the same port it was started with.
const port = process.env.PORT || 3000;

// Start the express application server
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
  ngrok.connect({
    subdomain: 'i227',
    addr: port
  }).then(url => console.log('Server running at: ' + url))
});