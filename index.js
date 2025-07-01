const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri =
  "mongodb+srv://yourUsername:yourPassword@cluster0.s0vwyit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //     await client.connect();
    console.log("Connected to MongoDB!");

    // Example Database and Collection
    const database = client.db("jobPortal");
    const jobsCollection = database.collection("jobs");

    // API Endpoint - Fetch Jobs
    app.get("/jobs", async (req, res) => {
      const jobs = await jobsCollection.find().toArray();
      res.send(jobs);
    });

    // Root Endpoint
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
