/*******************************************************
 * Module Imports and Initial Configuration
 *******************************************************/
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { default: mongoose, mongo } = require("mongoose");
require("dotenv").config();

// Create main app instance (used later for auth/admin routes)
const app = express();

// Use body-parser middleware.
app.use(bodyParser.json());
app.use(cors());

/*******************************************************
 * Environment Variables and Ports
 *******************************************************/
const authPORT = process.env.PORT || 8080;
const PORT_READ = process.env.PORT_READ || 5000;
const PORT_CRUD = process.env.PORT_CRUD || 5001;

/*******************************************************
 * Data Files and Sample Data Arrays
 *******************************************************/
const techDataFile = path.join(__dirname, "technologies.json");
const eventsDataFile = path.join(__dirname, "events.json");

// Technology-related arrays
const genreOptions = ["AI", "Biotech", "IoT", "Cybersecurity", "Cloud Computing"];
const innovatorsList = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "David Lee",
  "Emma Brown",
  "Frank Wilson",
  "Grace Adams",
  "Hannah White",
];
const overviews = [
  "This technology is designed to revolutionize the industry with its innovative approach and robust performance.",
  "An industry-leading solution that combines state-of-the-art algorithms with intuitive design.",
  "Engineered for excellence, this technology offers unparalleled efficiency and precision in its domain.",
  "A breakthrough in its field, delivering both scalability and reliability.",
  "A cutting-edge innovation that sets new standards for performance and usability.",
];
const detailedDescriptions = [
  "In this technology, advanced data analytics, machine learning models, and a user-centric design come together to solve complex problems.",
  "This comprehensive platform provides deep insights by integrating sophisticated algorithms with real-time data processing.",
  "Standing at the forefront of modern innovation, this technology leverages the latest advancements in automation and artificial intelligence.",
  "Developed with a keen eye on sustainability and operational excellence, this solution delivers a blend of innovative features and proven performance.",
  "By combining cutting-edge research with practical implementation, this product bridges the gap between theoretical potential and real-world application.",
];
const advantagesList = [
  "Enhanced performance and speed",
  "Cost-effective scalability",
  "Intuitive user interface",
  "Robust security measures",
  "Flexible integration",
  "Real-time data processing",
];
const applicationsList = [
  "Healthcare analytics",
  "Financial risk assessment",
  "Manufacturing optimization",
  "Smart city infrastructure",
  "Retail customer insights",
  "Educational technology enhancements",
];
const useCasesList = [
  "Predictive maintenance in industrial setups",
  "Automated fraud detection in finance",
  "Personalized marketing campaigns",
  "Real-time monitoring in smart homes",
  "Optimized supply chain management",
];
const relatedLinksList = [
  { title: "Official Documentation", url: "https://example.com/docs" },
  { title: "Product Demo", url: "https://example.com/demo" },
  { title: "Case Study", url: "https://example.com/case-study" },
  { title: "Whitepaper", url: "https://example.com/whitepaper" },
];
const technicalSpecs = [
  "Version: 1.0; Release Date: 2023-01-01; Compatibility: Cross-platform",
  "Version: 2.0; Release Date: 2023-06-15; Compatibility: Windows, macOS, Linux",
  "Version: 3.1; Release Date: 2024-02-20; Compatibility: Web, Mobile",
];

// Event field categories
const fieldCategories = [
  "Artificial Intelligence",
  "Blockchain",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "DevOps",
  "IoT",
  "Machine Learning",
  "Mobile Development",
  "Robotics",
  "Web Development",
  "Other",
];

/*******************************************************
 * Helper Functions for Data Generation and Storage
 *******************************************************/
// Helper: Pick random elements from an array.
function getRandomElements(arr, count) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/** TECHNOLOGY DATA GENERATION **/
function generateTechnologies() {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i.toString(),
    name: `Technology ${i + 1}`,
    description: `A brief summary for Technology ${i + 1}.`,
    overview: overviews[i % overviews.length],
    detailedDescription: detailedDescriptions[i % detailedDescriptions.length],
    genre: genreOptions[i % genreOptions.length],
    docket: `Technology / ${(26179 + i)}J`,
    innovators: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => innovatorsList[Math.floor(Math.random() * innovatorsList.length)]
    ).join(" / "),
    advantages: getRandomElements(advantagesList, 3),
    applications: getRandomElements(applicationsList, 3),
    useCases: getRandomElements(useCasesList, 2),
    relatedLinks: getRandomElements(relatedLinksList, 2),
    technicalSpecifications: technicalSpecs[i % technicalSpecs.length],
    trl: Math.floor(Math.random() * 9) + 1, // TRL level between 1 and 9.
  }));
}

/** EVENT DATA GENERATION (10 entries) **/
function generateEvents() {
  // Here we create 10 dummy events with random field categories.
  return [
    {
      id: "1",
      eventTitle: "AI Summit",
      fieldCategory: "Artificial Intelligence",
      briefDescription: "Exploring the latest AI trends and breakthroughs.",
      knowMoreLink: "https://example.com/ai-summit",
      venue: "Tech Park, Hall A",
      eventDate: "03/02/2025",
      startTime: "11:10 AM",
      endTime: "12:10 PM",
    },
    {
      id: "2",
      eventTitle: "Blockchain Expo",
      fieldCategory: "Blockchain",
      briefDescription: "Showcasing innovative blockchain solutions.",
      knowMoreLink: "https://example.com/blockchain-expo",
      venue: "Downtown Convention Center",
      eventDate: "04/10/2025",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "3",
      eventTitle: "Web Dev Conference",
      fieldCategory: "Web Development",
      briefDescription: "Latest trends in front-end and back-end web tech.",
      knowMoreLink: "https://example.com/webdev-conference",
      venue: "Main Auditorium, City Hall",
      eventDate: "05/05/2025",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
    },
    {
      id: "4",
      eventTitle: "IoT Innovations",
      fieldCategory: "IoT",
      briefDescription: "Connecting everything, everywhere.",
      knowMoreLink: "https://example.com/iot-innovations",
      venue: "Tech Hub Arena",
      eventDate: "06/11/2025",
      startTime: "01:00 PM",
      endTime: "02:30 PM",
    },
    {
      id: "5",
      eventTitle: "Data Science Workshop",
      fieldCategory: "Data Science",
      briefDescription: "Hands-on sessions with real-world datasets.",
      knowMoreLink: "https://example.com/data-science-workshop",
      venue: "Innovation Lab",
      eventDate: "07/15/2025",
      startTime: "10:00 AM",
      endTime: "11:45 AM",
    },
    {
      id: "6",
      eventTitle: "Cybersecurity Forum",
      fieldCategory: "Cybersecurity",
      briefDescription: "Latest tactics to combat cyber threats.",
      knowMoreLink: "https://example.com/cybersecurity-forum",
      venue: "Security HQ",
      eventDate: "08/20/2025",
      startTime: "09:30 AM",
      endTime: "11:00 AM",
    },
    {
      id: "7",
      eventTitle: "Machine Learning Meetup",
      fieldCategory: "Machine Learning",
      briefDescription: "Showcasing advanced ML algorithms.",
      knowMoreLink: "https://example.com/ml-meetup",
      venue: "Techies Co-working Space",
      eventDate: "09/01/2025",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
    },
    {
      id: "8",
      eventTitle: "Robotics Expo",
      fieldCategory: "Robotics",
      briefDescription: "Robots of the future, today.",
      knowMoreLink: "https://example.com/robotics-expo",
      venue: "Robotics Lab, Hall 1",
      eventDate: "10/10/2025",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
    },
    {
      id: "9",
      eventTitle: "DevOps Connect",
      fieldCategory: "DevOps",
      briefDescription: "Bridging development and operations seamlessly.",
      knowMoreLink: "https://example.com/devops-connect",
      venue: "Dev Center",
      eventDate: "11/11/2025",
      startTime: "03:00 PM",
      endTime: "05:00 PM",
    },
    {
      id: "10",
      eventTitle: "Mobile Dev Hackathon",
      fieldCategory: "Mobile Development",
      briefDescription: "Rapid app development challenge.",
      knowMoreLink: "https://example.com/mobile-dev-hack",
      venue: "Hackathon Arena",
      eventDate: "12/05/2025",
      startTime: "08:00 AM",
      endTime: "08:00 PM",
    },
  ];
}

// Shared function to update the persistent data file.
function updateDataFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/*******************************************************
 * Initialize Persistent Data for Technologies
 *******************************************************/
let technologies = [];
if (fs.existsSync(techDataFile)) {
  try {
    const fileData = fs.readFileSync(techDataFile, "utf8");
    technologies = JSON.parse(fileData);
    // Ensure every technology has a TRL field.
    let updated = false;
    technologies = technologies.map((tech) => {
      if (tech.trl == null) {
        tech.trl = Math.floor(Math.random() * 9) + 1;
        updated = true;
      }
      return tech;
    });
    if (updated) {
      updateDataFile(techDataFile, technologies);
    }
  } catch (error) {
    console.error("Error reading technologies data file:", error);
    technologies = generateTechnologies();
    updateDataFile(techDataFile, technologies);
  }
} else {
  technologies = generateTechnologies();
  updateDataFile(techDataFile, technologies);
}

/*******************************************************
 * Initialize Persistent Data for Events
 *******************************************************/
let events = [];
if (fs.existsSync(eventsDataFile)) {
  try {
    const fileData = fs.readFileSync(eventsDataFile, "utf8");
    events = JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading events data file:", error);
    events = generateEvents();
    updateDataFile(eventsDataFile, events);
  }
} else {
  events = generateEvents();
  updateDataFile(eventsDataFile, events);
}

/*******************************************************
 * Setup Express Apps for Different Route Sets
 *******************************************************/
// Create two separate Express apps:
// - appRead for basic reading (GET routes only)
// - appCRUD for full CRUD operations (GET, POST, PUT, DELETE)
const appRead = express();
const appCRUD = express();

// Apply middleware to both.
appRead.use(cors());
appRead.use(express.json());

appCRUD.use(cors());
appCRUD.use(express.json());

/*******************************************************
 * TECHNOLOGIES: Read-Only Routes (GET only)
 *******************************************************/
// 1) Read all technologies
appRead.get("/technologies", (req, res) => {
  res.json(technologies);
});

// 2) Read a single technology by ID
appRead.get("/technologies/:id", (req, res) => {
  const tech = technologies.find((t) => t.id === req.params.id);
  if (tech) {
    res.json(tech);
  } else {
    res.status(404).json({ message: "Technology not found" });
  }
});

/*******************************************************
 * EVENTS: Read-Only Routes (GET only)
 *******************************************************/
// 1) Read all events
appRead.get("/events", (req, res) => {
  res.json(events);
});

// 2) Read a single event by ID
appRead.get("/events/:id", (req, res) => {
  const event = events.find((ev) => ev.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

/*******************************************************
 * TECHNOLOGIES: CRUD Routes
 *******************************************************/
// GET routes (also available in CRUD server)
appCRUD.get("/technologies", (req, res) => {
  res.json(technologies);
});

appCRUD.get("/technologies/:id", (req, res) => {
  const tech = technologies.find((t) => t.id === req.params.id);
  if (tech) {
    res.json(tech);
  } else {
    res.status(404).json({ message: "Technology not found" });
  }
});

// POST endpoint to add a new technology
appCRUD.post("/technologies", (req, res) => {
  let newId = "0";
  if (technologies.length > 0) {
    const ids = technologies
      .map((t) => parseInt(t.id, 10))
      .filter((n) => !isNaN(n));
    const maxId = Math.max(...ids);
    newId = (maxId + 1).toString();
  }
  const newTech = { id: newId };
  for (const [key, value] of Object.entries(req.body)) {
    if (key === "id") continue;
    if (Array.isArray(value)) {
      if (value.length > 0) newTech[key] = value;
    } else if (typeof value === "string") {
      if (value.trim() !== "") newTech[key] = value.trim();
    } else if (value != null) {
      newTech[key] = value;
    }
  }
  if (newTech.trl == null) {
    newTech.trl = 1;
  }
  technologies.push(newTech);
  updateDataFile(techDataFile, technologies);
  res.status(201).json(newTech);
});

// PUT endpoint to update a technology
appCRUD.put("/technologies/:id", (req, res) => {
  const { id } = req.params;
  const techIndex = technologies.findIndex((t) => t.id === id.toString());
  if (techIndex === -1) {
    return res.status(404).json({ message: "Technology not found" });
  }
  const updatedTech = { ...technologies[techIndex], ...req.body };
  if (updatedTech.trl == null) {
    updatedTech.trl = 1;
  }
  technologies[techIndex] = updatedTech;
  updateDataFile(techDataFile, technologies);
  res.status(200).json(updatedTech);
});

// DELETE endpoint to remove a technology
appCRUD.delete("/technologies/:id", (req, res) => {
  const { id } = req.params;
  const techIndex = technologies.findIndex((t) => t.id === id.toString());
  if (techIndex !== -1) {
    technologies.splice(techIndex, 1);
    updateDataFile(techDataFile, technologies);
    res.status(200).json({ message: "Technology deleted successfully" });
  } else {
    res.status(404).json({ message: "Technology not found" });
  }
});

/*******************************************************
 * EVENTS: CRUD Routes
 *******************************************************/
// GET routes (also available in CRUD server)
appCRUD.get("/events", (req, res) => {
  res.json(events);
});

appCRUD.get("/events/:id", (req, res) => {
  const event = events.find((ev) => ev.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

// POST endpoint to add a new event
appCRUD.post("/events", (req, res) => {
  // Determine new ID
  let newId = "0";
  if (events.length > 0) {
    const ids = events
      .map((ev) => parseInt(ev.id, 10))
      .filter((n) => !isNaN(n));
    const maxId = Math.max(...ids);
    newId = (maxId + 1).toString();
  }
  const newEvent = { id: newId };

  // Copy only valid fields
  for (const [key, value] of Object.entries(req.body)) {
    if (key === "id") continue;
    if (typeof value === "string") {
      if (value.trim() !== "") newEvent[key] = value.trim();
    } else if (value != null) {
      newEvent[key] = value;
    }
  }

  events.push(newEvent);
  updateDataFile(eventsDataFile, events);
  res.status(201).json(newEvent);
});

// PUT endpoint to update an event
appCRUD.put("/events/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((ev) => ev.id === id.toString());
  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }
  const updatedEvent = { ...events[eventIndex], ...req.body };
  events[eventIndex] = updatedEvent;
  updateDataFile(eventsDataFile, events);
  res.status(200).json(updatedEvent);
});

// DELETE endpoint to remove an event
appCRUD.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((ev) => ev.id === id.toString());
  if (eventIndex !== -1) {
    events.splice(eventIndex, 1);
    updateDataFile(eventsDataFile, events);
    res.status(200).json({ message: "Event deleted successfully" });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
});

/*******************************************************
 * Start the Read-Only and CRUD Servers
 *******************************************************/
appRead.listen(PORT_READ, () => {
  console.log(`Read-only server is running on port ${PORT_READ}`);
});

appCRUD.listen(PORT_CRUD, () => {
  console.log(`CRUD server is running on port ${PORT_CRUD}`);
});

/*******************************************************
 * Additional Routes for Auth and Admin Dashboard
 * (Using the main app instance created earlier)
 *******************************************************/
require("./Model/db");
const AuthRouter = require("./Routes/AuthRouter");
const TechnologiesRouter = require("./Routes/TechnologiesRouter");

app.use("/auth", AuthRouter);
app.use("/admin-dashboard", TechnologiesRouter);

app.listen(authPORT, () => {
  console.log(`Server is running on ${authPORT}`);
});

/*******************************************************
 * Legacy Code (Commented Out)
 *******************************************************/
// require("./Model/db");
// // Routers
// const AuthRouter = require("./Routes/AuthRouter");
// const TechnologiesRouter = require("./Routes/TechnologiesRouter");
// // Mount routes
// app.use("/auth", AuthRouter);
// app.use("/technologies", TechnologiesRouter);
// // Secure route: Only accessible if a valid JWT token is provided
// const ensecureAuthenticated = require("./Middlewares/Auth");
// app.get("/admin-dashboard", ensecureAuthenticated, (req, res) => {
//   res.status(200).json({ message: "Welcome to the Admin Dashboard" });
// });
// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
