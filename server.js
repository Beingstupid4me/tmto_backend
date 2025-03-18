// server.js
import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { TechDetail, Event } from "./models.js";

const app = express();
app.use(cors());
app.use(json());

// -----------------------------------------
// Connect to MongoDB
// -----------------------------------------
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

// -----------------------------------------
// API Endpoints
// -----------------------------------------

// 1. GET /explore_technologies
//    Returns all documents from the "detailed_tech" collection
app.get("/technologies", async (req, res) => {
  try {
    const intros = await TechDetail.find({});
    res.json(intros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching introductory technology data" });
  }
});



// 2. GET /events
//    Returns all events from the "events" collection
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

app.get("/technologies/:id", async (req, res) => {
  try {
    const tech = await TechDetail.findOne({ id: req.params.id.toString() });
    console.log(req.params.id);
    // console.log(req);
    console.log(tech);
    if (!tech) {
      return res.status(404).json({ message: "Technology not found" });
    }
    res.json(tech);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching technology data" });
  }
});

// -----------------------------------------
// Start the Server
// -----------------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
