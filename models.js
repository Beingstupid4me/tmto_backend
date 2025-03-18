import { Schema, model } from "mongoose";
// -----------------------------------------
// Mongoose Schemas & Models (All in One File)
// -----------------------------------------

// TechDetail Schema (for detailed technology info)
// Collection: tech_details
const techDetailSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    overview: String,
    detailedDescription: String,
    genre: String,
    docket: { type: String, required: true, unique: true },
    innovators: [String],

  advantages: [String],
  applications: [String],
  useCases: [String],
  relatedLinks: [
    {
      title: String,
      url: String
    }
  ],
  technicalSpecifications: String,
  trl: { type: Number, default: 1 },
  spotlight: { type: Boolean, default: false }
});


// Optional text index for overview and detailedDescription
techDetailSchema.index({ overview: "text", detailedDescription: "text" });

// Use explicit collection name "tech_details"
export const TechDetail = model("TechDetail", techDetailSchema, "Detailed_tech");

// Event Schema (for events)
// Collection: events
const eventSchema = new Schema({
  title: { type: String, required: true },
  month : { type: String, required: true },
  day : { type: String, required: true },
  location: String,
  time: String,
  description: String,
  registration: String
});


// Use explicit collection name "events"
export const Event = model("Event", eventSchema, "Events");
