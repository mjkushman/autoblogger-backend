// Define the ai agent class. Final naming tbd. Could be agent or author or something else. This is the new aiBlogger.js

const cron = require("node-cron");
const { Agent, Post } = require("../models");
const { ExpressError, NotFoundError } = require("../utilities/expressError");
const LLMService = require("../services/LLMService");
const htmlParser = require("../utilities/htmlParser");
const getUnsplashImage = require("../utilities/getUnsplashImage");

class AgentService extends LLMService {
  // commenting this out because I'm trying another approach.
  // Instead of instantiating with "... new AiAgent(id)" I will instantiate with AiAgent.init(id)

  constructor({
    firstName,
    lastName,
    authorBio,
    imageUrl,
    isEnabled,
    schedule,
    email,
    agentId,
    orgId,
    username,
  }) {
    super();
    this.agentId = agentId;
    this.orgId = orgId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isEnabled = isEnabled;
    this.email = email;
    this.schedule = schedule;
    this.authorBio = authorBio;
    this.imageUrl = imageUrl;
  }

  // === CLASS PROPERTIES ===
  /** store as
   *  {agentId: ScheduledTask}
   *  where ScheduledTask is the return value from cron.schedule()
   */
  static SCHEDULED_POSTS = new Map();
  static SCHEDULED_SOCIAL = new Map();

  // == INSTANCE PROPERTIES ==
  bioBlock = this.authorBio
    ? `\n This is your profile: ${this.authorBio.length}`
    : "";

  // === STATIC METHODS ===

  /** Retrieve the agent's details from databse and set instance properties
   *  @returns new AiAgent class instance with instance properties set
   *
   *  */
  static async init(agentId) {
    try {
      const agentData = await Agent.getAgent(agentId);
      if (agentData) {
        return new AiAgent(agentData); // returns a new class instance with populated constructor fields.
      } else {
        console.log(`Unable to find an agent with that agentId ${agentId}`);
      }
    } catch (error) {
      return new ExpressError(error);
    }
  }
  static async serverStart() {
    // get all agents with posting enabled
    const enabledAgents = await Agent.findAll({
      include: { agentActions }, // I think this is wrong
      where: { isEnabled: { posts: true } },
    });
    // put them all in a hash map
    for (let agent of enabledAgents) {
      // TODO: call cron to schedule this agent based on agent.cronSchedule
      // this.SCHEDULED_POSTS.set(agent.agentId, agent); // store each agent at a key of its own id
    }
  }

  static async create({ accountId, body }) {
    console.log("service: creating a new agent");
    try {
      let newAgent = { ...body, accountId };
      return await Agent.create(newAgent);
    } catch (error) {
      throw error;
    }
  }

  static async findAll({ accountId }) {
    console.log(`service: finding all agents for accountId: ${accountId}`);
    try {
      let agents = await Agent.findAll({ where: { accountId } });
      return agents;
    } catch (error) {
      throw error;
    }
  }

  static async findOne({ agentId, accountId }) {
    console.log(
      `service: finding agent ${agentId} for accountId: ${accountId}`
    );
    try {
      let agent = await Agent.findOne({
        where: { agentId, accountId },
      });
      return agent;
    } catch (error) {
      throw error;
    }
  }

  static async update({ accountId, agentId, body }) {
    console.log(
      `service: updating agent ${agentId} for accountId: ${accountId}`
    );
    try {
      const agent = await Agent.findOne({ where: { agentId, accountId } });
      if (!agent) throw new NotFoundError("Agent not found.");

      await agent.update(body);
      await agent.save(); // trigger the beforeUpdate hook

      if (agent.postSettings.isEnabled) {
        // TODO: SOME LOGIC IF THE AGENT IS NOW ENABLED
        await enable(agent);
      }
      if (!agent.postSettings.isEnabled) {
        await disable(agent);
      }

      return agent;
    } catch (error) {
      throw error;
    }
  }

  static async activate({ accountId, agentId }) {
    console.log(`activating ${agentId}`);
    try {
      const agent = await Agent.findOne({ where: { accountId, agentId } });
      if (!agent) throw new NotFoundError("Unable to find agent.");

      (agent.postSettings = {
        ...agent.postSettings,
        isEnabled: true,
      }),
        await enable(agent); // adds agent to SCHEDULED TASKS
      await agent.save();
      return agent;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete({ accountId, agentId }) {
    console.log(`service: deleting agent ${agentId} for account: ${accountId}`);
    try {
      let result = await Agent.destroy({ where: { agentId, accountId } });
      console.log(`DELETE RESULTT: ${result}`);
      if (result > 0) {
        this.SCHEDULED_POSTS.delete(agentId); // remove from active tasks.
        return { message: "Delete successful" };
      } else {
        throw new NotFoundError(
          `Could not find agent ${agentId} for account ${accountId} to delete.`
        );
      }
    } catch (error) {
      throw error;
    }
  }

  static async enableAll() {
    // retreives all agents and starts the ones that should be started. Use this class method when the server starts up.
  }

  static async disableAll() {
    // deactivates all currently running agents
  }

  // CLASS METHODS

  /** Writes a blog post
   * @topic An outline of the post to be written, which helps the AI write. Optional. If non is provided, the AI will run a utility function to choose a topic.
   * @param llm the name of the large language model to use. "chatgpt" | "claude"
   * @param maxWords The maximum wordcount in the returned blog post
   * @returns a blog in string formatted HTML
   */
  async writeBlogPost({ topic, llm = "chatgpt", maxWords = 1000 }) {
    console.log(`${this.username} has started writing a blog post: 
      llm: ${llm}
      maxWords: ${maxWords}
      topic: ${topic}`);

    // If no topic is provided, decide one
    const topicBlock = topic || (await this.#decideBlogTopic());
    console.log(`Next blog topic: ${topicBlock}`);

    // Construct messages
    let messages = [
      {
        role: "system",
        content: `You are the author of a popular blog. ${this.bioBlock}`,
      },
      {
        role: "user",
        content: `
        Write a new blog post using the following outline and instructions.
        OUTLINE:
        ${topicBlock}


        INSTRUCTIONS:
        1. Expand upon the topic until you reach ${maxWords} words.
        2. Format the response in HTML with proper HTML tags.
        3. Include a title in <h1> tags.
        4. Wrap the rest of the post in a <div> tag with id="primary-content".
        5. But do not include any boilerplate HTML`,
      },
    ];

    // Invoke llm
    console.log(
      `${this.username} is about to invoke the LLM to write a blog post.`
    );
    const llmResponse = await super.promptLLM(messages, llm);
    console.log(`${this.username} finished invoking the LLM.`);
    // console.log(`LLM Response: ${llmResponse}`);

    // Parse and format html resposne from llm
    let postData = htmlParser(llmResponse);

    // Get a random image based on the post title
    const imageUrl = await getUnsplashImage(postData.titlePlaintext);
    console.log("sourced image url: ".imageUrl);

    // Save the post to databse
    postData = {
      ...postData,
      imageUrl: String(imageUrl),
      agentId: this.agentId,
    };
    console.log(`${this.username}'s postData about to be saved to db:`);
    console.dir(postData);
    const newPost = await this.#savePost(postData);
    return newPost;
  }

  /** Starts running this agent according to their schedules and adds this agent to AGENTS
   *  Future refactoring: Abstract the scheduling function into its own function to be called for each schedule (blog, social, others in the future)
   *  */
  // Retooling Enable and Disable
  enablePosting(agent) {
    disablePosting(agent); // First makes sure it's not already running.
    const { agentId, postSettings, username } = agent;
    // set blogging schedule

    const task = cron.schedule(
      postSettings.cronSchedule,
      async () => {
        console.log(`Running AI blogger for ${username}`);
        try {
          // await this.writeBlogPost();
          console.log(`Finished running ${username}`);
        } catch (error) {
          console.log(
            `Error trying to write blog post for ${username}:`,
            error
          );
        }
      },
      {
        scheduled: false,
        timezone: postSettings.timezone,
      }
    );
    task.start(); // start the task
    // Sets an array of tasks at agentId
    SCHEDULED_TASKS.set(agentId, task);
  }
  enableSocial(agent) {
    disableSocial(agent); // First makes sure it's not already running.
    const { agentId, socialSettings, username } = agent;

    // set social schedule

    const task = cron.schedule(
      socialSettings.cronSchedule,
      async () => {
        console.log(`Running AI social for ${username}`);
        try {
          // await agent.writeSocialPost();
          console.log(`Finished running ${username}`);
        } catch (error) {
          console.log(
            `Error trying to write social post for ${username}:`,
            error
          );
        }
      },
      {
        scheduled: false,
        timezone: socialSettings.timezone,
      }
    );
    task.start(); // start the task
    SCHEDULED_SOCIAL.set(agentId, task); // Set the task at agentId
  }

  disablePosting(agent) {
    // Ends the recurring tasks from this agent
    // Remove it from SCHEDULED_POSTS
    const { agentId } = agent;
    SCHEDULED_POSTS.delete(agentId);
  };

  disableSocial(agent) {
    // Ends the recurring tasks from this agent
    // Remove it from SCHEDULED_SOCIAL
    const { agentId } = agent;
    SCHEDULED_SOCIAL.delete(agentId);
  }

  // ===PRIVATE HELPER METHODS===

  /** Formats the post and saves it to the databse
   * @param postData Data of the newly sourced post from LLM
   */
  async #savePost(postData) {
    // Add the article to database

    try {
      const newPost = await Post.createNewPost(postData);

      console.log(`
      New post created!
      postId: ${newPost.postId}
      Author: ${newPost.userId}
      Agent ID: ${newPost.agentId}
      Title: ${newPost.titlePlaintext}
      Image URL: ${newPost.imageUrl}
      Created at: ${newPost.createdAt}`);

      return newPost;
    } catch (error) {
      console.log("error creating post:", error);

      return new ExpressError(error);
    }
  }

  /** Produces a list like
   *   1. "My first article"
   *   2. "Another article I wrote"
   *   ...etc
   * @returns string formatted list of recent titles or an empty string if this agent has not written anything
   */
  async #getRecentWork() {
    let recentWork = "";

    try {
      console.log(`${this.username} is getting recent work.`);
      const titlesResponse = await Post.getTitles(this.agentId);

      if (titlesResponse.length > 0) {
        let titlesArray = titlesResponse.map(
          ({ titlePlaintext }) => titlePlaintext
        );
        for (let i = 0; i <= Math.min(14, titlesArray.length); i++) {
          recentWork += `${Number(i) + 1}. "${titlesArray[i]}"\n`;
        }
      }
      return recentWork;
    } catch (error) {
      return new ExpressError(
        `Could not retreive recent work for ${this.username}. ${error}`
      );
    }
  }

  /** Asks LLM to decide on a new topic to write about, based on the author's bio and recent work.
   * @returns Topic.: An outline of the next article to write when calling writeBlogPost
   */
  async #decideBlogTopic(llm) {
    console.log(`${this.username} is deciding what topic to write about`);
    let recentWork = await this.#getRecentWork();
    console.log(`DEBUGGING recentWork: ${recentWork}`); // For debugging

    const recentWorkBlock =
      recentWork.length > 0
        ? `These are recent articles you've written: ${recentWork}`
        : "";

    // Prompt construction:

    let messages = [
      {
        role: "system",
        content: ` You're an author of a popular blog. ${this.bioBlock} ${recentWorkBlock}`,
      },
      {
        role: "user",
        content: `Given your author profile and recent works, choose a topic for your next blog post. The new post should be different from other things you've written, but still written in your voice. Create a brief outline of your next blog post.`,
      },
    ];

    // For debugging:
    // console.log(`Dedice Blog Topic messages: ${messages}`)

    try {
      const response = await super.promptLLM(messages, (llm = "chatgpt"));
      console.log(`${this.username} finished deciding blog topic.`);
      return response;
    } catch (error) {
      return new ExpressError(
        `${this.username} was unable to prompt LLM to decide on a topic.  ${error}`
      );
    }
  }

  // TODO: Write a social media post
  writeSocialPost() {
    // does something
  }
}
module.exports = AgentService;
