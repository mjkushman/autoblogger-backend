"use strict";

const createApp = require("./app");
// const db = require("./dborm");

const { PORT, NODE_ENV } = require("./config");
const config = require("./config")['development'];

const cron = require("node-cron");
// const aiWritePost = require('./utilities/aiWritePost')
const aiBlogger = require("./utilities/aiBlogger");



// CREATE THE APP
const app = createApp(config);

/** TODO  SECTION
 * import Authors class model
 * iterate over Authors.Agents
 *
 */

// Create the blogger: Cleo
const cleo = async () => {
  let blogger = await aiBlogger("cleo");
  let outline = await blogger.createOutline();
  blogger.writeBlogPost(outline);
  return blogger;
};

// Create the blogger: Max
const max = async () => {
  let blogger = await aiBlogger("max");
  let outline = await blogger.createOutline();
  blogger.writeBlogPost(outline);
  return blogger;
};

// Create the blogger: Winston
const winston = async () => {
  let blogger = await aiBlogger("winston");
  let outline = await blogger.createOutline();
  blogger.writeBlogPost(outline);
  return blogger;
};

// Run these bloggers one-off when the server starts or restarts:
// cleo()
// max()

// Schedule the autoblogger

// UNCOMMENT THIS TO START AUTO BLOGGING

/**     ┌────────────── second (optional). If only 5 stars, starts at minute. I omit seconds.
 #      │ ┌──────────── minute -- Start here.
 #      │ │ ┌────────── hour
 #      │ │ │ ┌──────── day of month
 #      │ │ │ │ ┌────── month
 #      │ │ │ │ │ ┌──── day of week
 #      │ │ │ │ │ │
 #      │ │ │ │ │ │
 #      * * * * * * */

// Schedule Cleo
cron.schedule(
  "30 12 * * *",
  async () => {
    // Run at 12:30pm each day
    console.log("Running AI blogger: cleo");
    try {
      await cleo();
      console.log("Finished running Cleo");
    } catch (error) {
      console.log("Error running Cleo in cron:", error);
    }
  },
  {
    scheduled: true,
    timezone: "America/Los_Angeles",
  }
);

// Schedule Max
cron.schedule(
  "22 8 * * *",
  async () => {
    // Run at 8:22am every day
    console.log("Running AI blogger: max");
    try {
      await max();
      console.log("Finished running Max");
    } catch (error) {
      console.log("Error running Max in cron:", error);
    }
  },
  {
    scheduled: true,
    timezone: "America/Los_Angeles",
  }
);

// Schedule Winston
cron.schedule(
  "45 20 * * *",
  async () => {
    // Run at 8:45pm every day
    console.log("Running AI blogger: winsoton");
    try {
      await winston();
      console.log("Finished running Winston");
    } catch (error) {
      console.log("Error running Winston in cron:", error);
    }
  },
  {
    scheduled: true,
    timezone: "America/Los_Angeles",
  }
);

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);

});
